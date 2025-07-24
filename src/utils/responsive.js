/**
 * Responsive Design Utilities
 * Provides utility functions for responsive design implementation
 */

// Breakpoint definitions matching CSS and hook
export const BREAKPOINTS = {
  xxs: 0,      // Ultra small (< 320px)
  xs: 320,     // Very small phones (320px - 479px)
  sm: 480,     // Small phones / large phones portrait (480px - 767px)
  md: 768,     // Tablets / small laptops (768px - 1023px)
  lg: 1024,    // Laptops / desktops (1024px - 1439px)
  xl: 1440,    // Large desktops (1440px - 1919px)
  xxl: 1920,   // Very large screens / TVs (1920px - 2559px)
  xxxl: 2560   // Ultra-wide / 4K screens (2560px+)
}

// Screen size categories
export const SCREEN_CATEGORIES = {
  MOBILE: ['xxs', 'xs', 'sm'],
  TABLET: ['md'],
  DESKTOP: ['lg', 'xl'],
  LARGE_SCREEN: ['xxl', 'xxxl']
}

/**
 * Get current screen size based on window width
 */
export const getCurrentScreenSize = (width = window.innerWidth) => {
  if (width < BREAKPOINTS.xs) return 'xxs'
  if (width < BREAKPOINTS.sm) return 'xs'
  if (width < BREAKPOINTS.md) return 'sm'
  if (width < BREAKPOINTS.lg) return 'md'
  if (width < BREAKPOINTS.xl) return 'lg'
  if (width < BREAKPOINTS.xxl) return 'xl'
  if (width < BREAKPOINTS.xxxl) return 'xxl'
  return 'xxxl'
}

/**
 * Check if current screen size matches category
 */
export const isScreenCategory = (category, screenSize) => {
  const sizes = SCREEN_CATEGORIES[category.toUpperCase()]
  return sizes ? sizes.includes(screenSize) : false
}

/**
 * Get responsive value based on screen size
 */
export const getResponsiveValue = (values, screenSize) => {
  // If values is not an object, return as-is
  if (typeof values !== 'object' || values === null) {
    return values
  }

  // Check for exact screen size match
  if (values[screenSize] !== undefined) {
    return values[screenSize]
  }

  // Fallback hierarchy
  const fallbackOrder = {
    'xxxl': ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'],
    'xxl': ['xl', 'lg', 'md', 'sm', 'xs', 'xxs'],
    'xl': ['lg', 'md', 'sm', 'xs', 'xxs'],
    'lg': ['md', 'sm', 'xs', 'xxs'],
    'md': ['sm', 'xs', 'xxs'],
    'sm': ['xs', 'xxs'],
    'xs': ['xxs'],
    'xxs': []
  }

  const fallbacks = fallbackOrder[screenSize] || []
  
  for (const fallback of fallbacks) {
    if (values[fallback] !== undefined) {
      return values[fallback]
    }
  }

  // Return default value or first available value
  return values.default || values[Object.keys(values)[0]]
}

/**
 * Generate responsive CSS classes
 */
export const generateResponsiveClasses = (baseClass, variants = {}) => {
  const classes = [baseClass]
  
  Object.keys(variants).forEach(screenSize => {
    if (BREAKPOINTS[screenSize] !== undefined && variants[screenSize]) {
      classes.push(`${screenSize}:${variants[screenSize]}`)
    }
  })
  
  return classes.join(' ')
}

/**
 * Media query helpers
 */
export const mediaQueries = {
  up: (size) => `@media (min-width: ${BREAKPOINTS[size]}px)`,
  down: (size) => `@media (max-width: ${BREAKPOINTS[size] - 1}px)`,
  between: (min, max) => `@media (min-width: ${BREAKPOINTS[min]}px) and (max-width: ${BREAKPOINTS[max] - 1}px)`,
  only: (size) => {
    const sizes = Object.keys(BREAKPOINTS)
    const index = sizes.indexOf(size)
    if (index === -1) return ''
    
    const min = BREAKPOINTS[size]
    const nextSize = sizes[index + 1]
    
    if (nextSize) {
      const max = BREAKPOINTS[nextSize] - 1
      return `@media (min-width: ${min}px) and (max-width: ${max}px)`
    } else {
      return `@media (min-width: ${min}px)`
    }
  }
}

/**
 * Responsive container configurations
 */
export const CONTAINER_CONFIGS = {
  xxs: { maxWidth: '100%', padding: '8px' },
  xs: { maxWidth: '100%', padding: '12px' },
  sm: { maxWidth: '100%', padding: '16px' },
  md: { maxWidth: '768px', padding: '24px' },
  lg: { maxWidth: '1024px', padding: '32px' },
  xl: { maxWidth: '1280px', padding: '32px' },
  xxl: { maxWidth: '1600px', padding: '48px' },
  xxxl: { maxWidth: '1920px', padding: '48px' }
}

/**
 * Typography configurations
 */
export const TYPOGRAPHY_CONFIGS = {
  xxs: { scale: 0.75, lineHeight: 1.4 },
  xs: { scale: 0.85, lineHeight: 1.5 },
  sm: { scale: 0.9, lineHeight: 1.5 },
  md: { scale: 1.0, lineHeight: 1.6 },
  lg: { scale: 1.0, lineHeight: 1.6 },
  xl: { scale: 1.1, lineHeight: 1.6 },
  xxl: { scale: 1.2, lineHeight: 1.6 },
  xxxl: { scale: 1.3, lineHeight: 1.6 }
}

