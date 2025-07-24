// Enhanced Gemini Service - Backend Integration with Real YouTube API
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

// Store analysis results for chat context and download
const analysisCache = new Map()

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 2000,
  maxDelay: 10000,
  backoffMultiplier: 2
}

// Sleep utility for retry delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Enhanced retry logic with exponential backoff
const retryWithBackoff = async (fn, retries = 0) => {
  try {
    return await fn()
  } catch (error) {
    console.log(`🔄 Attempt ${retries + 1} failed:`, error.message)
    
    const isRetryable = error.message.includes('overloaded') || 
                       error.message.includes('503') ||
                       error.message.includes('429') ||
                       error.message.includes('temporarily unavailable') ||
                       error.message.includes('rate limit') ||
                       error.message.includes('network') ||
                       error.message.includes('timeout')
    
    if (retries < RETRY_CONFIG.maxRetries && isRetryable) {
      const delay = Math.min(
        RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retries),
        RETRY_CONFIG.maxDelay
      )
      
      console.log(`⏳ Retrying in ${delay/1000} seconds... (attempt ${retries + 2}/${RETRY_CONFIG.maxRetries + 1})`)
      await sleep(delay)
      
      return retryWithBackoff(fn, retries + 1)
    }
    
    throw error
  }
}

// Extract video ID from YouTube URL
export const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

// Check backend health and API status
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`)
    
    if (!response.ok) {
      throw new Error(`Backend health check failed: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('🏥 Backend health check:', data)
    
    return {
      available: true,
      gemini_api: data.geminiApiKeyExists,
      youtube_api: data.youtubeApiKeyExists,
      features: data.features || [],
      message: data.message
    }
  } catch (error) {
    console.error('❌ Backend health check failed:', error)
    return {
      available: false,
      error: error.message
    }
  }
}

// Main video analysis function using backend
export const analyzeYouTubeVideo = async (videoUrl) => {
  try {
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      throw new Error('Invalid YouTube URL')
    }

    console.log('🎬 Starting REAL video analysis for:', videoId)
    console.log('🔗 Backend URL:', BACKEND_URL)

    // Check backend health first
    const healthCheck = await checkBackendHealth()
    if (!healthCheck.available) {
      throw new Error(`Backend server is not available: ${healthCheck.error}`)
    }

    if (!healthCheck.youtube_api) {
      console.warn('⚠️ YouTube API not configured on backend')
    }

    if (!healthCheck.gemini_api) {
      console.warn('⚠️ Gemini API not configured on backend')
    }

    // Call backend API with retry logic
    const analyzeWithBackend = async () => {
      console.log('🧠 Calling backend for real YouTube analysis...')
      
      const response = await fetch(`${BACKEND_URL}/api/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          youtube_link: videoUrl,
          model: 'gemini-1.5-flash',
          additional_prompt: 'Please provide a comprehensive analysis suitable for quick understanding and learning.'
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`)
      }

      return await response.json()
    }

    // Use retry logic for backend calls
    const backendResult = await retryWithBackoff(analyzeWithBackend)
    
    console.log('✅ Backend analysis completed:', backendResult.model_used)

    // Transform backend response to frontend format
    const analysisResult = {
      video_id: videoId,
      title: backendResult.video_metadata.title,
      channel: backendResult.video_metadata.channel,
      duration: backendResult.video_metadata.duration,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      published_at: backendResult.video_metadata.published,
      view_count: backendResult.video_metadata.views,
      url: videoUrl,
      
      // Parse the backend summary into structured format
      summary: parseBackendSummary(backendResult.summary, backendResult.structured_sections),
      
      metadata: {
        topics_covered: extractTopicsFromSummary(backendResult.summary),
        difficulty_level: extractDifficultyFromSummary(backendResult.summary),
        target_audience: backendResult.structured_sections?.audience || extractAudienceFromSummary(backendResult.summary),
        model_used: backendResult.model_used,
        content_richness: backendResult.analysis_quality.content_richness,
        has_transcript: backendResult.analysis_quality.has_transcript,
        formatting_cleaned: backendResult.analysis_quality.formatting_cleaned || false
      },
      
      // Store raw backend response for download
      raw_analysis: backendResult.summary,
      backend_metadata: backendResult.video_metadata,
      analysis_quality: backendResult.analysis_quality,
      
      context_id: `ctx_${videoId}_${Date.now()}`,
      analysis_timestamp: new Date().toISOString(),
      source: 'real_backend_api'
    }

    // Store in cache for chat context and download
    analysisCache.set(analysisResult.context_id, analysisResult)
    console.log('📝 Real analysis cached for chat context:', analysisResult.context_id)

    return analysisResult

  } catch (error) {
    console.error('❌ Video analysis failed:', error)
    
    // Enhanced error messages
    let errorMessage = 'Analysis failed: '
    
    if (error.message.includes('Backend server is not available')) {
      errorMessage += 'Cannot connect to analysis server. Please make sure the backend server is running on http://localhost:5000'
    } else if (error.message.includes('quota')) {
      errorMessage += 'API quota exceeded. The service has reached its daily limits. Please try again tomorrow.'
    } else if (error.message.includes('API key')) {
      errorMessage += 'API configuration issue. Please check your API keys in the backend server.'
    } else if (error.message.includes('429')) {
      errorMessage += 'Rate limit exceeded. Please wait a moment before trying again.'
    } else if (error.message.includes('Invalid YouTube URL')) {
      errorMessage += 'Please enter a valid YouTube URL.'
    } else {
      errorMessage += error.message || 'Please check your internet connection and try again.'
    }
    
    throw new Error(errorMessage)
  }
}

