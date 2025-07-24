# YouTube Summarizer - Complete Installation Guide 🎥

A professional-grade AI-powered YouTube video analysis platform with interactive chat capabilities, built with modern web technologies and beautiful UI design.

## 🚀 Features

- **AI-Powered Analysis**: Advanced video processing using Google Gemini AI
- **Interactive Chat**: Q&A functionality with video content
- **Authentication System**: Secure Firebase authentication
- **Modern UI Design**: Glass-morphism and gradient effects
- **Responsive Design**: Works perfectly on all devices
- **Real-time Analysis**: Live video processing and insights
- **Multiple AI Models**: Support for Gemini 1.5 and 2.0
- **Enhanced Error Handling**: Comprehensive error boundaries and 404 pages

## 📁 Project Structure

```
youtube-summarizer-fullstack/
├── backend/
│   ├── server.js                 # Main server file with API endpoints
│   ├── package.json             # Backend dependencies
│   └── .env                     # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Welcome.jsx      # Landing page with modern design
│   │   │   ├── Login.jsx        # Authentication login page
│   │   │   ├── Signup.jsx       # User registration page
│   │   │   ├── YouTubeSummarizer.jsx # Main app functionality
│   │   │   ├── LoadingScreen.jsx # Enhanced loading component
│   │   │   ├── ErrorBoundary.jsx # Error handling component
│   │   │   ├── NotFound.jsx     # 404 error page
│   │   │   └── common/
│   │   │       └── Button.jsx   # Reusable button component
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx  # Authentication state management
│   │   ├── firebase/
│   │   │   └── config.js        # Firebase configuration
│   │   ├── hooks/
│   │   │   ├── useForm.js       # Form handling and validation
│   │   │   └── useLocalStorage.js # Local storage management
│   │   ├── App.jsx              # Main app component with routing
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Enhanced global styles
│   ├── .env                     # Frontend environment variables
│   ├── package.json             # Frontend dependencies
│   ├── index.html               # HTML template
│   └── vite.config.js           # Vite configuration
└── package.json                 # Root package.json for scripts
```

## 🛠 Installation Steps

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Google Cloud Account (for Gemini API)
- YouTube Data API key

### 1. Clone the Repository
```bash
git clone https://github.com/HorizonHnk/Youtube-Summarizer.git
cd Youtube-Summarizer
```

### 2. Install Dependencies
```bash
# Install all dependencies (root, backend, and frontend)
npm run install-all

# Or install individually:
# npm install
# cd backend && npm install
# cd ../frontend && npm install
```

### 3. Backend Setup

#### Create Backend Environment File
Create `backend/.env` with the following:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

#### Get API Keys:

**Google Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Create a new project or select existing
3. Generate API key for Gemini
4. Copy the API key

**YouTube Data API Key:**
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key

### 4. Frontend Setup

#### Create Frontend Environment File
Create `frontend/.env` with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_FUNCTIONS_URL=https://region-your_project.cloudfunctions.net
```

#### Firebase Setup:
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication with Email/Password
4. Get your configuration from Project Settings
5. Copy the configuration values to `.env`

### 5. Install New Dependencies

#### Frontend Dependencies:
```bash
cd frontend
npm install firebase react-router-dom
```

### 6. Run the Application

#### Development Mode:
```bash
# Run both backend and frontend concurrently
npm run dev

# Or run separately:
# Backend: npm run backend
# Frontend: npm run frontend
```

#### Production Mode:
```bash
# Build frontend
npm run build

# Start production servers
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🎨 Design Features

### Modern UI Elements:
- **Glass-morphism effects**: Translucent backgrounds with blur
- **Gradient animations**: Dynamic color transitions
- **Floating elements**: Subtle animations throughout
- **Responsive design**: Perfect on mobile and desktop
- **Dark theme**: Professional dark color scheme
- **Loading animations**: Smooth loading states
- **Error boundaries**: Graceful error handling
- **404 page**: Beautiful not found page

### Authentication Flow:
1. **Welcome Page**: Modern landing page with features
2. **Sign Up**: Enhanced registration with validation
3. **Login**: Secure authentication with Firebase
4. **Protected Routes**: Automatic redirection based on auth state

### Main Features:
- **Video Analysis**: AI-powered YouTube video processing
- **Interactive Chat**: Q&A with video content
- **Real-time Updates**: Live processing status
- **Export Options**: Save analysis results
- **History**: Track previous analyses

## 🔧 API Endpoints

### Backend Routes:
- `GET /api/health` - Health check and system status
- `POST /api/summarize` - Analyze YouTube video
- `POST /api/ask-question` - Interactive chat with video content

### Request Examples:

#### Analyze Video:
```javascript
POST /api/summarize
{
  "youtube_link": "https://www.youtube.com/watch?v=...",
  "model": "gemini-1.5-flash",
  "additional_prompt": "Focus on technical details"
}
```

#### Ask Question:
```javascript
POST /api/ask-question
{
  "context_id": "video_context_id",
  "question": "What are the main takeaways?",
  "chat_history": []
}
```

## 🚦 Available Scripts

### Root Level:
- `npm run dev` - Start both backend and frontend in development
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production
- `npm start` - Start production servers

### Backend:
- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend in production

### Frontend:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔒 Security Features

- **Firebase Authentication**: Secure user management
- **Environment Variables**: API keys safely stored
- **Input Validation**: Comprehensive form validation
- **Error Boundaries**: Graceful error handling
- **CORS Protection**: Secure API access
- **Rate Limiting**: API usage protection

## 🎯 Usage Guide

1. **Sign Up**: Create an account with email and password
2. **Login**: Access your dashboard
3. **Paste URL**: Add any YouTube video link
4. **Select Model**: Choose AI model (Gemini 1.5 or 2.0)
5. **Add Instructions**: Optional analysis customization
6. **Analyze**: Process video with AI
7. **Interact**: Ask questions about the content
8. **Export**: Save or share results

## 🐛 Troubleshooting

### Common Issues:

**Backend not connecting:**
- Check if PORT 5000 is available
- Verify API keys in `.env`
- Check console for error messages

**Frontend not loading:**
- Ensure all dependencies installed
- Check Firebase configuration
- Verify environment variables

**Authentication issues:**
- Confirm Firebase setup
- Check auth domain settings
- Verify API keys

**Video analysis failing:**
- Confirm Gemini API key is valid
- Check YouTube API quotas
- Ensure video has captions for best results

## 📞 Support

- **Developer**: hhnk3693@gmail.com
- **GitHub**: https://github.com/HorizonHnk/Youtube-Summarizer.git
- **YouTube**: https://www.youtube.com/playlist?list=PLrZbkNpNVSwwEIPRtoMxEy14_2DFuMM8k

## 📝 License

This project is open source and available under the MIT License.

## 🚀 Deployment

### Netlify (Frontend):
1. Build the frontend: `npm run build`
2. Deploy `frontend/dist` folder to Netlify
3. Add environment variables in Netlify dashboard

### Railway/Heroku (Backend):
1. Deploy backend to Railway or Heroku
2. Set environment variables in platform dashboard
3. Update frontend proxy settings

---

**Built with ❤️ using React, Node.js, Firebase, and Google Gemini AI**