/**
 * Component spacing configurations
 */
export const SPACING_CONFIGS = {
  xxs: { xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px', xxl: '24px' },
  xs: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '20px', xxl: '32px' },
  sm: { xs: '6px', sm: '12px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  md: { xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '48px', xxl: '64px' },
  lg: { xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '48px', xxl: '64px' },
  xl: { xs: '12px', sm: '20px', md: '32px', lg: '40px', xl: '56px', xxl: '80px' },
  xxl: { xs: '16px', sm: '24px', md: '40px', lg: '48px', xl: '64px', xxl: '96px' },
  xxxl: { xs: '20px', sm: '32px', md: '48px', lg: '64px', xl: '80px', xxl: '128px' }
}

/**
 * Get responsive spacing
 */
export const getResponsiveSpacing = (size, screenSize) => {
  const config = SPACING_CONFIGS[screenSize] || SPACING_CONFIGS.md
  return config[size] || config.md
}

/**
 * Grid configurations
 */
export const GRID_CONFIGS = {
  xxs: { maxCols: 1, gap: '8px' },
  xs: { maxCols: 1, gap: '12px' },
  sm: { maxCols: 2, gap: '16px' },
  md: { maxCols: 2, gap: '20px' },
  lg: { maxCols: 3, gap: '24px' },
  xl: { maxCols: 4, gap: '32px' },
  xxl: { maxCols: 5, gap: '40px' },
  xxxl: { maxCols: 6, gap: '48px' }
}

/**
 * Get optimal grid columns for screen size
 */
export const getOptimalColumns = (maxCols, screenSize) => {
  const config = GRID_CONFIGS[screenSize] || GRID_CONFIGS.md
  return Math.min(maxCols, config.maxCols)
}

/**
 * Touch-friendly sizing for mobile devices
 */
export const TOUCH_TARGETS = {
  minimum: '44px',  // iOS HIG minimum
  comfortable: '48px',  // Material Design recommendation
  large: '56px'     // For primary actions
}

/**
 * Check if device supports hover
 */
export const supportsHover = () => {
  return window.matchMedia('(hover: hover)').matches
}

/**
 * Check if device supports touch
 */
export const supportsTouch = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Get device pixel ratio for high DPI displays
 */
export const getDevicePixelRatio = () => {
  return window.devicePixelRatio || 1
}

/**
 * Check if device is in landscape orientation
 */
export const isLandscape = () => {
  return window.innerWidth > window.innerHeight
}

/**
 * Check if device is in portrait orientation
 */
export const isPortrait = () => {
  return window.innerHeight > window.innerWidth
}

/**
 * Get safe area insets for devices with notches
 */
export const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement)
  return {
    top: style.getPropertyValue('--safe-area-inset-top') || '0px',
    bottom: style.getPropertyValue('--safe-area-inset-bottom') || '0px',
    left: style.getPropertyValue('--safe-area-inset-left') || '0px',
    right: style.getPropertyValue('--safe-area-inset-right') || '0px'
  }
}

/**
 * Debounce function for resize events
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for scroll events
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Generate responsive image srcset
 */
export const generateResponsiveSrcSet = (baseUrl, widths = [320, 480, 768, 1024, 1440, 1920]) => {
  return widths.map(width => `${baseUrl}?w=${width} ${width}w`).join(', ')
}

/**
 * Get appropriate image size for current screen
 */
export const getResponsiveImageSize = (screenSize) => {
  const sizeMap = {
    xxs: '320px',
    xs: '480px',
    sm: '768px',
    md: '1024px',
    lg: '1440px',
    xl: '1920px',
    xxl: '2560px',
    xxxl: '3840px'
  }
  return sizeMap[screenSize] || '1024px'
}

/**
 * Performance optimization for mobile devices
 */
export const optimizeForMobile = () => {
  if (isScreenCategory('MOBILE', getCurrentScreenSize())) {
    // Reduce animations for better performance
    document.documentElement.classList.add('reduced-motion')
    
    // Optimize touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch'
    
    // Prevent zoom on input focus
    const viewport = document.querySelector('meta[name=viewport]')
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    }
  }
}

/**
 * Accessibility helpers for responsive design
 */
export const a11yHelpers = {
  // Focus management for mobile navigation
  trapFocus: (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    })
  },

  // Announce screen size changes to screen readers
  announceScreenSizeChange: (screenSize) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    announcement.textContent = `Screen size changed to ${screenSize}`
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }
}

// Export default object with all utilities
export default {
  BREAKPOINTS,
  SCREEN_CATEGORIES,
  getCurrentScreenSize,
  isScreenCategory,
  getResponsiveValue,
  generateResponsiveClasses,
  mediaQueries,
  CONTAINER_CONFIGS,
  TYPOGRAPHY_CONFIGS,
  SPACING_CONFIGS,
  getResponsiveSpacing,
  GRID_CONFIGS,
  getOptimalColumns,
  TOUCH_TARGETS,
  supportsHover,
  supportsTouch,
  getDevicePixelRatio,
  isLandscape,
  isPortrait,
  getSafeAreaInsets,
  debounce,
  throttle,
  generateResponsiveSrcSet,
  getResponsiveImageSize,
  optimizeForMobile,
  a11yHelpers
}