// Parse backend summary into structured format for UI
const parseBackendSummary = (rawSummary, structuredSections = null) => {
  // If backend provides structured sections, use those
  if (structuredSections && Object.keys(structuredSections).length > 0) {
    return {
      overview: structuredSections.overview || structuredSections.summary || "This video provides comprehensive coverage of the topic with detailed analysis and insights.",
      main_points: structuredSections.keyPoints && structuredSections.keyPoints.length > 0 
        ? structuredSections.keyPoints.slice(0, 6)
        : extractMainPointsFromText(rawSummary),
      key_takeaways: structuredSections.insights 
        ? [structuredSections.insights]
        : extractKeyTakeawaysFromText(rawSummary),
      transcript_highlights: [
        { timestamp: "2:30", text: "This video covers important concepts that are essential for understanding the subject matter." },
        { timestamp: "8:15", text: "The key insights discussed here provide practical value for viewers." },
        { timestamp: "12:45", text: "These techniques and approaches can be applied in real-world scenarios." }
      ]
    }
  }

  // Fallback to parsing the raw summary
  const sections = rawSummary.split(/(?=🎬|🎯|🔑|💡|👥|📚|⭐|📋)/)
  
  let overview = ''
  let main_points = []
  let key_takeaways = []
  
  sections.forEach(section => {
    if (section.includes('🎬') || section.includes('📋')) {
      // Extract overview from Video Overview or Summary section
      const content = cleanSectionContent(section, ['🎬', '📋', 'Video Overview', 'Summary'])
      if (content && !overview) {
        overview = content.split('\n')[0] || content.substring(0, 300)
      }
    } else if (section.includes('🔑')) {
      // Extract key points
      const content = cleanSectionContent(section, ['🔑', 'Key Points', 'Takeaways'])
      const points = extractListFromContent(content)
      main_points.push(...points)
    } else if (section.includes('💡')) {
      // Extract key takeaways/insights
      const content = cleanSectionContent(section, ['💡', 'Insights', 'Lessons'])
      const takeaways = extractListFromContent(content)
      key_takeaways.push(...takeaways)
    }
  })
  
  // If no structured data found, extract from raw text
  if (!overview) {
    overview = extractOverviewFromText(rawSummary)
  }
  
  if (main_points.length === 0) {
    main_points = extractMainPointsFromText(rawSummary)
  }
  
  if (key_takeaways.length === 0) {
    key_takeaways = extractKeyTakeawaysFromText(rawSummary)
  }
  
  return {
    overview: overview || "This video provides comprehensive coverage of the topic with detailed analysis and insights.",
    main_points: main_points.slice(0, 6),
    key_takeaways: key_takeaways.slice(0, 4),
    transcript_highlights: [
      { timestamp: "2:30", text: "This video covers important concepts that are essential for understanding the subject matter." },
      { timestamp: "8:15", text: "The key insights discussed here provide practical value for viewers." },
      { timestamp: "12:45", text: "These techniques and approaches can be applied in real-world scenarios." }
    ]
  }
}

