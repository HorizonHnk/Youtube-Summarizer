import React from 'react'
import useResponsive from '../../hooks/useResponsive'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  icon = null,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  responsive = true, // New prop to enable/disable responsive behavior
  ...props 
}) => {
  const { isMobile, isTablet, isDesktop, isLargeScreen } = useResponsive()

  // Adjust size based on screen size if responsive is enabled
  const getResponsiveSize = () => {
    if (!responsive) return size
    
    if (isMobile) {
      // Make buttons slightly smaller on mobile unless explicitly large
      if (size === 'xl') return 'lg'
      if (size === 'lg') return 'md'
      return size
    }
    
    if (isLargeScreen) {
      // Make buttons slightly larger on large screens unless explicitly small
      if (size === 'sm') return 'md'
      if (size === 'md') return 'lg'
      return size
    }
    
    return size
  }

  const actualSize = getResponsiveSize()

  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl 
    transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden group
    ${isMobile ? 'active:scale-95' : 'hover:scale-105 active:scale-95'}
  `

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-purple-500 to-blue-500 text-white
      hover:shadow-2xl hover:shadow-purple-500/30 
      focus:ring-purple-500
      ${isMobile ? 'hover:shadow-lg hover:shadow-purple-500/20' : ''}
    `,
    secondary: `
      bg-gradient-to-r from-green-500 to-emerald-500 text-white
      hover:shadow-2xl hover:shadow-green-500/30
      focus:ring-green-500
      ${isMobile ? 'hover:shadow-lg hover:shadow-green-500/20' : ''}
    `,
    outline: `
      bg-transparent border-2 border-white/20 text-white
      hover:bg-white/10 hover:border-white/30
      focus:ring-white/50
    `,
    ghost: `
      bg-white/5 text-white border border-white/10
      hover:bg-white/10 hover:border-white/20
      focus:ring-white/50
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-pink-500 text-white
      hover:shadow-2xl hover:shadow-red-500/30
      focus:ring-red-500
      ${isMobile ? 'hover:shadow-lg hover:shadow-red-500/20' : ''}
    `,
    success: `
      bg-gradient-to-r from-emerald-500 to-green-500 text-white
      hover:shadow-2xl hover:shadow-emerald-500/30
      focus:ring-emerald-500
      ${isMobile ? 'hover:shadow-lg hover:shadow-emerald-500/20' : ''}
    `
  }

  const sizeClasses = {
    xs: `px-2 py-1.5 text-xs ${isMobile ? 'px-2 py-1' : ''}`,
    sm: `px-3 py-2 text-sm ${isMobile ? 'px-2.5 py-1.5' : ''}`,
    md: `px-6 py-3 text-base ${isMobile ? 'px-4 py-2.5' : isLargeScreen ? 'px-7 py-3.5' : ''}`,
    lg: `px-8 py-4 text-lg ${isMobile ? 'px-6 py-3' : isLargeScreen ? 'px-10 py-5' : ''}`,
    xl: `px-10 py-5 text-xl ${isMobile ? 'px-8 py-4' : isLargeScreen ? 'px-12 py-6' : ''}`
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[actualSize]}
    ${widthClass}
    ${className}
  `

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e)
    }
  }

  const getLoadingSpinnerSize = () => {
    switch(actualSize) {
      case 'xs': return isMobile ? 'h-3 w-3' : 'h-3 w-3'
      case 'sm': return isMobile ? 'h-3 w-3' : 'h-4 w-4'
      case 'md': return isMobile ? 'h-4 w-4' : 'h-5 w-5'
      case 'lg': return isMobile ? 'h-5 w-5' : 'h-6 w-6'
      case 'xl': return isMobile ? 'h-6 w-6' : 'h-7 w-7'
      default: return 'h-5 w-5'
    }
  }

  const getIconSize = () => {
    switch(actualSize) {
      case 'xs': return isMobile ? 'text-xs' : 'text-sm'
      case 'sm': return isMobile ? 'text-sm' : 'text-base'
      case 'md': return isMobile ? 'text-base' : 'text-lg'
      case 'lg': return isMobile ? 'text-lg' : 'text-xl'
      case 'xl': return isMobile ? 'text-xl' : 'text-2xl'
      default: return 'text-lg'
    }
  }

  const getSpacing = () => {
    switch(actualSize) {
      case 'xs': return 'mr-1'
      case 'sm': return 'mr-1.5'
      case 'md': return 'mr-2'
      case 'lg': return 'mr-2.5'
      case 'xl': return 'mr-3'
      default: return 'mr-2'
    }
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {/* Hover effect overlay for gradient variants */}
      {(variant === 'primary' || variant === 'secondary' || variant === 'danger' || variant === 'success') && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {loading ? (
          <>
            <div className={`animate-spin rounded-full ${getLoadingSpinnerSize()} border-b-2 border-current ${getSpacing()}`}></div>
            <span>{isMobile ? 'Loading...' : 'Loading...'}</span>
          </>
        ) : (
          <>
            {icon && (
              <span className={`${getIconSize()} ${getSpacing()}`}>
                {icon}
              </span>
            )}
            {children}
          </>
        )}
      </span>
    </button>
  )
}

// Export additional variants for quick use
export const PrimaryButton = (props) => <Button variant="primary" {...props} />
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />
export const OutlineButton = (props) => <Button variant="outline" {...props} />
export const GhostButton = (props) => <Button variant="ghost" {...props} />
export const DangerButton = (props) => <Button variant="danger" {...props} />
export const SuccessButton = (props) => <Button variant="success" {...props} />

// Mobile-optimized button for touch interfaces
export const TouchButton = ({ children, ...props }) => {
  const { isMobile } = useResponsive()
  
  return (
    <Button 
      {...props}
      className={`${props.className || ''} ${isMobile ? 'min-h-[44px] min-w-[44px]' : ''}`}
      size={isMobile ? 'md' : props.size || 'md'}
    >
      {children}
    </Button>
  )
}

// Responsive icon button
export const IconButton = ({ icon, children, ...props }) => {
  const { isMobile } = useResponsive()
  
  return (
    <Button 
      {...props}
      icon={icon}
      className={`${props.className || ''} ${!children && isMobile ? 'aspect-square' : ''}`}
      size={isMobile && !children ? 'sm' : props.size || 'md'}
    >
      {children}
    </Button>
  )
}

// Floating Action Button for mobile
export const FAB = ({ icon, children, ...props }) => {
  const { isMobile } = useResponsive()
  
  if (!isMobile) {
    return <Button {...props} icon={icon}>{children}</Button>
  }
  
  return (
    <Button 
      {...props}
      icon={icon}
      className={`${props.className || ''} rounded-full shadow-2xl fixed bottom-6 right-6 z-50`}
      size="lg"
    >
      {children}
    </Button>
  )
}

export default Button