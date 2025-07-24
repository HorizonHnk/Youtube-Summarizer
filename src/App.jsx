import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import YouTubeSummarizer from './components/YouTubeSummarizer.jsx'

// Inline styles object
const appStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #7c2d92 50%, #0f172a 100%)',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px'
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
    fontSize: '16px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  buttonSecondary: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    fontWeight: '500',
    padding: '16px 32px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  backgroundElements: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  }
}

// Modern Loading Component
const ModernLoading = () => (
  <div style={appStyles.container}>
    <div style={appStyles.centerContent}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            margin: '0 auto'
          }}>
            <span style={{ fontSize: '32px' }}>🎥</span>
          </div>
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '64px',
            height: '64px',
            border: '4px solid #a855f7',
            borderTop: '4px solid transparent',
            borderRadius: '16px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <div>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '8px',
            margin: 0
          }}>
            YouTube Summarizer
          </h2>
          <p style={{ color: '#c4b5fd', margin: 0 }}>
            Loading your AI-powered experience...
          </p>
        </div>
      </div>
    </div>
    
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

// Modern Welcome Page
const ModernWelcome = () => (
  <div style={{ ...appStyles.container, position: 'relative', overflow: 'hidden' }}>
    {/* Animated Background Elements */}
    <div style={appStyles.backgroundElements}>
      <div style={{
        position: 'absolute',
        top: '-160px',
        right: '-160px',
        width: '320px',
        height: '320px',
        background: '#8b5cf6',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(64px)',
        opacity: 0.2,
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-160px',
        left: '-160px',
        width: '320px',
        height: '320px',
        background: '#3b82f6',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(64px)',
        opacity: 0.2,
        animation: 'pulse 4s ease-in-out infinite 1s'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '384px',
        height: '384px',
        background: '#06b6d4',
        borderRadius: '50%',
        mixBlendMode: 'multiply',
        filter: 'blur(64px)',
        opacity: 0.1,
        animation: 'pulse 4s ease-in-out infinite 2s'
      }}></div>
    </div>

    {/* Content */}
    <div style={{ 
      position: 'relative', 
      zIndex: 10,
      ...appStyles.centerContent,
      padding: '24px'
    }}>
      <div style={{ 
        textAlign: 'center', 
        maxWidth: '1000px', 
        width: '100%'
      }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '96px',
            height: '96px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            marginBottom: '32px'
          }}>
            <span style={{ fontSize: '48px' }}>🎥</span>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: '700',
              color: 'white',
              lineHeight: '1.1',
              marginBottom: '16px',
              margin: 0
            }}>
              YouTube
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Summarizer
              </span>
            </h1>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: '#d1d5db',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Transform any YouTube video into AI-powered insights, summaries, and interactive conversations. 
              Get the key information you need in seconds.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 640 ? 'column' : 'row',
          gap: '24px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '80px'
        }}>
          <Link 
            to="/signup" 
            style={{
              ...appStyles.button,
              padding: '20px 40px',
              fontSize: '18px',
              fontWeight: '700',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.3)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <span>🚀</span>
            <span>Get Started Free</span>
          </Link>
          
          <Link 
            to="/login" 
            style={{
              ...appStyles.buttonSecondary,
              padding: '20px 40px',
              fontSize: '18px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)'
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              e.target.style.transform = 'scale(1)'
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '64px'
        }}>
          {[
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Get comprehensive video analysis in seconds with advanced AI'
            },
            {
              icon: '🧠',
              title: 'Deep Understanding',
              description: 'AI extracts key insights, themes, and actionable takeaways'
            },
            {
              icon: '💬',
              title: 'Interactive Chat',
              description: 'Ask questions and get detailed answers about video content'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              style={{
                ...appStyles.glass,
                padding: '32px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.querySelector('.feature-icon').style.transform = 'scale(1.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.querySelector('.feature-icon').style.transform = 'scale(1)'
              }}
            >
              <div 
                className="feature-icon"
                style={{ 
                  fontSize: '40px', 
                  marginBottom: '24px',
                  transition: 'transform 0.3s ease'
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: 'white', 
                marginBottom: '16px',
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

        {/* Trust Indicators */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ color: '#9ca3af', marginBottom: '24px', margin: 0 }}>
            Powered by cutting-edge AI technology
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            opacity: 0.6,
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🔥</span>
              <span style={{ fontWeight: '600', color: 'white' }}>Firebase</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🧠</span>
              <span style={{ fontWeight: '600', color: 'white' }}>Google Gemini</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>⚛️</span>
              <span style={{ fontWeight: '600', color: 'white' }}>React</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.3; }
      }
    `}</style>
  </div>
)

// Modern Login Page
const ModernLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      await login(email, password)
      navigate('/app')
    } catch (error) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={appStyles.centerContent}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              marginBottom: '24px',
              textDecoration: 'none'
            }}
          >
            <span style={{ fontSize: '32px' }}>🎥</span>
          </Link>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '8px',
            margin: 0
          }}>
            Welcome Back!
          </h1>
          <p style={{ color: '#d1d5db', margin: 0 }}>
            Sign in to continue your AI-powered journey
          </p>
        </div>

        {/* Form Card */}
        <div style={{ ...appStyles.glassStrong, padding: '32px', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}>
          {/* Firebase Status */}
          {isFirebaseConfigured && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#4ade80', fontSize: '20px' }}>🔥</span>
                <div>
                  <p style={{ color: '#bbf7d0', fontWeight: '600', margin: 0 }}>Firebase Connected</p>
                  <p style={{ color: 'rgba(187, 247, 208, 0.7)', fontSize: '14px', margin: 0 }}>
                    Real authentication enabled
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#f87171', fontSize: '20px' }}>⚠️</span>
                <p style={{ color: '#fca5a5', margin: 0 }}>{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={appStyles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                style={{ 
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={appStyles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...appStyles.button,
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                fontWeight: '700',
                opacity: loading ? 0.5 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)'
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#d1d5db', margin: 0 }}>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                style={{ 
                  color: '#a855f7', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#c084fc'}
                onMouseOut={(e) => e.target.style.color = '#a855f7'}
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              color: '#9ca3af', 
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'white'}
            onMouseOut={(e) => e.target.style.color = '#9ca3af'}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Modern Signup Page
const ModernSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    try {
      setLoading(true)
      setError('')
      await signup(email, password)
      navigate('/app')
    } catch (error) {
      setError(error.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={appStyles.centerContent}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              marginBottom: '24px',
              textDecoration: 'none'
            }}
          >
            <span style={{ fontSize: '32px' }}>🎥</span>
          </Link>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '8px',
            margin: 0
          }}>
            Create Account
          </h1>
          <p style={{ color: '#d1d5db', margin: 0 }}>
            Join thousands using AI to understand videos better
          </p>
        </div>

        {/* Form Card */}
        <div style={{ ...appStyles.glassStrong, padding: '32px', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}>
          {/* Firebase Status */}
          {isFirebaseConfigured && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#4ade80', fontSize: '20px' }}>🔥</span>
                <div>
                  <p style={{ color: '#bbf7d0', fontWeight: '600', margin: 0 }}>Firebase Connected</p>
                  <p style={{ color: 'rgba(187, 247, 208, 0.7)', fontSize: '14px', margin: 0 }}>
                    Secure account creation enabled
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#f87171', fontSize: '20px' }}>⚠️</span>
                <p style={{ color: '#fca5a5', margin: 0 }}>{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label 
                htmlFor="signup-email" 
                style={{ 
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}
              >
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={appStyles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="signup-password" 
                style={{ 
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}
              >
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password (6+ characters)"
                style={appStyles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
              <p style={{ 
                fontSize: '12px', 
                color: '#9ca3af', 
                marginTop: '4px', 
                margin: 0 
              }}>
                Password must be at least 6 characters long
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...appStyles.button,
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                fontWeight: '700',
                opacity: loading ? 0.5 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)'
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#d1d5db', margin: 0 }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: '#a855f7', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#c084fc'}
                onMouseOut={(e) => e.target.style.color = '#a855f7'}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              color: '#9ca3af', 
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'white'}
            onMouseOut={(e) => e.target.style.color = '#9ca3af'}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()
  
  if (loading) {
    return <ModernLoading />
  }
  
  return currentUser ? children : <Navigate to="/login" replace />
}

// Public Route wrapper
function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth()
  
  if (loading) {
    return <ModernLoading />
  }
  
  return currentUser ? <Navigate to="/app" replace /> : children
}

// App content with development indicators
function AppContent() {
  const { isFirebaseConfigured } = useAuth()
  
  return (
    <div style={appStyles.container}>
      {/* Development indicators removed to prevent overlap */}

      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <ModernWelcome />
            </PublicRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <ModernLogin />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <ModernSignup />
            </PublicRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <YouTubeSummarizer />
            </ProtectedRoute>
          } 
        />

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div style={appStyles.centerContent}>
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '80px', marginBottom: '32px' }}>🔍</div>
                <div>
                  <h1 style={{ 
                    fontSize: '64px', 
                    fontWeight: '700', 
                    color: 'white', 
                    marginBottom: '16px',
                    margin: 0
                  }}>
                    404
                  </h1>
                  <p style={{ 
                    fontSize: '20px', 
                    color: '#d1d5db', 
                    marginBottom: '32px',
                    margin: 0
                  }}>
                    Oops! This page doesn't exist.
                  </p>
                  <Link 
                    to="/" 
                    style={{
                      ...appStyles.button,
                      padding: '16px 32px',
                      fontSize: '18px',
                      fontWeight: '700'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.05)'
                      e.target.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <span>🏠</span>
                    <span>Go Home</span>
                  </Link>
                </div>
              </div>
            </div>
          } 
        />
      </Routes>
    </div>
  )
}

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App