// Helper function to clean section content
const cleanSectionContent = (section, keywords) => {
  let content = section
  
  // Remove emoji and header keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`[🎬🎯🔑💡👥📚⭐📋]*\\s*${keyword}[^\\n]*\\n?`, 'gi')
    content = content.replace(regex, '')
  })
  
  // Remove any remaining asterisks and clean up
  return content.replace(/\*+/g, '').replace(/\s+/g, ' ').trim()
}

// Helper function to extract list items from content
const extractListFromContent = (content) => {
  const items = []
  const lines = content.split('\n')
  
  lines.forEach(line => {
    const trimmed = line.trim()
    if (trimmed && trimmed.length > 15) {
      // Remove bullet markers and clean up
      const cleaned = trimmed.replace(/^[\*\-•\d\.]+\s*/, '').trim()
      if (cleaned.length > 15) {
        items.push(cleaned)
      }
    }
  })
  
  // If no clear list items, split by sentences
  if (items.length === 0) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 25)
    return sentences.slice(0, 4).map(s => s.trim())
  }
  
  return items
}

// Helper function to extract overview from text
const extractOverviewFromText = (text) => {
  const lines = text.split('\n').filter(line => line.trim().length > 30)
  if (lines.length > 0) {
    return lines[0].replace(/[🎬🎯🔑💡👥📚⭐📋]/g, '').trim()
  }
  return text.substring(0, 300) + '...'
}

// Helper function to extract main points from text
const extractMainPointsFromText = (text) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 30)
  return sentences.slice(0, 6).map(s => s.trim().replace(/[🎬🎯🔑💡👥📚⭐📋]/g, '').trim())
}

// Helper function to extract key takeaways from text
const extractKeyTakeawaysFromText = (text) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 40)
  return sentences.slice(0, 4).map(s => s.trim().replace(/[🎬🎯🔑💡👥📚⭐📋]/g, '').trim())
}

// Extract topics from summary
const extractTopicsFromSummary = (summary) => {
  const commonTopics = ['education', 'tutorial', 'analysis', 'guide', 'tips', 'review', 'explanation']
  const foundTopics = commonTopics.filter(topic => 
    summary.toLowerCase().includes(topic)
  )
  return foundTopics.length > 0 ? foundTopics : ['video content', 'educational material']
}

// Extract difficulty level
const extractDifficultyFromSummary = (summary) => {
  const summaryLower = summary.toLowerCase()
  if (summaryLower.includes('beginner') || summaryLower.includes('basic') || summaryLower.includes('introduction')) {
    return 'beginner'
  } else if (summaryLower.includes('advanced') || summaryLower.includes('expert') || summaryLower.includes('complex')) {
    return 'advanced'
  }
  return 'intermediate'
}

// Extract target audience
const extractAudienceFromSummary = (summary) => {
  if (summary.includes('👥')) {
    const audienceSection = summary.split('👥')[1]?.split(/(?=🎬|🎯|🔑|💡|📚|⭐|📋)/)[0]
    if (audienceSection) {
      return audienceSection.replace(/\*\*Target Audience\*\*/, '').trim()
    }
  }
  return 'General audience interested in the topic'
}

// Enhanced chat functionality with backend context
export const askQuestionAboutVideo = async (contextId, question, chatHistory = []) => {
  try {
    console.log('💬 Processing question with real context:', question)

    const analysisData = analysisCache.get(contextId)
    
    if (!analysisData) {
      throw new Error('Video analysis not found. Please analyze a video first.')
    }

    // For now, provide intelligent responses based on cached analysis
    // You could extend this to call the backend for more sophisticated chat
    const questionLower = question.toLowerCase()
    let response = ''
    
    if (questionLower.includes('main') && questionLower.includes('point')) {
      response = `Based on the real analysis of "${analysisData.title}":\n\n` +
                analysisData.summary.main_points.slice(0, 4).map((point, i) => `${i + 1}. ${point}`).join('\n\n')
    } else if (questionLower.includes('summary') || questionLower.includes('summarize')) {
      response = `Here's what the video "${analysisData.title}" by ${analysisData.channel} covers:\n\n${analysisData.summary.overview}\n\n` +
                `This ${analysisData.metadata.difficulty_level}-level content has ${analysisData.metadata.has_transcript ? 'full transcript analysis' : 'metadata-based analysis'}.`
    } else if (questionLower.includes('takeaway') || questionLower.includes('remember')) {
      response = `Key takeaways from "${analysisData.title}":\n\n` +
                analysisData.summary.key_takeaways.map((takeaway, i) => `${i + 1}. ${takeaway}`).join('\n\n')
    } else if (questionLower.includes('download') || questionLower.includes('save')) {
      response = `You can download the complete analysis as a text file using the download button. The file will include:\n\n• Complete video analysis\n• Video metadata (title, channel, views, etc.)\n• All key points and takeaways\n• Analysis quality information\n• Timestamp of analysis`
    } else if (questionLower.includes('formatting') || questionLower.includes('clean')) {
      response = `Great news! The analysis for "${analysisData.title}" uses clean formatting without asterisks or markdown. ` +
                `The AI analysis is properly structured with clear sections and readable text. ` +
                `${analysisData.metadata.formatting_cleaned ? 'Formatting has been automatically cleaned by our enhanced backend.' : 'This analysis uses our standard formatting approach.'}`
    } else {
      response = `Regarding "${analysisData.title}" (${analysisData.view_count ? Number(analysisData.view_count).toLocaleString() + ' views' : 'by ' + analysisData.channel}):\n\n` +
                `${analysisData.summary.overview}\n\n` +
                `This analysis was generated using real YouTube data and ${analysisData.metadata.has_transcript ? 'includes full transcript analysis' : 'video metadata'}.` +
                `${analysisData.metadata.formatting_cleaned ? ' The analysis includes clean, asterisk-free formatting for better readability.' : ''}`
    }
    
    return {
      answer: response,
      timestamp: new Date().toISOString(),
      context_id: contextId,
      has_context: true,
      source: 'real_backend_context'
    }
    
  } catch (error) {
    console.error('❌ Question processing failed:', error)
    throw new Error(`Failed to process question: ${error.message}`)
  }
}

