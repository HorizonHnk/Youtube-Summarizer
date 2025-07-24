import React, { useState, useEffect } from 'react'
import useResponsive from '../hooks/useResponsive'

function LoadingScreen() {
  const [loadingText, setLoadingText] = useState('Initializing')
  const [progress, setProgress] = useState(0)
  
  const { 
    isMobile, 
    isTablet, 
    isDesktop,
    isLargeScreen,
    getContainerMaxWidth,
    getPadding,
    getFontScale,
    getGridColumns
  } = useResponsive()

  useEffect(() => {
    const loadingSteps = [
      { 
        text: isMobile ? 'Starting App' : 'Initializing YouTube Summarizer', 
        progress: 20 
      },
      { 
        text: isMobile ? 'Connecting AI' : 'Connecting to AI Services', 
        progress: 40 
      },
      { 
        text: isMobile ? 'Loading Auth' : 'Loading Authentication System', 
        progress: 60 
      },
      { 
        text: isMobile ? 'Preparing UI' : 'Preparing User Interface', 
        progress: 80 
      },
      { 
        text: isMobile ? 'Ready!' : 'Ready to Analyze Videos', 
        progress: 100 
      }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text)
        setProgress(loadingSteps[currentStep].progress)
        currentStep++
      } else {
        clearInterval(interval)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [isMobile])

  const containerStyle = {
    maxWidth: getContainerMaxWidth(),
    margin: '0 auto',
    padding: `0 ${getPadding()}`
  }

  const backgroundSize = isMobile ? 'w-60 h-60' : isTablet ? 'w-70 h-70' : 'w-80 h-80'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 ${backgroundSize} bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 ${backgroundSize} bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}></div>
        {!isMobile && (
          <div className={`absolute top-1/2 left-1/2 ${isTablet ? 'w-50 h-50' : 'w-60 h-60'} bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce`}></div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen" style={containerStyle}>
        <div className="text-center w-full">
          {/* Logo Section */}
          <div className={`${isMobile ? 'mb-8' : 'mb-12'}`}>
            <div className={`inline-flex items-center justify-center ${
              isMobile ? 'w-16 h-16' : 
              isTablet ? 'w-20 h-20' : 
              'w-24 h-24'
            } bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl shadow-2xl ${isMobile ? 'mb-4' : 'mb-6'} animate-float`}>
              <span className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'}`}>🎥</span>
            </div>
            <h1 className={`font-bold text-white mb-2 ${
              isMobile ? 'text-2xl' : 
              isTablet ? 'text-3xl' : 
              'text-4xl'
            }`}>
              YouTube Summarizer
            </h1>
            <p className={`text-purple-200 ${
              isMobile ? 'text-base' : 
              isTablet ? 'text-lg' : 
              'text-lg'
            }`}>
              {isMobile ? 'AI Video Analysis' : 'AI-Powered Video Analysis Platform'}
            </p>
          </div>

          {/* Loading Animation */}
          <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
            <div className="relative">
              {/* Main Loading Circle */}
              <div className={`${
                isMobile ? 'w-24 h-24' : 
                isTablet ? 'w-28 h-28' : 
                'w-32 h-32'
              } mx-auto relative`}>
                <svg className={`${
                  isMobile ? 'w-24 h-24' : 
                  isTablet ? 'w-28 h-28' : 
                  'w-32 h-32'
                } transform -rotate-90`} viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={isMobile ? "4" : "6"}
                    fill="transparent"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth={isMobile ? "4" : "6"}
                    fill="transparent"
                    strokeDasharray={`${progress * 2.83} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`font-bold text-white mb-1 ${
                      isMobile ? 'text-lg' : 
                      isTablet ? 'text-xl' : 
                      'text-2xl'
                    }`}>
                      {progress}%
                    </div>
                    <div className={`${isMobile ? 'w-6 h-0.5' : 'w-8 h-1'} bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className={`${isMobile ? 'mb-8' : 'mb-12'}`}>
            <p className={`text-white font-medium mb-2 ${
              isMobile ? 'text-base min-h-[24px]' : 
              isTablet ? 'text-lg min-h-[28px]' : 
              'text-xl min-h-[28px]'
            }`}>
              {loadingText}
            </p>
            <div className="flex justify-center">
              <div className={`flex ${isMobile ? 'space-x-1' : 'space-x-1'}`}>
                <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-purple-500 rounded-full animate-bounce`}></div>
                <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-blue-500 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-indigo-500 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>

          {/* Feature Preview */}
          <div className={`grid gap-4 ${
            isMobile ? 'grid-cols-1' : 
            isTablet ? 'grid-cols-3' : 
            'grid-cols-1 md:grid-cols-3'
          } max-w-3xl mx-auto`}>
            {[
              {
                icon: "🧠",
                title: "AI Analysis",
                desc: isMobile ? "Video processing" : "Advanced video processing"
              },
              {
                icon: "💬",
                title: "Interactive Chat",
                desc: isMobile ? "Q&A features" : "Q&A with video content"
              },
              {
                icon: "📊",
                title: "Rich Insights",
                desc: isMobile ? "Smart summaries" : "Comprehensive summaries"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl ${isMobile ? 'p-4' : 'p-6'} text-center opacity-60 hover:opacity-100 transition-all duration-300`}
              >
                <div className={`${isMobile ? 'text-2xl mb-2' : 'text-3xl mb-3'} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-white font-semibold mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className={`${isMobile ? 'mt-12' : 'mt-16'} text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            <p className={`${isMobile ? 'mb-2' : 'mb-2'}`}>
              {isMobile ? 'Powered by Gemini AI' : 'Powered by Google Gemini AI'}
            </p>
            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-center items-center space-x-4'}`}>
              <span className="flex items-center justify-center">
                <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-green-500 rounded-full mr-2`}></div>
                <span>Secure</span>
              </span>
              <span className="flex items-center justify-center">
                <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-blue-500 rounded-full mr-2`}></div>
                <span>Fast</span>
              </span>
              <span className="flex items-center justify-center">
                <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-purple-500 rounded-full mr-2`}></div>
                <span>Reliable</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen