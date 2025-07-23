# 🎥 YouTube Summarizer

> **Transform YouTube videos into AI-powered insights with real-time analysis and interactive conversations**

A modern, full-stack web application that leverages Google's Gemini AI and YouTube Data API v3 to provide comprehensive video analysis, smart summaries, and interactive Q&A features.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://youtube-summarization.netlify.app/)
[![GitHub](https://img.shields.io/badge/📂_GitHub-Repository-black?style=for-the-badge)](https://github.com/HorizonHnk/Youtube-Summarizer.git)
[![YouTube](https://img.shields.io/badge/📺_YouTube-Tutorials-red?style=for-the-badge)](https://www.youtube.com/playlist?list=PLrZbkNpNVSwwEIPRtoMxEy14_2DFuMM8k)

## 📸 Screenshots

### Welcome Page
![Welcome Page](https://github.com/HorizonHnk/Youtube-Summarizer/blob/main/screenshots/welcome-page.png)

### Analysis Interface
![Analysis Interface](https://github.com/HorizonHnk/Youtube-Summarizer/blob/main/screenshots/analysis-interface.png)

### Interactive Chat
![Interactive Chat](https://github.com/HorizonHnk/Youtube-Summarizer/blob/main/screenshots/chat-interface.png)

## ✨ Features

### 🚀 **Core Functionality**
- **Real YouTube API Integration** - Fetch authentic video metadata, views, likes, and publication dates
- **Enhanced Captions Support** - Access official YouTube captions with timestamp precision
- **AI-Powered Analysis** - Google Gemini AI generates comprehensive video insights
- **Interactive Q&A** - Chat with AI about video content with context awareness
- **Smart Download** - Export complete analysis as formatted text files

### 🎨 **User Experience**
- **Modern Glass Morphism UI** - Beautiful, responsive design with smooth animations
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop, ultra-wide)
- **Dark Theme** - Eye-friendly interface with gradient backgrounds
- **Progressive Web App** - Fast loading with optimized performance

### 🛡️ **Security & Reliability**
- **Firebase Authentication** - Secure user management with email/password
- **Smart Retry Logic** - Automatic handling of API rate limits and failures
- **Error Boundary** - Graceful error handling with user-friendly messages
- **Clean Formatting** - Asterisk-free, properly structured output

### 📊 **Analysis Features**
- **Video Overview** - Comprehensive summary of video content
- **Key Takeaways** - Extracted main points and insights
- **Target Audience Detection** - AI identifies intended viewers
- **Content Classification** - Automatic difficulty level and topic categorization
- **Transcript Highlights** - Important moments with timestamps

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern UI library with hooks and context
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Vite** - Fast build tool and development server

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **YouTube Data API v3** - Official YouTube integration
- **Google Gemini AI** - Advanced language model

### **Services**
- **Firebase Auth** - User authentication and management
- **Firebase Hosting** - Secure and fast web hosting
- **Netlify** - Modern web deployment platform

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Concurrently** - Run multiple npm scripts
- **Axios** - HTTP client for API requests

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Cloud Console** account
- **Firebase** project

### 1. Clone Repository
```bash
git clone https://github.com/HorizonHnk/Youtube-Summarizer.git
cd Youtube-Summarizer
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run setup

# Or install separately
npm install
cd backend && npm install
```

### 3. Environment Configuration

#### Backend Configuration (`backend/.env`)
```env
PORT=5000
GEMINI_API_KEY=your-gemini-api-key-here
YOUTUBE_API_KEY=your-youtube-api-key-here
```

#### Frontend Configuration (`src/.env`)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# API Configuration
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

### 4. API Keys Setup

#### Get YouTube Data API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **YouTube Data API v3**
4. Create credentials (API Key)
5. Add the key to your `.env` files

#### Get Gemini AI API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env` files

#### Setup Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Copy configuration to your `.env` file

### 5. Run Development Server
```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run dev:frontend-only  # Frontend only (port 3000)
npm run dev:backend-only   # Backend only (port 5000)
```

### 6. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## 📖 Usage Guide

### **Step 1: Authentication**
1. Visit the application homepage
2. Click "Get Started Free" or "Sign Up"
3. Create an account with email/password
4. Sign in to access the summarizer

### **Step 2: Analyze Video**
1. Copy any YouTube video URL
2. Paste it into the input field
3. Click "Analyze Video"
4. Wait for AI processing (usually 10-30 seconds)

### **Step 3: Explore Results**
- **Summary Tab**: View comprehensive analysis
- **Chat Tab**: Ask questions about the video
- **Download**: Export analysis as text file

### **Step 4: Interactive Chat**
- Ask specific questions about video content
- Request explanations of key concepts
- Get timestamps for important moments
- Discuss practical applications

## 🏗️ Project Structure

```
YouTube-Summarizer/
├── 📁 backend/
│   ├── 📄 server.js           # Express server and API routes
│   ├── 📄 package.json        # Backend dependencies
│   └── 📄 .env                # Backend environment variables
├── 📁 src/
│   ├── 📁 components/         # React components
│   │   ├── 📄 YouTubeSummarizer.jsx
│   │   ├── 📄 Login.jsx
│   │   ├── 📄 Signup.jsx
│   │   └── 📄 Welcome.jsx
│   ├── 📁 contexts/           # React context providers
│   │   └── 📄 AuthContext.jsx
│   ├── 📁 services/           # API services
│   │   ├── 📄 gemini.js       # Gemini AI integration
│   │   └── 📄 api.js          # HTTP client setup
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 styles/             # CSS styles
│   └── 📄 App.jsx             # Main application component
├── 📄 package.json            # Frontend dependencies
├── 📄 vite.config.js          # Vite configuration
├── 📄 tailwind.config.js      # Tailwind CSS config
└── 📄 README.md               # This file
```

## 🔧 API Endpoints

### **Backend Routes**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Check server status and API availability |
| `POST` | `/api/summarize` | Analyze YouTube video with AI |

### **Request Example**
```javascript
POST /api/summarize
Content-Type: application/json

{
  "youtube_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "model": "gemini-1.5-flash",
  "additional_prompt": "Focus on practical applications"
}
```

### **Response Example**
```javascript
{
  "success": true,
  "summary": "Comprehensive AI analysis...",
  "video_metadata": {
    "title": "Video Title",
    "channel": "Channel Name",
    "duration": "4m 13s",
    "views": "1,234,567",
    "published": "2024-01-15"
  },
  "analysis_quality": {
    "has_transcript": true,
    "content_richness": "High",
    "formatting_cleaned": true
  }
}
```

## 🎯 Advanced Features

### **Smart Retry Logic**
- Automatic retry on API failures
- Exponential backoff strategy
- Graceful degradation for overloaded services

### **Enhanced Error Handling**
- User-friendly error messages
- Detailed troubleshooting guides
- Fallback options for API issues

### **Performance Optimization**
- Lazy loading components
- Image optimization
- Code splitting for faster loads

### **Responsive Design System**
- 8-breakpoint system (xxs to xxxl)
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🚀 Deployment

### **Frontend Deployment (Netlify)**
```bash
# Build for production
npm run build

# Deploy to Netlify (connect GitHub repository)
# Site: https://youtube-summarization.netlify.app/
```

### **Backend Deployment Options**

#### **Option 1: Railway**
```bash
# Connect GitHub repository to Railway
# Add environment variables in Railway dashboard
```

#### **Option 2: Vercel Serverless**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### **Option 3: Heroku**
```bash
# Create Procfile
echo "web: node backend/server.js" > Procfile

# Deploy to Heroku
git push heroku main
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow existing code style
- Add comments for complex logic
- Test features thoroughly
- Update documentation as needed

### **Areas for Contribution**
- 🐛 Bug fixes and improvements
- 🌟 New features and enhancements
- 📚 Documentation updates
- 🎨 UI/UX improvements
- 🔧 Performance optimizations

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Ngoy Henock Mukonkole**
- 📧 **Email**: [hhnk3693@gmail.com](mailto:hhnk3693@gmail.com)
- 🐙 **GitHub**: [HorizonHnk](https://github.com/HorizonHnk)
- 📺 **YouTube**: [Development Tutorials](https://www.youtube.com/playlist?list=PLrZbkNpNVSwwEIPRtoMxEy14_2DFuMM8k)
- 🌐 **Live Demo**: [youtube-summarization.netlify.app](https://youtube-summarization.netlify.app/)

### **Expertise**
- Full-Stack JavaScript Development
- React.js & Node.js Applications
- AI Integration (Google Gemini, OpenAI)
- YouTube API & Video Processing
- Firebase & Modern Web Technologies

## 🙏 Acknowledgments

- **Google Gemini AI** - Advanced language processing
- **YouTube Data API** - Authentic video metadata
- **Firebase** - Authentication and hosting
- **React Community** - Amazing framework and ecosystem
- **Tailwind CSS** - Beautiful utility-first styling

## 📊 Project Stats

- **Languages**: JavaScript, CSS, HTML
- **Framework**: React.js + Node.js
- **Database**: Firebase Firestore
- **Deployment**: Netlify + Railway
- **License**: MIT
- **Development Time**: 3+ months
- **Features**: 15+ core functionalities

---

<div align="center">

### 🌟 Star this repository if you found it helpful! 🌟

**Built with ❤️ by [Ngoy Henock Mukonkole](https://github.com/HorizonHnk)**

[🔗 Repository](https://github.com/HorizonHnk/Youtube-Summarizer.git) • [🌐 Live Demo](https://youtube-summarization.netlify.app/) • [📧 Contact](mailto:hhnk3693@gmail.com)

</div>
