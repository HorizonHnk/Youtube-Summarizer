import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { 
  analyzeYouTubeVideo, 
  askQuestionAboutVideo, 
  getAPIStatus, 
  downloadAnalysisAsText,
  checkBackendHealth
} from '../services/gemini.js'

// YouTube URL validation regex
const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S+)?$/

// Inline styles object
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #7c2d92 50%, #0f172a 100%)',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 40
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px'
  },
  glassStrong: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px'
  },
  button: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    color: 'white',
    fontWeight: '600',
    padding: '16px 32px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '18px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)'
    }
  },
  input: {
    width: '100%',
    padding: '20px 24px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    color: 'white',
    fontSize: '18px',
    outline: 'none',
    transition: 'all 0.3s ease',
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)'
    },
    ':focus': {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.2)',
      background: 'rgba(255, 255, 255, 0.1)'
    }
  }
}

// Modern Header Component
const ModernHeader = ({ currentUser, onLogout, apiStatus }) => (
  <header style={styles.header}>
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: '80px' 
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            position: 'relative',
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}>
            <span style={{ fontSize: '24px' }}>🎥</span>
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              background: '#4ade80',
              borderRadius: '50%',
              border: '2px solid white'
            }}></div>
          </div>
          <div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: 'white', 
              margin: 0,
              letterSpacing: '-0.025em'
            }}>
              YouTube Summarizer
            </h1>
            <p style={{ 
              fontSize: '14px', 
              color: 'rgba(196, 181, 253, 0.8)', 
              margin: 0 
            }}>
              AI-Powered Video Intelligence
            </p>
          </div>
        </div>

        {/* Status & User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Backend API Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: '8px 16px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: apiStatus.backend_available ? '#4ade80' : '#ef4444',
              animation: apiStatus.backend_available ? 'pulse 2s infinite' : 'none'
            }}></div>
            <span style={{ 
              fontSize: '14px', 
              color: '#d1d5db', 
              fontWeight: '500' 
            }}>
              {apiStatus.backend_available 
                ? `🧠 Real AI Analysis ${apiStatus.youtube_api ? '+ YouTube API' : ''}` 
                : '❌ Backend Offline'
              }
            </span>
          </div>

          {/* User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: 'white', 
                margin: 0 
              }}>
                {currentUser?.displayName || currentUser?.email?.split('@')[0]}
              </p>
              <p style={{ 
                fontSize: '12px', 
                color: 'rgba(196, 181, 253, 0.7)', 
                margin: 0 
              }}>
                {currentUser?.email}
              </p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              {(currentUser?.displayName || currentUser?.email)?.[0]?.toUpperCase()}
            </div>
            <button
              onClick={onLogout}
              style={{
                color: '#9ca3af',
                background: 'transparent',
                border: 'none',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = 'white'
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#9ca3af'
                e.target.style.background = 'transparent'
              }}
              title="Sign Out"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
)

// Modern Tab Navigation
const ModernTabs = ({ activeTab, setActiveTab, hasAnalysis }) => {
  if (!hasAnalysis) return null
  
  const tabs = [
    { id: 'input', label: 'New Video', icon: '🔗' },
    { id: 'summary', label: 'Summary', icon: '📊' },
    { id: 'captions', label: 'Full Captions', icon: '📝' },
    { id: 'chat', label: 'Chat', icon: '💬' }
  ]

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto 48px auto', padding: '0 24px' }}>
      <div style={{
        ...styles.glass,
        padding: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '16px 24px',
                borderRadius: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                  : 'transparent',
                color: activeTab === tab.id ? 'white' : '#d1d5db',
                transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeTab === tab.id 
                  ? '0 10px 25px rgba(139, 92, 246, 0.3)' 
                  : 'none'
              }}
              onMouseOver={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = 'white'
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseOut={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = '#d1d5db'
                  e.target.style.background = 'transparent'
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Modern Video Input Section
const ModernVideoInput = ({ youtubeUrl, setYoutubeUrl, onAnalyze, isAnalyzing, error, apiStatus, urlInputRef }) => (
  <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
    {/* Hero Section */}
    <div style={{ 
      textAlign: 'center', 
      marginBottom: '64px',
      padding: '0 24px'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
        borderRadius: '24px',
        marginBottom: '32px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        <span style={{ fontSize: '40px' }}>🎬</span>
      </div>
      
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: '700',
        color: 'white',
        marginBottom: '24px',
        lineHeight: '1.1'
      }}>
        Transform YouTube Videos
        <br />
        <span style={{
          background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Into AI Insights
        </span>
      </h1>
      
      <p style={{
        fontSize: '20px',
        color: '#d1d5db',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        Paste any YouTube URL and get comprehensive AI-powered summaries, full captions with timestamps, key insights, and interactive conversations about the video content.
      </p>
    </div>

    {/* Input Form */}
    <div style={{
      ...styles.glassStrong,
      padding: '48px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
    }}>
      <form onSubmit={onAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* URL Input */}
        <div>
          <label 
            htmlFor="youtube-url" 
            style={{ 
              display: 'block',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '12px'
            }}
          >
            YouTube Video URL
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="youtube-url"
              ref={urlInputRef}
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              style={{
                ...styles.input,
                paddingRight: '60px'
              }}
              disabled={isAnalyzing}
            />
            <div style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '24px',
              opacity: 0.5
            }}>
              🔗
            </div>
          </div>
        </div>

        {/* Enhanced Error Display with Retry Options */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '24px', flexShrink: 0 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fca5a5', margin: 0, fontSize: '16px', marginBottom: '12px' }}>
                  {error}
                </p>
                {error.includes('Backend server is not available') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ color: '#fca5a5', fontSize: '14px', margin: 0 }}>
                      🔧 <strong>Setup Required:</strong>
                    </p>
                    <ul style={{ 
                      color: '#fca5a5', 
                      fontSize: '14px', 
                      margin: 0, 
                      paddingLeft: '20px',
                      listStyle: 'disc'
                    }}>
                      <li>Make sure your Node.js backend server is running</li>
                      <li>Navigate to your backend directory and run: <code>npm run dev</code></li>
                      <li>Server should be accessible at http://localhost:5000</li>
                      <li>Check the BACKEND_SETUP.md file for detailed instructions</li>
                    </ul>
                    <button
                      onClick={() => {
                        setError('')
                        window.open('http://localhost:5000/api/health', '_blank')
                      }}
                      style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        color: '#fca5a5',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        marginTop: '8px',
                        alignSelf: 'flex-start'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(239, 68, 68, 0.3)'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(239, 68, 68, 0.2)'
                      }}
                    >
                      🔍 Check Backend Status
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Backend API Status */}
        <div style={{
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid ' + (apiStatus.backend_available ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'),
          background: apiStatus.backend_available ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>
              {apiStatus.backend_available ? '🚀' : '❌'}
            </span>
            <div>
              <p style={{
                fontWeight: '600',
                margin: 0,
                color: apiStatus.backend_available ? '#bbf7d0' : '#fecaca'
              }}>
                {apiStatus.backend_available ? 'Real YouTube Analysis Ready' : 'Backend Server Offline'}
                {apiStatus.backend_available && apiStatus.youtube_api && ' • Full API Access + Captions'}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#d1d5db',
                marginTop: '4px',
                margin: 0
              }}>
                {apiStatus.backend_available 
                  ? `✅ YouTube API: ${apiStatus.youtube_api ? 'Connected' : 'Not configured'} | ✅ Gemini AI: ${apiStatus.gemini_api ? 'Connected' : 'Not configured'} | Smart retry enabled | Full captions support`
                  : 'Please make sure the backend server is running on http://localhost:5000'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isAnalyzing || !youtubeUrl.trim()}
          style={{
            ...styles.button,
            width: '100%',
            padding: '24px',
            fontSize: '20px',
            opacity: (isAnalyzing || !youtubeUrl.trim()) ? 0.5 : 1,
            cursor: (isAnalyzing || !youtubeUrl.trim()) ? 'not-allowed' : 'pointer'
          }}
          onMouseOver={(e) => {
            if (!isAnalyzing && youtubeUrl.trim()) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.4)'
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}
        >
          {isAnalyzing ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '3px solid white',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <div style={{ textAlign: 'left' }}>
                <div>Analyzing Video with Real YouTube API...</div>
                <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>
                  Fetching metadata, transcript & generating AI analysis
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🚀</span>
              <span>Analyze Video</span>
            </div>
          )}
        </button>
      </form>
    </div>

    {/* Features Grid */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginTop: '64px'
    }}>
      {[
        {
          icon: '⚡',
          title: 'Lightning Fast',
          description: 'Get comprehensive analysis in seconds with advanced AI processing'
        },
        {
          icon: '🧠',
          title: 'Deep Understanding',
          description: 'AI extracts key insights, themes, and actionable takeaways'
        },
        {
          icon: '📝',
          title: 'Full Captions',
          description: 'Access complete video subtitles with precise timestamps'
        },
        {
          icon: '💬',
          title: 'Interactive Chat',
          description: 'Ask specific questions and get detailed answers about the content'
        }
      ].map((feature, index) => (
        <div 
          key={index} 
          style={{
            textAlign: 'center',
            padding: '32px',
            ...styles.glass,
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(-4px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div style={{ 
            fontSize: '40px', 
            marginBottom: '16px',
            transition: 'transform 0.3s ease'
          }}>
            {feature.icon}
          </div>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '12px',
            margin: 0
          }}>
            {feature.title}
          </h3>
          <p style={{ 
            color: '#d1d5db', 
            lineHeight: '1.6',
            margin: 0
          }}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>

    {/* Add keyframes for animations */}
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  </div>
)

// Enhanced Video Info Card with Download Feature
const ModernVideoCard = ({ videoInfo, onNewVideo, analysisResult }) => {
  const [isDownloading, setIsDownloading] = React.useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      const filename = downloadAnalysisAsText(analysisResult.context_id)
      
      // Show success message briefly
      setTimeout(() => {
        setIsDownloading(false)
      }, 2000)
      
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed: ' + error.message)
      setIsDownloading(false)
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(40px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '32px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0 }}>
          <img
            src={videoInfo.thumbnail}
            alt="Video thumbnail"
            style={{
              width: '128px',
              height: '96px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
            }}
            onError={(e) => {
              e.target.src = `https://img.youtube.com/vi/${videoInfo.id}/default.jpg`
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '8px',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {videoInfo.title}
          </h3>
          <p style={{
            color: '#c4b5fd',
            marginBottom: '8px',
            fontWeight: '500',
            margin: 0
          }}>
            {videoInfo.channel}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '14px',
            color: '#9ca3af',
            flexWrap: 'wrap'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>⏱️</span>
              <span>{videoInfo.duration}</span>
            </span>
            {analysisResult?.metadata?.has_transcript && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>📝</span>
                <span>Full Captions Available</span>
              </span>
            )}
            {analysisResult?.view_count && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>👁️</span>
                <span>{Number(analysisResult.view_count).toLocaleString()} views</span>
              </span>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#bbf7d0',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              opacity: isDownloading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!isDownloading) {
                e.target.style.background = 'rgba(34, 197, 94, 0.3)'
                e.target.style.transform = 'scale(1.05)'
              }
            }}
            onMouseOut={(e) => {
              if (!isDownloading) {
                e.target.style.background = 'rgba(34, 197, 94, 0.2)'
                e.target.style.transform = 'scale(1)'
              }
            }}
            title="Download complete analysis as text file"
          >
            <span style={{ fontSize: '16px' }}>{isDownloading ? '⏳' : '💾'}</span>
            <span>{isDownloading ? 'Downloading...' : 'Download TXT'}</span>
          </button>
          
          {/* New Video Button */}
          <button
            onClick={onNewVideo}
            style={{
              background: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#c4b5fd',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(139, 92, 246, 0.3)'
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(139, 92, 246, 0.2)'
              e.target.style.transform = 'scale(1)'
            }}
          >
            <span style={{ fontSize: '16px' }}>🔗</span>
            <span>New Video</span>
          </button>
        </div>
      </div>
      
      {/* Analysis Quality Badge */}
      {analysisResult?.source === 'real_backend_api' && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '18px' }}>✅</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#bbf7d0', fontWeight: '600', margin: 0, fontSize: '14px' }}>
              Real YouTube Analysis Complete
            </p>
            <p style={{ color: '#4ade80', fontSize: '12px', margin: 0 }}>
              Analysis includes real video metadata{analysisResult.metadata.has_transcript ? ' + full transcript with timestamps' : ''} • Model: {analysisResult.metadata.model_used}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// New Full Captions View Component
const ModernCaptionsView = ({ analysisResult, videoInfo }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCaptions, setFilteredCaptions] = useState([])
  const [currentTime, setCurrentTime] = useState(null)

  // Parse captions from raw transcript data
  useEffect(() => {
    if (analysisResult?.raw_transcript_data) {
      // If we have structured transcript data with timestamps
      const captions = analysisResult.raw_transcript_data
      setFilteredCaptions(captions.filter(caption => 
        caption.text.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    } else if (analysisResult?.summary?.transcript_highlights) {
      // Fallback to transcript highlights
      setFilteredCaptions(analysisResult.summary.transcript_highlights.filter(caption => 
        caption.text.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    }
  }, [analysisResult, searchTerm])

  const formatTimestamp = (seconds) => {
    if (typeof seconds === 'string') return seconds
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleTimestampClick = (timestamp) => {
    setCurrentTime(timestamp)
    // You could integrate with YouTube player here
    const videoId = analysisResult?.video_id
    if (videoId) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}&t=${timestamp}s`
      window.open(youtubeUrl, '_blank')
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
      {/* Video Info */}
      {videoInfo && <ModernVideoCard videoInfo={videoInfo} onNewVideo={() => {}} analysisResult={analysisResult} />}

      {/* Captions Section */}
      <div style={{ ...styles.glassStrong, padding: '32px', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>📝</span>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', margin: 0 }}>
                Full Video Captions
              </h3>
              <p style={{
                color: '#c4b5fd',
                fontSize: '14px',
                marginTop: '4px',
                margin: 0
              }}>
                Complete transcript with clickable timestamps
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div style={{ minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search in captions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6'
                e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.2)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        {/* Caption Status */}
        <div style={{
          marginBottom: '24px',
          padding: '16px',
          background: analysisResult?.metadata?.has_transcript 
            ? 'rgba(34, 197, 94, 0.1)' 
            : 'rgba(251, 191, 36, 0.1)',
          border: `1px solid ${analysisResult?.metadata?.has_transcript 
            ? 'rgba(34, 197, 94, 0.3)' 
            : 'rgba(251, 191, 36, 0.3)'}`,
          borderRadius: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>
              {analysisResult?.metadata?.has_transcript ? '✅' : '⚠️'}
            </span>
            <div>
              <p style={{
                color: analysisResult?.metadata?.has_transcript ? '#bbf7d0' : '#fde68a',
                fontWeight: '600',
                margin: 0
              }}>
                {analysisResult?.metadata?.has_transcript 
                  ? 'Official YouTube Captions Available' 
                  : 'Limited Caption Data Available'
                }
              </p>
              <p style={{
                color: analysisResult?.metadata?.has_transcript ? '#4ade80' : '#f59e0b',
                fontSize: '12px',
                margin: 0
              }}>
                {analysisResult?.metadata?.has_transcript 
                  ? `Source: ${analysisResult?.transcript_info?.source || 'YouTube API'} • Language: ${analysisResult?.transcript_info?.language || 'Auto-detected'} • ${analysisResult?.transcript_info?.is_auto_generated ? 'Auto-generated' : 'Manual'} captions`
                  : 'Video may not have captions available. Showing available transcript highlights.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Captions List */}
        <div style={{
          maxHeight: '600px',
          overflowY: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          {filteredCaptions.length > 0 ? (
            <div style={{ padding: '16px' }}>
              {filteredCaptions.map((caption, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    background: currentTime === caption.start ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleTimestampClick(caption.start)}
                  onMouseOver={(e) => {
                    if (currentTime !== caption.start) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentTime !== caption.start) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <div style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    fontWeight: '700',
                    flexShrink: 0,
                    minWidth: '60px',
                    textAlign: 'center'
                  }}>
                    {caption.timestamp || formatTimestamp(caption.start)}
                  </div>
                  <p style={{
                    color: '#f3f4f6',
                    lineHeight: '1.6',
                    flex: 1,
                    margin: 0,
                    fontSize: '15px'
                  }}>
                    {searchTerm && caption.text.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                      caption.text.replace(
                        new RegExp(searchTerm, 'gi'),
                        (match) => `<mark style="background: rgba(139, 92, 246, 0.3); color: white; padding: 0 2px;">${match}</mark>`
                      )
                    ) : (
                      caption.text
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : analysisResult?.metadata?.has_transcript ? (
            // No captions found with search
            <div style={{
              textAlign: 'center',
              padding: '64px 16px',
              color: '#9ca3af'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p style={{ fontSize: '18px', marginBottom: '8px', margin: 0 }}>
                No captions found matching "{searchTerm}"
              </p>
              <p style={{ fontSize: '14px', margin: 0 }}>
                Try a different search term or clear the search to see all captions
              </p>
            </div>
          ) : (
            // No captions available
            <div style={{
              textAlign: 'center',
              padding: '64px 16px',
              color: '#9ca3af'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
              <p style={{ fontSize: '18px', marginBottom: '8px', margin: 0 }}>
                Full Captions Not Available
              </p>
              <p style={{ fontSize: '14px', margin: 0, marginBottom: '16px' }}>
                This video may not have captions or they couldn't be accessed.
              </p>
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <p style={{ color: '#93c5fd', fontSize: '14px', margin: 0 }}>
                  💡 <strong>Good news!</strong> The AI analysis still provides comprehensive insights based on the video's available metadata and content structure.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {filteredCaptions.length > 0 && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '16px' }}>💡</span>
            <p style={{ color: '#93c5fd', fontSize: '14px', margin: 0 }}>
              Click on any timestamp to open the video at that specific time. 
              {searchTerm && ` Found ${filteredCaptions.length} caption${filteredCaptions.length !== 1 ? 's' : ''} matching "${searchTerm}".`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Summary View Component - Simplified for better positioning
const ModernSummaryView = ({ analysisResult, videoInfo, onNewVideo }) => (
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
    {/* Video Info */}
    {videoInfo && <ModernVideoCard videoInfo={videoInfo} onNewVideo={onNewVideo} analysisResult={analysisResult} />}

    {/* Content Grid */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Overview & Takeaways Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '32px'
      }}>
        {/* Overview */}
        <div style={{ ...styles.glass, padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '20px' }}>📝</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', margin: 0 }}>Overview</h3>
          </div>
          <p style={{
            color: '#d1d5db',
            lineHeight: '1.6',
            fontSize: '16px',
            margin: 0
          }}>
            {analysisResult.summary.overview}
          </p>
        </div>

        {/* Key Takeaways */}
        <div style={{ ...styles.glass, padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '20px' }}>💡</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', margin: 0 }}>Key Takeaways</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {analysisResult.summary.key_takeaways.map((takeaway, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '4px'
                }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>{index + 1}</span>
                </div>
                <span style={{ color: '#d1d5db', lineHeight: '1.6' }}>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Points */}
      <div style={{ ...styles.glass, padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '20px' }}>🎯</span>
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', margin: 0 }}>Main Points</h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {analysisResult.summary.main_points.map((point, index) => (
            <div 
              key={index} 
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>{index + 1}</span>
                </div>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transcript Highlights */}
      {analysisResult.summary.transcript_highlights && (
        <div style={{ ...styles.glass, padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '20px' }}>⏱️</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', margin: 0 }}>Transcript Highlights</h3>
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#93c5fd',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              Click timestamps to view in video
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {analysisResult.summary.transcript_highlights.map((highlight, index) => (
              <div 
                key={index} 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '24px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => {
                  const videoId = analysisResult?.video_id
                  if (videoId) {
                    const timeSeconds = highlight.timestamp.split(':').reduce((acc, time) => (60 * acc) + +time)
                    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}&t=${timeSeconds}s`
                    window.open(youtubeUrl, '_blank')
                  }
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  {highlight.timestamp}
                </div>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                  flex: 1,
                  margin: 0
                }}>
                  "{highlight.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)

// Chat View Component - Simplified
const ModernChatView = ({ analysisResult, chatHistory, setChatHistory, currentQuestion, setCurrentQuestion, isAsking, onAskQuestion, chatMessagesRef }) => (
  <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
    <div style={{
      ...styles.glassStrong,
      overflow: 'hidden',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Chat Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>💬</span>
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', margin: 0 }}>
                Chat About This Video
              </h3>
              <p style={{
                color: '#c4b5fd',
                fontSize: '14px',
                marginTop: '4px',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '400px'
              }}>
                "{analysisResult.title}"
              </p>
            </div>
          </div>
          <button
            onClick={() => setChatHistory([])}
            style={{
              color: '#9ca3af',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'white'
              e.target.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#9ca3af'
              e.target.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatMessagesRef}
        style={{
          height: '500px',
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {chatHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
            }}>
              <span style={{ fontSize: '32px' }}>🤖</span>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: '0 0 12px 0' }}>
                I know everything about this video!
              </p>
              <p style={{ color: '#d1d5db', margin: 0 }}>
                Ask me about key points, specific topics, timestamps, or anything you're curious about.
              </p>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {analysisResult.metadata?.topics_covered?.slice(0, 6).map((topic, index) => (
                <span 
                  key={index} 
                  style={{
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#c4b5fd',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        ) : (
          chatHistory.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '70%',
                padding: message.type === 'user' ? '0 0 0 80px' : '0 80px 0 0'
              }}>
                <div
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    background: message.type === 'user'
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                      : message.type === 'error'
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: message.type === 'error' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                    color: message.type === 'user' ? 'white' : message.type === 'error' ? '#fca5a5' : '#f3f4f6'
                  }}
                >
                  <p style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                    margin: 0,
                    marginBottom: '8px'
                  }}>
                    {message.content}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    opacity: 0.7,
                    textAlign: 'right',
                    margin: 0
                  }}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isAsking && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ maxWidth: '70%', padding: '0 80px 0 0' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#d1d5db',
                padding: '16px 20px',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#a855f7',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite 0.1s'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#06b6d4',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite 0.2s'
                    }}></div>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '24px'
      }}>
        <form onSubmit={onAskQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Ask about the video content, main points, specific timestamps, or topics..."
              style={{
                flex: 1,
                padding: '16px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6'
                e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.2)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                e.target.style.boxShadow = 'none'
              }}
              disabled={isAsking}
            />
            <button
              type="submit"
              disabled={!currentQuestion.trim() || isAsking}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '16px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: (!currentQuestion.trim() || isAsking) ? 0.5 : 1
              }}
              onMouseOver={(e) => {
                if (currentQuestion.trim() && !isAsking) {
                  e.target.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.3)'
                }
              }}
              onMouseOut={(e) => {
                e.target.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '18px' }}>{isAsking ? '⏳' : '🚀'}</span>
              <span>{isAsking ? 'Sending...' : 'Ask'}</span>
            </button>
          </div>

          {/* Quick Questions */}
          {chatHistory.length === 0 && (
            <div>
              <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '500', marginBottom: '12px', margin: 0 }}>
                Quick questions to get started:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  "What are the main points?",
                  "Can you summarize this?",
                  "What should I remember?",
                  "Explain the key concepts",
                  "What was said at 2:30?",
                  "Give me actionable insights",
                  "Show me important timestamps"
                ].map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentQuestion(question)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#d1d5db',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)'
                      e.target.style.color = 'white'
                      e.target.style.transform = 'scale(1.05)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      e.target.style.color = '#d1d5db'
                      e.target.style.transform = 'scale(1)'
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>

    {/* Add bounce keyframes */}
    <style>{`
      @keyframes bounce {
        0%, 100% {
          transform: translateY(-25%);
          animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
          transform: none;
          animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
      }
    `}</style>
  </div>
)

