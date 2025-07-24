import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
    
    if (error) setError('')
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return '#f44336'
    if (passwordStrength <= 2) return '#ff9800'
    if (passwordStrength <= 3) return '#ffc107'
    if (passwordStrength <= 4) return '#8bc34a'
    return '#4caf50'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak'
    if (passwordStrength <= 2) return 'Fair'
    if (passwordStrength <= 3) return 'Good'
    if (passwordStrength <= 4) return 'Strong'
    return 'Very Strong'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    try {
      await signup(formData.email, formData.password)
      navigate('/app')
    } catch (error) {
      setError(error.message || 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
            Real YouTube API + Gemini AI
          </div>
        </div>
      </div>

      {/* Signup Container */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '48px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
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
            🚀
          </div>
          <h1 style={{
            color: 'white',
            fontSize: '2.2rem',
            fontWeight: '800',
            marginBottom: '8px',
            margin: 0
          }}>
            Join YouTube Summarizer
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            v2.0 with Real YouTube API
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            fontSize: '14px',
            marginTop: '4px'
          }}>
            Create your account to unlock advanced AI video analysis
          </p>
        </div>

        {/* Exclusive Features Preview */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2))',
          border: '2px solid rgba(78, 205, 196, 0.4)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>✨</span>
            <span style={{ color: '#4ecdc4', fontWeight: '800', fontSize: '18px' }}>
              Exclusive Features You'll Get:
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            color: '#bbf7d0',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>🎬</span>
              <span>Real YouTube Data API v3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>📝</span>
              <span>Official YouTube Captions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>🧠</span>
              <span>Google Gemini AI Analysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>💾</span>
              <span>Professional Download Reports</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>💬</span>
              <span>Interactive Video Chat</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>🔄</span>
              <span>Smart Retry Logic</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(244, 67, 54, 0.2)',
            border: '2px solid rgba(244, 67, 54, 0.4)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <span style={{ color: '#ffcdd2', fontSize: '14px', fontWeight: '600' }}>{error}</span>
            </div>
          </div>
        )}

        {/* Signup Form */}
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
              placeholder="Create a strong password"
            />
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div style={{ marginTop: '12px' }}>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(passwordStrength / 5) * 100}%`,
                    height: '100%',
                    background: getPasswordStrengthColor(),
                    transition: 'all 0.3s ease'
                  }}></div>
                </div>
                <span style={{
                  color: getPasswordStrengthColor(),
                  fontSize: '13px',
                  fontWeight: '600',
                  marginTop: '6px',
                  display: 'block'
                }}>
                  Password strength: {getPasswordStrengthText()}
                </span>
              </div>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '10px'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              placeholder="Confirm your password"
            />
            
            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div style={{ marginTop: '12px' }}>
                <span style={{
                  color: formData.password === formData.confirmPassword ? '#4caf50' : '#f44336',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </span>
              </div>
            )}
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
                Creating Account...
              </>
            ) : (
              <>
                <span>🚀</span>
                Create Account & Start Analyzing
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '16px' }}>
            Already have an account?{' '}
            <Link
              to="/login"
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
              Sign in here
            </Link>
          </p>
        </div>

        {/* Prominent Developer Section */}
        <div style={{
          marginTop: '32px',
          paddingTop: '32px',
          borderTop: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2))',
            borderRadius: '24px',
            padding: '28px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: '900',
              color: 'white',
              margin: '0 auto 20px',
              border: '3px solid rgba(255, 255, 255, 0.3)'
            }}>
              NH
            </div>
            <h4 style={{
              color: 'white',
              fontSize: '1.4rem',
              fontWeight: '800',
              margin: 0,
              marginBottom: '8px'
            }}>
              NGOY HENOCK MUKONKOLE
            </h4>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '15px',
              margin: 0,
              marginBottom: '6px',
              fontWeight: '700'
            }}>
              🚀 Full-Stack Developer & AI Specialist
            </p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '13px',
              margin: 0,
              marginBottom: '20px',
              fontWeight: '500'
            }}>
              Expert in YouTube API Integration & Gemini AI
            </p>
            
            {/* Contact Links */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '16px'
            }}>
              <a
                href="mailto:hhnk3693@gmail.com"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.25)',
                  padding: '10px 16px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '700',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.35)'
                  e.target.style.transform = 'translateY(-3px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                📧 Email Me
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
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.25)',
                  padding: '10px 16px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '700',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.35)'
                  e.target.style.transform = 'translateY(-3px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)'
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
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.25)',
                  padding: '10px 16px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '700',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.35)'
                  e.target.style.transform = 'translateY(-3px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                📺 YouTube
              </a>
            </div>

            {/* Additional Message */}
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '12px',
              margin: 0,
              fontStyle: 'italic'
            }}>
              Questions about the app? Feel free to reach out!
            </p>
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

export default Signup