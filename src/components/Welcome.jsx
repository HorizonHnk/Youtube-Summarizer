import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Welcome = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleGetStarted = () => {
    if (user) {
      navigate('/summarizer')
    } else {
      navigate('/login')
    }
  }

  const features = [
    {
      icon: '🎬',
      title: 'Real YouTube Analysis',
      description: 'Extract insights from any YouTube video using advanced AI and real YouTube API integration with official captions support'
    },
    {
      icon: '📝',
      title: 'Enhanced Captions & Subtitles',
      description: 'Access official YouTube captions with multiple language support, timestamp precision, and manual vs auto-generated detection'
    },
    {
      icon: '🧠',
      title: 'Gemini AI-Powered Insights',
      description: 'Get comprehensive summaries, key takeaways, and actionable insights powered by Google\'s advanced Gemini AI with smart retry logic'
    },
    {
      icon: '💾',
      title: 'Professional Download Reports',
      description: 'Export complete analysis as clean, formatted text files for offline reference with all metadata and timestamps'
    },
    {
      icon: '💬',
      title: 'Interactive Video Chat',
      description: 'Ask questions about the video content and get intelligent, context-aware responses based on real transcript data'
    },
    {
      icon: '🔄',
      title: 'Smart Retry & Error Handling',
      description: 'Reliable analysis with automatic retry mechanisms for API overloads and graceful fallback to enhanced mock responses'
    }
  ]

  const stats = [
    { icon: '🎯', number: '100%', label: 'Real YouTube Data' },
    { icon: '🚀', number: '3x', label: 'Faster Analysis' },
    { icon: '📊', number: '15+', label: 'Analysis Points' },
    { icon: '🌍', number: '50+', label: 'Languages Supported' }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.8s ease-in-out'
    }}>
      {/* Enhanced Header with Developer Info */}
      <header style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: '700',
            color: 'white'
          }}>
            YS
          </div>
          <div>
            <h1 style={{ 
              color: 'white', 
              margin: 0, 
              fontSize: '28px', 
              fontWeight: '800'
            }}>
              YouTube Summarizer v2.0
            </h1>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              margin: 0, 
              fontSize: '14px',
              fontWeight: '500'
            }}>
              by <strong>Ngoy Henock Mukonkole</strong> • Real YouTube API + Gemini AI
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {user ? (
            <button
              onClick={() => navigate('/summarizer')}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                border: 'none',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)'
              }}
            >
              🎬 Start Analyzing
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                style={{
                  background: 'transparent',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)'
                }}
              >
                Sign Up Free
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '60px 40px', textAlign: 'center' }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{
            color: 'white',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            lineHeight: '1.1'
          }}>
            Transform YouTube Videos into
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Actionable Insights
            </span>
          </h1>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.3rem',
            maxWidth: '700px',
            margin: '0 auto 32px',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Powered by <strong>Real YouTube API</strong> and <strong>Google Gemini AI</strong>. 
            Extract key insights, enhanced captions, and actionable takeaways from any video in seconds.
          </p>

          {/* Stats Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'white'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleGetStarted}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
              border: 'none',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '16px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 12px 40px rgba(255, 107, 107, 0.4)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-4px)'
              e.target.style.boxShadow = '0 16px 50px rgba(255, 107, 107, 0.5)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.4)'
            }}
          >
            <span>{user ? '🚀 Start Analyzing' : '🎬 Get Started Free'}</span>
            <span style={{ fontSize: '16px' }}>→</span>
          </button>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                opacity: isLoaded ? 1 : 0,
                animationDelay: `${index * 0.1}s`
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-8px)'
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <div style={{
                fontSize: '3.5rem',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '16px',
                margin: 0
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: '1.6',
                margin: 0,
                fontSize: '15px'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Prominent Developer Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2))',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '60px 40px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          marginBottom: '60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)',
            zIndex: 0
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '32px',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <span style={{ fontSize: '3rem' }}>👨‍💻</span>
              Meet the Developer
            </h2>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '32px',
              marginBottom: '32px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: '900',
                color: 'white',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
              }}>
                NH
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '2.2rem',
                  fontWeight: '800',
                  margin: 0,
                  marginBottom: '12px',
                  letterSpacing: '-0.5px'
                }}>
                  NGOY HENOCK MUKONKOLE
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  🚀 Full-Stack Developer & AI Enthusiast
                </p>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  Specializing in YouTube API Integration & Gemini AI
                </p>
              </div>
            </div>

            {/* Contact Links Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <a
                href="mailto:hhnk3693@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '20px 24px',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  fontSize: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)'
                  e.target.style.transform = 'translateY(-4px)'
                  e.target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <span style={{ fontSize: '24px' }}>📧</span>
                <div>
                  <div style={{ fontWeight: '700' }}>Email</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>hhnk3693@gmail.com</div>
                </div>
              </a>
              
              <a
                href="https://github.com/HorizonHnk/Youtube-Summarizer.git"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '20px 24px',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  fontSize: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)'
                  e.target.style.transform = 'translateY(-4px)'
                  e.target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <span style={{ fontSize: '24px' }}>🐙</span>
                <div>
                  <div style={{ fontWeight: '700' }}>GitHub Repository</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>Source Code & Documentation</div>
                </div>
              </a>
              
              <a
                href="https://www.youtube.com/playlist?list=PLrZbkNpNVSwwEIPRtoMxEy14_2DFuMM8k"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '20px 24px',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  fontSize: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)'
                  e.target.style.transform = 'translateY(-4px)'
                  e.target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <span style={{ fontSize: '24px' }}>📺</span>
                <div>
                  <div style={{ fontWeight: '700' }}>YouTube Channel</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>Tutorials & Development</div>
                </div>
              </a>
            </div>

            {/* Tech Stack */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginBottom: '16px',
                margin: 0
              }}>
                🛠️ Tech Stack Used
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center'
              }}>
                {['React 19', 'Node.js', 'YouTube Data API v3', 'Google Gemini AI', 'Firebase Auth', 'Express.js', 'Real-time Captions'].map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '16px',
            margin: 0
          }}>
            Ready to Transform Your YouTube Experience?
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
            marginBottom: '24px',
            margin: 0
          }}>
            Join thousands of users already using real YouTube API integration for smarter video analysis
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
              border: 'none',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)'
            }}
          >
            {user ? '🚀 Start Analyzing Now' : '🎬 Start Your Free Account'}
          </button>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer style={{
        padding: '30px 40px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          flexWrap: 'wrap',
          fontSize: '14px'
        }}>
          <span>© 2025 YouTube Summarizer v2.0</span>
          <span>•</span>
          <span>Powered by Real YouTube API + Gemini AI</span>
          <span>•</span>
          <span>Built with ❤️ by <strong>Ngoy Henock Mukonkole</strong></span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          fontSize: '12px',
          opacity: 0.8
        }}>
          <a href="mailto:hhnk3693@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
            📧 Contact
          </a>
          <a href="https://github.com/HorizonHnk/Youtube-Summarizer.git" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            🐙 GitHub
          </a>
          <a href="https://www.youtube.com/playlist?list=PLrZbkNpNVSwwEIPRtoMxEy14_2DFuMM8k" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            📺 YouTube
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Welcome