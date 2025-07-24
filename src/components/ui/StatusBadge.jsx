import React from 'react'

const StatusBadge = ({ 
  status, 
  icon, 
  text, 
  variant = 'default',
  size = 'md',
  className = '' 
}) => {
  const variants = {
    success: 'bg-green-500/20 border-green-500/30 text-green-200',
    warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-200',
    error: 'bg-red-500/20 border-red-500/30 text-red-200',
    info: 'bg-blue-500/20 border-blue-500/30 text-blue-200',
    default: 'bg-gray-500/20 border-gray-500/30 text-gray-200'
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  // Auto-detect variant from status
  let autoVariant = variant
  if (status && variant === 'default') {
    if (['connected', 'success', 'online', 'active'].includes(status.toLowerCase())) {
      autoVariant = 'success'
    } else if (['warning', 'limited', 'partial'].includes(status.toLowerCase())) {
      autoVariant = 'warning'
    } else if (['error', 'failed', 'offline', 'disconnected'].includes(status.toLowerCase())) {
      autoVariant = 'error'
    } else if (['info', 'loading', 'processing'].includes(status.toLowerCase())) {
      autoVariant = 'info'
    }
  }

  return (
    <div className={`
      inline-flex items-center space-x-1 border rounded-lg font-medium
      ${variants[autoVariant]} 
      ${sizes[size]}
      ${className}
    `}>
      {icon && <span>{icon}</span>}
      <span>{text || status}</span>
    </div>
  )
}

// Pre-built status badges for common use cases
export const APIStatusBadge = ({ isConnected, service = "API" }) => (
  <StatusBadge
    status={isConnected ? 'connected' : 'disconnected'}
    icon={isConnected ? '🟢' : '🔴'}
    text={`${service} ${isConnected ? 'Connected' : 'Disconnected'}`}
    size="sm"
  />
)

export const GeminiStatusBadge = ({ isAvailable }) => (
  <StatusBadge
    status={isAvailable ? 'connected' : 'limited'}
    icon={isAvailable ? '🧠' : '🔶'}
    text={isAvailable ? 'Gemini AI' : 'Mock Mode'}
    size="sm"
  />
)

export const FirebaseStatusBadge = ({ isConfigured }) => (
  <StatusBadge
    status={isConfigured ? 'connected' : 'error'}
    icon={isConfigured ? '🔥' : '❌'}
    text={isConfigured ? 'Firebase Connected' : 'Firebase Error'}
    size="sm"
  />
)

export default StatusBadge