// Main YouTube Summarizer Component
const YouTubeSummarizer = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  
  // State management
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [isAsking, setIsAsking] = useState(false)
  const [activeTab, setActiveTab] = useState('input')
  const [videoInfo, setVideoInfo] = useState(null)
  const [apiStatus, setApiStatus] = useState({ gemini_available: false, api_key_configured: false })
  
  const chatMessagesRef = useRef(null)
  const urlInputRef = useRef(null)

  // Initialize API status with backend check
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await getAPIStatus()
        setApiStatus(status)
        console.log('🔍 Backend API Status:', status)
      } catch (error) {
        console.error('Failed to check API status:', error)
        setApiStatus({ 
          backend_available: false, 
          gemini_api: false, 
          youtube_api: false,
          error: error.message 
        })
      }
    }
    checkStatus()
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [chatHistory])

  // URL validation
  const isValidYouTubeUrl = (url) => YOUTUBE_URL_REGEX.test(url)

  // Enhanced video analysis with retry feedback
  const analyzeVideo = async (url) => {
    setIsAnalyzing(true)
    setError('')
    
    try {
      const result = await analyzeYouTubeVideo(url)
      setAnalysisResult(result)
      setVideoInfo({
        id: result.video_id,
        title: result.title,
        duration: result.duration,
        channel: result.channel,
        thumbnail: result.thumbnail
      })
      setActiveTab('summary')
      setChatHistory([])
    } catch (error) {
      console.error('Analysis error:', error)
      setError(error.message || 'Failed to analyze video. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Chat functionality
  const askQuestion = async (question) => {
    if (!question.trim() || !analysisResult) return
    
    setIsAsking(true)
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString()
    }
    
    setChatHistory(prev => [...prev, userMessage])
    setCurrentQuestion('')
    
    try {
      const response = await askQuestionAboutVideo(analysisResult.context_id, question, chatHistory)
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.answer,
        timestamp: new Date().toLocaleTimeString()
      }
      
      setChatHistory(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: `Sorry, I couldn't process your question: ${error.message}`,
        timestamp: new Date().toLocaleTimeString()
      }
      setChatHistory(prev => [...prev, errorMessage])
    } finally {
      setIsAsking(false)
    }
  }

  // Event handlers
  const handleUrlSubmit = (e) => {
    e.preventDefault()
    if (!youtubeUrl.trim()) {
      setError('Please enter a YouTube URL')
      return
    }
    if (!isValidYouTubeUrl(youtubeUrl)) {
      setError('Please enter a valid YouTube URL')
      return
    }
    analyzeVideo(youtubeUrl)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const startNewAnalysis = () => {
    setYoutubeUrl('')
    setAnalysisResult(null)
    setVideoInfo(null)
    setChatHistory([])
    setError('')
    setActiveTab('input')
    if (urlInputRef.current) {
      urlInputRef.current.focus()
    }
  }

  const handleAskQuestion = (e) => {
    e.preventDefault()
    askQuestion(currentQuestion)
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <ModernHeader 
        currentUser={currentUser}
        onLogout={handleLogout}
        apiStatus={apiStatus}
      />

      {/* Main Content */}
      <main style={{ padding: '48px 0' }}>
        {/* Tab Navigation */}
        <ModernTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasAnalysis={!!analysisResult}
        />

        {/* Content */}
        {activeTab === 'input' && (
          <ModernVideoInput
            youtubeUrl={youtubeUrl}
            setYoutubeUrl={setYoutubeUrl}
            onAnalyze={handleUrlSubmit}
            isAnalyzing={isAnalyzing}
            error={error}
            apiStatus={apiStatus}
            urlInputRef={urlInputRef}
          />
        )}

        {activeTab === 'summary' && analysisResult && (
          <ModernSummaryView
            analysisResult={analysisResult}
            videoInfo={videoInfo}
            onNewVideo={startNewAnalysis}
          />
        )}

        {activeTab === 'captions' && analysisResult && (
          <ModernCaptionsView
            analysisResult={analysisResult}
            videoInfo={videoInfo}
          />
        )}

        {activeTab === 'chat' && analysisResult && (
          <ModernChatView
            analysisResult={analysisResult}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            isAsking={isAsking}
            onAskQuestion={handleAskQuestion}
            chatMessagesRef={chatMessagesRef}
          />
        )}
      </main>
    </div>
  )
}

export default YouTubeSummarizer