/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // Custom screen breakpoints matching our responsive system
    screens: {
      'xxs': '0px',      // Ultra small (< 320px)
      'xs': '320px',     // Very small phones (320px - 479px)
      'sm': '480px',     // Small phones / large phones portrait (480px - 767px)
      'md': '768px',     // Tablets / small laptops (768px - 1023px)
      'lg': '1024px',    // Laptops / desktops (1024px - 1439px)
      'xl': '1440px',    // Large desktops (1440px - 1919px)
      'xxl': '1920px',   // Very large screens / TVs (1920px - 2559px)
      'xxxl': '2560px',  // Ultra-wide / 4K screens (2560px+)
      
      // Additional utility breakpoints
      'mobile': {'max': '767px'},
      'tablet': {'min': '768px', 'max': '1023px'},
      'desktop': {'min': '1024px'},
      'touch': {'raw': '(hover: none)'},
      'no-touch': {'raw': '(hover: hover)'},
      'landscape': {'raw': '(orientation: landscape)'},
      'portrait': {'raw': '(orientation: portrait)'},
      'high-dpi': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
      'reduced-motion': {'raw': '(prefers-reduced-motion: reduce)'},
      'dark-mode': {'raw': '(prefers-color-scheme: dark)'}
    },
    
    extend: {
      // Custom spacing scale for responsive design
      spacing: {
        '0.5': '0.125rem',   // 2px
        '1.5': '0.375rem',   // 6px
        '2.5': '0.625rem',   // 10px
        '3.5': '0.875rem',   // 14px
        '4.5': '1.125rem',   // 18px
        '5.5': '1.375rem',   // 22px
        '6.5': '1.625rem',   // 26px
        '7.5': '1.875rem',   // 30px
        '8.5': '2.125rem',   // 34px
        '9.5': '2.375rem',   // 38px
        '15': '3.75rem',     // 60px
        '18': '4.5rem',      // 72px
        '22': '5.5rem',      // 88px
        '26': '6.5rem',      // 104px
        '30': '7.5rem',      // 120px
        '34': '8.5rem',      // 136px
        '38': '9.5rem',      // 152px
        '42': '10.5rem',     // 168px
        '46': '11.5rem',     // 184px
        '50': '12.5rem',     // 200px
        '54': '13.5rem',     // 216px
        '58': '14.5rem',     // 232px
        '62': '15.5rem',     // 248px
        '66': '16.5rem',     // 264px
        '70': '17.5rem',     // 280px
        '74': '18.5rem',     // 296px
        '78': '19.5rem',     // 312px
        '82': '20.5rem',     // 328px
        '86': '21.5rem',     // 344px
        '90': '22.5rem',     // 360px
        '94': '23.5rem',     // 376px
        '98': '24.5rem',     // 392px
        '102': '25.5rem',    // 408px
      },

      // Typography scale for different screen sizes
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],         // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],     // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],        // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],         // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],    // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],      // 36px
        '5xl': ['3rem', { lineHeight: '1' }],              // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],           // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],            // 72px
        '8xl': ['6rem', { lineHeight: '1' }],              // 96px
        '9xl': ['8rem', { lineHeight: '1' }],              // 128px
        
        // Responsive text sizes
        'responsive-xs': ['clamp(0.7rem, 0.8vw, 0.75rem)', { lineHeight: '1.2' }],
        'responsive-sm': ['clamp(0.8rem, 1vw, 0.875rem)', { lineHeight: '1.3' }],
        'responsive-base': ['clamp(0.9rem, 1.2vw, 1rem)', { lineHeight: '1.5' }],
        'responsive-lg': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6' }],
        'responsive-xl': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.6' }],
        'responsive-2xl': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.4' }],
        'responsive-3xl': ['clamp(1.5rem, 3vw, 1.875rem)', { lineHeight: '1.3' }],
        'responsive-4xl': ['clamp(1.875rem, 4vw, 2.25rem)', { lineHeight: '1.2' }],
        'responsive-5xl': ['clamp(2.25rem, 5vw, 3rem)', { lineHeight: '1.1' }],
        'responsive-6xl': ['clamp(3rem, 6vw, 3.75rem)', { lineHeight: '1' }],
      },

      // Container configurations
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          'xs': '0.75rem',
          'sm': '1rem',
          'md': '1.5rem',
          'lg': '2rem',
          'xl': '2rem',
          'xxl': '3rem',
          'xxxl': '3rem',
        },
        screens: {
          'xs': '100%',
          'sm': '100%', 
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          'xxl': '1600px',
          'xxxl': '1920px',
        }
      },

      // Custom colors for the app
      colors: {
        'app-primary': {
          50: '#f3f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bea6ff',
          400: '#9f75ff',
          500: '#843dff',
          600: '#7916ff',
          700: '#6b04fd',
          800: '#5a03d4',
          900: '#4c05b2',
          950: '#2d0275'
        },
        'app-secondary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        'app-accent': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22'
        }
      },

      // Animation and transitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'slide-in-up': 'slideInUp 0.4s ease-out',
        'slide-in-down': 'slideInDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'rubber-band': 'rubberBand 1s ease-in-out',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'jello': 'jello 1s ease-in-out'
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { opacity: '1' },
          '75%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' }
        },
        rubberBand: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, .95, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' }
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        },
        jello: {
          '11.1%': { transform: 'none' },
          '22.2%': { transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
          '33.3%': { transform: 'skewX(6.25deg) skewY(6.25deg)' },
          '44.4%': { transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
          '55.5%': { transform: 'skewX(1.5625deg) skewY(1.5625deg)' },
          '66.6%': { transform: 'skewX(-0.78125deg) skewY(-0.78125deg)' },
          '77.7%': { transform: 'skewX(0.390625deg) skewY(0.390625deg)' },
          '88.8%': { transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)' },
          '100%': { transform: 'none' }
        }
      },

      // Box shadows
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 25px 45px 0 rgba(31, 38, 135, 0.25)',
        'glass-xl': '0 35px 60px 0 rgba(31, 38, 135, 0.3)',
        'neon': '0 0 5px theme(colors.app-primary.400), 0 0 20px theme(colors.app-primary.600), 0 0 35px theme(colors.app-primary.800)',
        'neon-lg': '0 0 10px theme(colors.app-primary.400), 0 0 40px theme(colors.app-primary.600), 0 0 80px theme(colors.app-primary.800)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
      },

      // Backdrop blur utilities
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
        '4xl': '128px'
      },

      // Border radius
      borderRadius: {
        'none': '0px',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        'full': '9999px'
      },

      // Aspect ratios
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'photo': '4 / 3',
        'golden': '1.618 / 1',
        'ultra-wide': '21 / 9',
        'cinema': '2.39 / 1'
      },

      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      },

      // Custom gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-app': 'linear-gradient(135deg, #0f172a, #581c87, #0f172a)',
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
        'gradient-secondary': 'linear-gradient(135deg, #10b981, #06b6d4)',
        'gradient-danger': 'linear-gradient(135deg, #ef4444, #dc2626)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
      },

      // Grid configurations
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-sm': 'repeat(auto-fit, minmax(200px, 1fr))',
        'auto-fit-lg': 'repeat(auto-fit, minmax(300px, 1fr))',
        'responsive': 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))'
      },

      // Safe area insets for devices with notches
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    
    // Custom plugin for responsive utilities
    function({ addUtilities, addComponents, theme }) {
      // Glass morphism utilities
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-strong': {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      })

      // Touch-friendly utilities
      addUtilities({
        '.touch-target': {
          minHeight: '44px',
          minWidth: '44px'
        },
        '.touch-target-lg': {
          minHeight: '48px',
          minWidth: '48px'
        },
        '.touch-friendly': {
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }
      })

      // Scroll optimization
      addUtilities({
        '.scroll-smooth': {
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        },
        '.scroll-momentum': {
          WebkitOverflowScrolling: 'touch'
        }
      })

      // Safe area utilities
      addUtilities({
        '.safe-top': {
          paddingTop: 'env(safe-area-inset-top)'
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)'
        },
        '.safe-left': {
          paddingLeft: 'env(safe-area-inset-left)'
        },
        '.safe-right': {
          paddingRight: 'env(safe-area-inset-right)'
        },
        '.safe-x': {
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)'
        },
        '.safe-y': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        },
        '.safe-all': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)'
        }
      })

      // Performance optimizations
      addUtilities({
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)'
        },
        '.will-change-transform': {
          willChange: 'transform'
        },
        '.will-change-auto': {
          willChange: 'auto'
        }
      })
    }
  ]
}