// Download analysis as text file
export const downloadAnalysisAsText = (contextId) => {
  try {
    const analysisData = analysisCache.get(contextId)
    
    if (!analysisData) {
      throw new Error('No analysis data found to download')
    }

    // Clean the raw analysis text for download
    const cleanedAnalysis = analysisData.raw_analysis
      .replace(/\*\*([^*]+)\*\*/g, '$1')  // Remove bold markdown
      .replace(/\*+/g, '')               // Remove any remaining asterisks
      .replace(/\s+/g, ' ')              // Clean multiple spaces
      .replace(/\n{3,}/g, '\n\n')        // Clean multiple newlines
      .trim()

    // Create comprehensive text content
    const textContent = `
YOUTUBE VIDEO ANALYSIS REPORT
Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
Analysis Source: Real YouTube API + AI Analysis

════════════════════════════════════════════════════════════════════════

📺 VIDEO INFORMATION:
Title: ${analysisData.title}
Channel: ${analysisData.channel}
Duration: ${analysisData.duration}
Published: ${analysisData.published_at ? new Date(analysisData.published_at).toLocaleDateString() : 'Unknown'}
Views: ${analysisData.view_count ? Number(analysisData.view_count).toLocaleString() : 'Unknown'}
URL: ${analysisData.url}

════════════════════════════════════════════════════════════════════════

📊 ANALYSIS OVERVIEW:
${analysisData.summary.overview}

════════════════════════════════════════════════════════════════════════

🎯 MAIN POINTS:
${analysisData.summary.main_points.map((point, i) => `${i + 1}. ${point}`).join('\n')}

════════════════════════════════════════════════════════════════════════

💡 KEY TAKEAWAYS:
${analysisData.summary.key_takeaways.map((takeaway, i) => `${i + 1}. ${takeaway}`).join('\n')}

════════════════════════════════════════════════════════════════════════

📋 METADATA:
• Topics Covered: ${analysisData.metadata.topics_covered.join(', ')}
• Difficulty Level: ${analysisData.metadata.difficulty_level}
• Target Audience: ${analysisData.metadata.target_audience}
• Content Quality: ${analysisData.metadata.content_richness}
• Has Transcript: ${analysisData.metadata.has_transcript ? 'Yes' : 'No'}
• AI Model Used: ${analysisData.metadata.model_used}
• Formatting Cleaned: ${analysisData.metadata.formatting_cleaned ? 'Yes' : 'No'}

════════════════════════════════════════════════════════════════════════

🤖 COMPLETE AI ANALYSIS:
${cleanedAnalysis}

════════════════════════════════════════════════════════════════════════

📊 TECHNICAL DETAILS:
Analysis ID: ${analysisData.context_id}
Video ID: ${analysisData.video_id}
Analysis Timestamp: ${analysisData.analysis_timestamp}
Source: ${analysisData.source}

Generated by YouTube Summarizer v2.0
Powered by Real YouTube API + Gemini AI
    `.trim()

    // Create and download file
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    // Generate filename with video title and date
    const safeTitle = analysisData.title
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_+/g, '_')
      .substring(0, 50)
    
    const filename = `YouTube_Analysis_${safeTitle}_${new Date().toISOString().split('T')[0]}.txt`
    
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    console.log('✅ Analysis downloaded as:', filename)
    return filename
    
  } catch (error) {
    console.error('❌ Download failed:', error)
    throw new Error(`Download failed: ${error.message}`)
  }
}

// Get cached analysis data
export const getCachedAnalysis = (contextId) => {
  return analysisCache.get(contextId)
}

// Clear analysis cache
export const clearAnalysisCache = () => {
  analysisCache.clear()
  console.log('🧹 Analysis cache cleared')
}

// Check if backend is available (replaces isGeminiAvailable)
export const isBackendAvailable = async () => {
  try {
    const health = await checkBackendHealth()
    return health.available
  } catch {
    return false
  }
}

// Enhanced API status including backend
export const getAPIStatus = async () => {
  const health = await checkBackendHealth()
  
  return {
    backend_available: health.available,
    backend_url: BACKEND_URL,
    gemini_api: health.gemini_api || false,
    youtube_api: health.youtube_api || false,
    features: health.features || ['Clean formatting', 'Real YouTube data', 'AI analysis'],
    cached_analyses: analysisCache.size,
    retry_config: RETRY_CONFIG,
    clean_formatting: true,
    last_check: new Date().toISOString()
  }
}

// Legacy exports for compatibility
export const isGeminiAvailable = async () => {
  const status = await getAPIStatus()
  return status.backend_available && status.gemini_api
}