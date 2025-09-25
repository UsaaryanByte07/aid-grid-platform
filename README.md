# 🩸 AidGrid Platform

[![Hackathon](https://img.shields.io/badge/Hackathon-Ignite-orange?style=for-the-badge)](https://github.com/UsaaryanByte07/aid-grid-platform)
[![Team](https://img.shields.io/badge/Team-Syntax%20Slayer-blue?style=for-the-badge)](https://github.com/UsaaryanByte07/aid-grid-platform)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)](https://github.com/UsaaryanByte07/aid-grid-platform)

> 🏆 **Hackathon Project** - Ignite Hackathon Submission by Team Syntax Slayer

AidGrid Platform is a comprehensive blood donation management system that connects donors, hospitals, and communities to save lives through efficient blood donation coordination. Built during the Ignite Hackathon, this platform streamlines the blood donation process with real-time requests, bootcamp management, and AI-powered assistance.

## 🎯 Project Overview

AidGrid addresses the critical challenge of blood shortage by creating a digital ecosystem where:
- 🏥 Hospitals can post urgent blood requests
- 🩸 Donors can find and respond to nearby requests
- 📅 Blood donation camps can be organized and managed
- 🤖 AI chatbot provides instant assistance and information
- 📊 Real-time analytics track impact and statistics

## 👥 Team Syntax Slayer

| Role | Name | GitHub |
|------|------|--------|
| 👑 **Team Leader** | Amishi Verma | [@AmishiVerma](https://github.com/AmishiVerma) |
| 👨‍💻 **Developer** | Aryan Upadhyay | [@UsaaryanByte07](https://github.com/UsaaryanByte07) |
| 👩‍💻 **Developer** | Ishani Taishete | [@IshaniTaishete](https://github.com/IshaniTaishete) |
| 👨‍💻 **Developer** | Vishva Desai | [@VishwaDesai](https://github.com/Vishva-desai) |

*Note: Please update the GitHub profile links above with the actual usernames*

## 🛠️ Tech Stack

### Frontend
<div align="left">
  <img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwindcss" />
</div>

- **React 18** - Modern UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautifully designed components

### Backend
<div align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express,sqlite" />
</div>

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **SQLite** - Lightweight, serverless database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing library

### AI Integration
<div align="left">
  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" width="48" height="48" />
</div>

- **Google Gemini API** - AI-powered chatbot for user assistance

### Tools & Utilities
<div align="left">
  <img src="https://skillicons.dev/icons?i=git,github,vscode" />
</div>

## ✨ Features

### 🏥 For Hospitals
- **Blood Request Management** - Post urgent blood requests with detailed requirements
- **Donor Response Tracking** - View and manage donor responses in real-time
- **Bootcamp Organization** - Plan and manage blood donation camps
- **Appointment Scheduling** - Coordinate donation appointments with donors
- **Analytics Dashboard** - Track requests, responses, and donation statistics

### 🩸 For Donors
- **Request Discovery** - Find blood requests by location and blood type
- **Profile Management** - Maintain donation history and preferences
- **Bootcamp Registration** - Register for upcoming blood donation camps
- **Impact Tracking** - View personal donation statistics and lives saved
- **Appointment Booking** - Schedule donation appointments with hospitals

### 🤖 AI Assistant
- **24/7 Chatbot Support** - Get instant answers about blood donation
- **Eligibility Checking** - AI-powered donor eligibility assessment
- **Information Hub** - Access comprehensive blood donation information

### 🌍 Community Features
- **Search & Discovery** - Find donors and hospitals by location
- **Real-time Statistics** - Live updates on platform activity
- **Multilingual Support** - Available in English and Hindi

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/UsaaryanByte07/aid-grid-platform.git
   cd aid-grid-platform
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file in backend directory
   cd backend
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```

5. **Get your Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API key"
   - Copy the generated key and replace `your_gemini_api_key_here` in the `.env` file

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5500`

2. **Start the frontend development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```
   The frontend will run on `http://localhost:8080`

3. **Access the application**
   Open your browser and navigate to `http://localhost:8080`

## 📱 Usage Guide

### For New Users
1. **Register** - Choose your role (Donor or Hospital) and create an account
2. **Complete Profile** - Add your location, blood type, and other relevant information
3. **Explore** - Browse blood requests, upcoming bootcamps, or post new requests

### For Donors
1. **Find Requests** - Use the search page to find blood requests near you
2. **Respond** - Click on requests and offer to donate
3. **Book Appointments** - Schedule convenient donation times
4. **Track Impact** - View your donation history and lives saved

### For Hospitals
1. **Post Requests** - Create urgent blood requests with detailed requirements
2. **Manage Responses** - Review and coordinate with responding donors
3. **Organize Bootcamps** - Plan blood donation drives in your community
4. **Schedule Appointments** - Coordinate donation appointments

### AI Chatbot
- Click the chat icon to access the AI assistant
- Ask questions about blood donation eligibility, process, or general information
- Get instant, accurate responses powered by Google Gemini

## 🏗️ Project Structure

```
aid-grid-platform/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── backend/                 # Backend source code
│   ├── index.js            # Main server file
│   ├── aidgrid.db          # SQLite database
│   └── .env                # Environment variables
└── public/                 # Static assets
```

## 🌟 Key Achievements

- ✅ **Full-Stack Implementation** - Complete frontend and backend integration
- ✅ **Real-time Features** - Live updates for requests and responses
- ✅ **AI Integration** - Functional chatbot with Google Gemini
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Secure Authentication** - JWT-based user authentication
- ✅ **Database Management** - Efficient SQLite database design
- ✅ **Multilingual Support** - English and Hindi localization

## 🚧 Future Enhancements

- 📧 Email notifications for urgent requests
- 📍 GPS-based location tracking
- 📱 Mobile app development
- 🔔 Push notifications
- 📊 Advanced analytics and reporting
- 🏆 Gamification features
- 🤝 Integration with blood banks
- ☁️ Cloud deployment

## 🤝 Contributing

While this was a hackathon project, we welcome contributions and feedback:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ignite Hackathon** - For providing the platform to showcase our innovation
- **Google Gemini API** - For powering our AI chatbot
- **Open Source Community** - For the amazing tools and libraries used

## 📞 Contact

For any questions or collaboration opportunities, feel free to reach out to any team member through their GitHub profiles.

---

<div align="center">
  <strong>Built with ❤️ by Team Syntax Slayer for Ignite Hackathon</strong>
</div>