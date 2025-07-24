import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      // Add React Fast Refresh for better development experience
      fastRefresh: true
    })
  ],
  
  // Development server configuration
  server: {
    port: 3000,
    host: true, // Allow external connections
    open: true, // Automatically open browser
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        timeout: 30000, // 30 seconds timeout for AI operations
        configure: (proxy, options) => {
          // Add custom headers if needed
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('X-Forwarded-Proto', 'http')
          })
        }
      }
    }
  },

  // Preview server configuration (for production build preview)
  preview: {
    port: 4173,
    host: true,
    open: true
  },

  // Build configuration
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false, // Set to true for debugging in production
    minify: 'terser',
    
    // Chunk optimization for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          ui: ['axios']
        }
      }
    },
    
    // Terser options for minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true
      }
    }
  },

  // Environment variables configuration
  define: {
    // Make some environment variables available globally
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },

  // CSS configuration
  css: {
    devSourcemap: true, // Enable CSS source maps in development
    preprocessorOptions: {
      css: {
        charset: false // Fix for some CSS import issues
      }
    }
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'axios'
    ],
    exclude: [
      // Exclude any problematic dependencies
    ]
  },

  // Base path configuration (useful for deployment)
  base: process.env.NODE_ENV === 'production' ? './' : '/',

  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],

  // ESBuild configuration for faster builds
  esbuild: {
    target: 'es2020',
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },

  // Worker configuration for web workers if needed
  worker: {
    format: 'es'
  }
})