import { useState, useEffect, useCallback } from 'react'

// Breakpoint definitions
const breakpoints = {
  xs: 320,   // Very small phones
  sm: 480,   // Small phones / large phones portrait
  md: 768,   // Tablets / small laptops
  lg: 1024,  // Laptops / desktops
  xl: 1440,  // Large desktops
  xxl: 1920, // Very large screens / TVs
  xxxl: 2560 // Ultra-wide / 4K screens
}

// Helper function to determine screen size (moved outside component)
function getScreenSize(width) {
  if (width < breakpoints.xs) return 'xxs' // Ultra small (< 320px)
  if (width < breakpoints.sm) return 'xs'  // Very small (320px - 479px)
  if (width < breakpoints.md) return 'sm'  // Small (480px - 767px)
  if (width < breakpoints.lg) return 'md'  // Medium (768px - 1023px)
  if (width < breakpoints.xl) return 'lg'  // Large (1024px - 1439px)
  if (width < breakpoints.xxl) return 'xl' // Extra Large (1440px - 1919px)
  if (width < breakpoints.xxxl) return 'xxl' // Ultra Large (1920px - 2559px)
  return 'xxxl' // Ultra Wide (2560px+)
}

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window === 'undefined') return 'lg'
    return getScreenSize(window.innerWidth)
  })
  
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  }))

  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return
    
    const width = window.innerWidth
    const height = window.innerHeight
    
    setWindowSize({ width, height })
    setScreenSize(getScreenSize(width))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Set initial values
    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [handleResize])

  // Helper functions for responsive checks
  const isXXS = screenSize === 'xxs'
  const isXS = screenSize === 'xs'
  const isSM = screenSize === 'sm'
  const isMD = screenSize === 'md'
  const isLG = screenSize === 'lg'
  const isXL = screenSize === 'xl'
  const isXXL = screenSize === 'xxl'
  const isXXXL = screenSize === 'xxxl'

  // Grouped helpers
  const isMobile = isXXS || isXS || isSM
  const isTablet = isMD
  const isDesktop = isLG || isXL
  const isLargeScreen = isXXL || isXXXL
  const isSmallScreen = isXXS || isXS
  const isMediumScreen = isSM || isMD
  const isBigScreen = isLG || isXL || isXXL || isXXXL

  // Content sizing helpers
  const getContainerMaxWidth = useCallback(() => {
    switch(screenSize) {
      case 'xxs': return '100%'
      case 'xs': return '100%'
      case 'sm': return '100%'
      case 'md': return '768px'
      case 'lg': return '1024px'
      case 'xl': return '1280px'
      case 'xxl': return '1600px'
      case 'xxxl': return '1920px'
      default: return '1280px'
    }
  }, [screenSize])

  const getGridColumns = useCallback((maxCols = 4) => {
    switch(screenSize) {
      case 'xxs': return 1
      case 'xs': return 1
      case 'sm': return Math.min(2, maxCols)
      case 'md': return Math.min(2, maxCols)
      case 'lg': return Math.min(3, maxCols)
      case 'xl': return Math.min(4, maxCols)
      case 'xxl': return Math.min(5, maxCols)
      case 'xxxl': return Math.min(6, maxCols)
      default: return Math.min(3, maxCols)
    }
  }, [screenSize])

  const getFontScale = useCallback(() => {
    switch(screenSize) {
      case 'xxs': return 0.75
      case 'xs': return 0.85
      case 'sm': return 0.9
      case 'md': return 1.0
      case 'lg': return 1.0
      case 'xl': return 1.1
      case 'xxl': return 1.2
      case 'xxxl': return 1.3
      default: return 1.0
    }
  }, [screenSize])

  const getPadding = useCallback(() => {
    switch(screenSize) {
      case 'xxs': return '0.5rem'
      case 'xs': return '0.75rem'
      case 'sm': return '1rem'
      case 'md': return '1.5rem'
      case 'lg': return '2rem'
      case 'xl': return '2.5rem'
      case 'xxl': return '3rem'
      case 'xxxl': return '4rem'
      default: return '1.5rem'
    }
  }, [screenSize])

  const getNavHeight = useCallback(() => {
    switch(screenSize) {
      case 'xxs': return '56px'
      case 'xs': return '64px'
      case 'sm': return '72px'
      case 'md': return '80px'
      case 'lg': return '88px'
      case 'xl': return '96px'
      case 'xxl': return '104px'
      case 'xxxl': return '112px'
      default: return '80px'
    }
  }, [screenSize])

  return {
    screenSize,
    windowSize,
    breakpoints,
    
    // Size checks
    isXXS, isXS, isSM, isMD, isLG, isXL, isXXL, isXXXL,
    
    // Grouped checks
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    isSmallScreen,
    isMediumScreen,
    isBigScreen,
    
    // Utility functions
    getContainerMaxWidth,
    getGridColumns,
    getFontScale,
    getPadding,
    getNavHeight
  }
}

export default useResponsive

// Higher-order component for responsive behavior
export const withResponsive = (Component) => {
  return function ResponsiveComponent(props) {
    const responsive = useResponsive()
    return Component({ ...props, responsive })
  }
}

// Hook for responsive classes
export const useResponsiveClasses = () => {
  const { screenSize } = useResponsive()
  
  const getResponsiveClass = useCallback((baseClass, variations = {}) => {
    const classes = [baseClass]
    
    // Add screen size specific class if provided
    if (variations[screenSize]) {
      classes.push(variations[screenSize])
    }
    
    return classes.join(' ')
  }, [screenSize])

  return { getResponsiveClass, screenSize }
}