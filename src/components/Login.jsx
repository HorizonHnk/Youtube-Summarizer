import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(formData.email, formData.password)
      navigate('/app')
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@youtube-summarizer.com',
      password: 'demo123'
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Back to Home */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          fontWeight: '600'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.25)'
          e.target.style.transform = 'translateY(-2px)'
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)'
          e.target.style.transform = 'translateY(0)'
        }}
      >
        ← Back to Home
      </Link>

      {/* Developer Credit - Top Right */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        textAlign: 'right'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '12px 20px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '4px'
          }}>
            Built by Ngoy Henock Mukonkole
          </div>
          <div style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '12px'
          }}>
            YouTube API + Gemini AI Expert
          </div>
        </div>
      </div>

      {/* Login Container */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '48px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '480px'
      }}>
        {/* Header with App Info */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            margin: '0 auto 20px',
            fontWeight: '900',
            color: 'white'
          }}>
            🎥
          </div>
          <h1 style={{
            color: 'white',
            fontSize: '2.2rem',
            fontWeight: '800',
            marginBottom: '8px',
            margin: 0
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            YouTube Summarizer v2.0
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            fontSize: '14px',
            marginTop: '4px'
          }}>
            Sign in to continue analyzing YouTube videos with AI
          </p>
        </div>

        {/* App Features Preview */}
        <div style={{
          background: 'rgba(78, 205, 196, 0.2)',
          border: '1px solid rgba(78, 205, 196, 0.4)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '20px' }}>🚀</span>
            <span style={{ color: '#4ecdc4', fontWeight: '700', fontSize: '16px' }}>
              What's Inside
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            color: '#bbf7d0',
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎬</span>
              <span>Real YouTube API</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📝</span>
              <span>Enhanced Captions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🧠</span>
              <span>Gemini AI Analysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💾</span>
              <span>Download Reports</span>
            </div>
          </div>
        </div>

        {/* Demo Account Info */}
        <div style={{
          background: 'rgba(76, 175, 80, 0.2)',
          border: '1px solid rgba(76, 175, 80, 0.4)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '20px' }}>🎯</span>
            <span style={{ color: '#a5d6a7', fontWeight: '700', fontSize: '16px' }}>
              Quick Demo Access
            </span>
          </div>
          <p style={{ color: '#c8e6c9', fontSize: '14px', margin: 0, marginBottom: '16px' }}>
            Try the app instantly with our demo account - no setup required!
          </p>
          <button
            onClick={handleDemoLogin}
            style={{
              background: 'rgba(76, 175, 80, 0.3)',
              border: '2px solid rgba(76, 175, 80, 0.5)',
              color: '#c8e6c9',
              padding: '12px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(76, 175, 80, 0.4)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(76, 175, 80, 0.3)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            🚀 Use Demo Account
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(244, 67, 54, 0.2)',
            border: '1px solid rgba(244, 67, 54, 0.4)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <span style={{ color: '#ffcdd2', fontSize: '14px', fontWeight: '500' }}>{error}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '10px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.target.style.transform = 'translateY(0)'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '10px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.target.style.transform = 'translateY(0)'
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: isLoading 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
              border: 'none',
              color: 'white',
              padding: '18px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-3px)'
                e.target.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.4)'
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid white',
                  borderTop: '3px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing In...
              </>
            ) : (
              <>
                <span>🚀</span>
                Sign In to Start Analyzing
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '16px' }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#4ecdc4',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#45b7d1'
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#4ecdc4'
              }}
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Prominent Developer Section */}
        <div style={{
          marginTop: '40px',
          paddingTop: '32px',
          borderTop: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2))',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '900',
              color: 'white',
              margin: '0 auto 16px'
            }}>
              NH
            </div>
            <h4 style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '800',
              margin: 0,
              marginBottom: '8px'
            }}>
              NGOY HENOCK MUKONKOLE
            </h4>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              margin: 0,
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Full-Stack Developer & AI Specialist
            </p>
            
            {/* Contact Links */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <a
                href="mailto:hhnk3693@gmail.com"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                📧 Email
              </a>
              
              <a
                href="https://github.com/HorizonHnk/Youtube-Summarizer.git"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                🐙 GitHub
              </a>
              
              <a
                href="https://www.youtube.com/playlist?list=PLrZbkNpNVSwwEIPRtoMxEy14_2DFuMM8k"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                📺 YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default Login