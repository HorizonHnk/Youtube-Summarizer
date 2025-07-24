import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }))
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-2xl mx-auto">
              {/* Error Card */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-center">
                {/* Error Icon */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-2xl mb-6">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <h1 className="font-bold text-white mb-2 text-4xl">
                    Oops! Something went wrong
                  </h1>
                  <p className="text-red-200 text-lg">
                    We encountered an unexpected error while running the application
                  </p>
                </div>

                {/* Error Details */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-red-300 mb-3 flex items-center text-lg">
                    <span className="mr-2">🔍</span>
                    Error Details
                  </h3>
                  <div className="bg-black/30 rounded-lg p-4 mb-4">
                    <p className="text-red-200 font-mono break-all text-sm">
                      {this.state.error && this.state.error.toString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <button
                    onClick={this.handleRetry}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 text-lg rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      🔄 Try Again {this.state.retryCount > 0 ? `(${this.state.retryCount})` : ''}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-white/10 border border-white/20 text-white px-8 py-4 text-lg rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    🔃 Reload Page
                  </button>
                </div>

                {/* Help Section */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center justify-center text-lg">
                    <span className="mr-2">💡</span>
                    What can you do?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex items-start">
                      <span className="mr-3 text-lg">1️⃣</span>
                      <div>
                        <p className="font-medium text-white mb-1 text-base">Try Again</p>
                        <p className="text-sm">Click "Try Again" to retry the last action</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-3 text-lg">2️⃣</span>
                      <div>
                        <p className="font-medium text-white mb-1 text-base">Reload Page</p>
                        <p className="text-sm">Refresh the page to start fresh</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-3 text-lg">3️⃣</span>
                      <div>
                        <p className="font-medium text-white mb-1 text-base">Check Connection</p>
                        <p className="text-sm">Ensure your internet connection is stable</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-3 text-lg">4️⃣</span>
                      <div>
                        <p className="font-medium text-white mb-1 text-base">Contact Support</p>
                        <p className="text-sm">If the problem persists, reach out for help</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-gray-400 mb-4 text-base">
                    Still having issues? Get in touch with the developer:
                  </p>
                  <div className="flex justify-center">
                    <a
                      href={`mailto:hhnk3693@gmail.com?subject=YouTube%20Summarizer%20Error&body=I%20encountered%20an%20error%20in%20the%20YouTube%20Summarizer%20app.%0A%0AError:%20${encodeURIComponent(this.state.error?.toString() || 'Unknown error')}`}
                      className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <span>📧</span>
                      <span>Report Issue</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>YouTube Summarizer v1.0 • Built with React & Node.js</p>
                <p className="mt-1">Error ID: {Date.now().toString(36)} • Retry Count: {this.state.retryCount}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary