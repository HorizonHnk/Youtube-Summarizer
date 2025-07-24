import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import useResponsive from '../hooks/useResponsive'

function NotFound() {
  const [countdown, setCountdown] = useState(10)
  const [isVisible, setIsVisible] = useState(false)
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  
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
    setIsVisible(true)
    
    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          // Redirect based on auth status
          navigate(currentUser ? '/app' : '/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentUser, navigate])

  const handleStopCountdown = () => {
    setCountdown(0)
  }

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
        
        {/* Floating Elements - Hide on mobile for performance */}
        {!isMobile && (
          <>
            <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-float"></div>
            <div className="absolute bottom-32 right-32 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/3 right-20 w-3 h-3 bg-indigo-400 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div style={containerStyle} className={`w-full text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* 404 Display */}
          <div className={`${isMobile ? 'mb-8' : 'mb-12'}`}>
            <div className={`font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text animate-pulse-glow ${
              isMobile ? 'text-6xl mb-4' : 
              isTablet ? 'text-7xl mb-5' : 
              'text-9xl mb-6'
            }`}>
              404
            </div>
            <div className={`${isMobile ? 'text-4xl mb-6' : 'text-6xl mb-8'} animate-float`}>🎥</div>
            <h1 className={`font-bold text-white mb-4 ${
              isMobile ? 'text-2xl' : 
              isTablet ? 'text-3xl' : 
              'text-4xl md:text-5xl'
            }`}>
              Page Not Found
            </h1>
            <p className={`text-purple-200 leading-relaxed ${
              isMobile ? 'text-base mb-6' : 
              isTablet ? 'text-lg mb-7' : 
              'text-xl mb-8'
            }`}>
              {isMobile ? 
                "Oops! The page you're looking for doesn't exist in our video analysis universe." :
                "Oops! It looks like you've wandered into uncharted territory. The page you're looking for doesn't exist in our video analysis universe."
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl ${isMobile ? 'p-6 mb-6' : 'p-8 mb-8'}`}>
            <h2 className={`font-bold text-white mb-6 ${
              isMobile ? 'text-lg' : 
              isTablet ? 'text-xl' : 
              'text-2xl'
            }`}>
              Where would you like to go?
            </h2>
            
            <div className={`grid gap-4 mb-6 ${isMobile ? 'space-y-3' : ''}`}>
              {currentUser ? (
                <>
                  <Link
                    to="/app"
                    onClick={handleStopCountdown}
                    className={`group bg-gradient-to-r from-purple-500 to-blue-500 text-white ${
                      isMobile ? 'px-6 py-3 text-base' : 
                      'px-8 py-4 text-lg'
                    } rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="mr-2">🔍</span>
                      {isMobile ? 'Go to App' : 'Go to YouTube Summarizer'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    onClick={handleStopCountdown}
                    className={`group bg-gradient-to-r from-purple-500 to-blue-500 text-white ${
                      isMobile ? 'px-6 py-3 text-base' : 
                      'px-8 py-4 text-lg'
                    } rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="mr-2">🏠</span>
                      Back to Home
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'sm:grid-cols-2 gap-4'}`}>
                    <Link
                      to="/signup"
                      onClick={handleStopCountdown}
                      className={`bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 ${
                        isMobile ? 'px-4 py-2.5 text-sm' : 
                        'px-6 py-3'
                      } rounded-xl font-semibold transition-all duration-300 hover:scale-105`}
                    >
                      <span className="mr-2">🚀</span>
                      Sign Up
                    </Link>
                    
                    <Link
                      to="/login"
                      onClick={handleStopCountdown}
                      className={`bg-white/10 hover:bg-white/20 border border-white/20 text-white ${
                        isMobile ? 'px-4 py-2.5 text-sm' : 
                        'px-6 py-3'
                      } rounded-xl font-semibold transition-all duration-300 hover:scale-105`}
                    >
                      <span className="mr-2">🔑</span>
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Auto Redirect Info */}
            {countdown > 0 && (
              <div className={`bg-blue-500/10 border border-blue-500/20 rounded-2xl ${isMobile ? 'p-3 mb-4' : 'p-4 mb-6'}`}>
                <div className={`flex items-center justify-center mb-3 ${isMobile ? 'flex-col space-y-2' : ''}`}>
                  <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} border-2 border-blue-400 border-t-transparent rounded-full animate-spin ${!isMobile ? 'mr-3' : ''}`}></div>
                  <span className={`text-blue-300 font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {isMobile ? `Redirecting in ${countdown}s...` : `Auto-redirecting in ${countdown} seconds...`}
                  </span>
                </div>
                <button
                  onClick={handleStopCountdown}
                  className={`text-blue-400 hover:text-blue-300 underline transition-colors duration-300 ${isMobile ? 'text-sm' : 'text-sm'}`}
                >
                  Cancel auto-redirect
                </button>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl ${isMobile ? 'p-4 mb-6' : 'p-6 mb-8'}`}>
            <h3 className={`font-semibold text-white mb-4 flex items-center justify-center ${isMobile ? 'text-base' : 'text-xl'}`}>
              <span className="mr-2">💡</span>
              Need Help?
            </h3>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'sm:grid-cols-2 gap-4'} ${isMobile ? 'text-sm' : 'text-sm'} text-gray-300`}>
              <div className="text-center">
                <div className={`${isMobile ? 'text-xl mb-2' : 'text-2xl mb-2'}`}>🎥</div>
                <p className={`font-medium text-white mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>Analyze Videos</p>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {isMobile ? 'AI-powered video insights' : 'Transform YouTube videos into AI-powered insights'}
                </p>
              </div>
              <div className="text-center">
                <div className={`${isMobile ? 'text-xl mb-2' : 'text-2xl mb-2'}`}>💬</div>
                <p className={`font-medium text-white mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>Interactive Chat</p>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {isMobile ? 'Q&A with video content' : 'Ask questions about video content with AI'}
                </p>
              </div>
            </div>
          </div>

          {/* Fun Facts - Simplified for mobile */}
          <div className={`bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-2xl ${isMobile ? 'p-4' : 'p-6'}`}>
            <h3 className={`font-semibold text-white mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>
              🎯 Did you know?
            </h3>
            <p className={`text-gray-300 leading-relaxed ${isMobile ? 'text-sm mb-4' : 'text-sm leading-relaxed'}`}>
              {isMobile ? 
                'Our AI processes videos with captions for detailed analysis. Join thousands analyzing videos smarter!' :
                'Our AI can process videos with captions to provide incredibly detailed analysis, including target audience identification, content type classification, and key insights extraction. Join thousands of users who are already analyzing videos smarter!'
              }
            </p>
            
            <div className="flex justify-center">
              <div className={`grid grid-cols-3 ${isMobile ? 'gap-4' : 'gap-6'} text-center ${isMobile ? 'text-xs' : 'text-xs'}`}>
                <div>
                  <div className={`font-bold text-purple-400 ${isMobile ? 'text-base' : 'text-lg'}`}>10K+</div>
                  <div className="text-gray-400">Videos Analyzed</div>
                </div>
                <div>
                  <div className={`font-bold text-blue-400 ${isMobile ? 'text-base' : 'text-lg'}`}>50K+</div>
                  <div className="text-gray-400">Questions Asked</div>
                </div>
                <div>
                  <div className={`font-bold text-green-400 ${isMobile ? 'text-base' : 'text-lg'}`}>99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className={`${isMobile ? 'mt-6' : 'mt-8'} text-center text-gray-400`}>
            <p className={`mb-2 ${isMobile ? 'text-sm' : 'text-sm'}`}>
              {isMobile ? 'Still lost?' : 'Still lost? Get in touch with the developer:'}
            </p>
            <a
              href="mailto:hhnk3693@gmail.com?subject=YouTube%20Summarizer%20-%20Page%20Not%20Found%20Help"
              className={`inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 ${isMobile ? 'text-sm' : 'text-base'}`}
            >
              <span>📧</span>
              <span>{isMobile ? 'Email' : 'hhnk3693@gmail.com'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound