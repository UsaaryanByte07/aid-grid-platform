import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Mock data for demo
const mockRequests = [
  {
    _id: '1',
    bloodGroup: 'O+',
    unitsNeeded: 3,
    urgency: 'critical',
    description: 'Emergency surgery patient in need of immediate blood transfusion',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    hospital: {
      name: 'City General Hospital',
      hospitalName: 'City General Hospital',
      location: 'Downtown Medical District'
    },
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    _id: '2',
    bloodGroup: 'A+',
    unitsNeeded: 2,
    urgency: 'high',
    description: 'Cancer patient requiring blood for chemotherapy treatment',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    hospital: {
      name: 'University Medical Center',
      hospitalName: 'University Medical Center',
      location: 'University District'
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '3',
    bloodGroup: 'AB-',
    unitsNeeded: 1,
    urgency: 'medium',
    description: 'Elective surgery scheduled for next week, rare blood type needed',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    hospital: {
      name: 'Regional Blood Bank',
      hospitalName: 'Regional Blood Bank',
      location: 'Central District'
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  }
];

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Aid Grid Platform API is running (Demo Mode - No Database)',
    timestamp: new Date().toISOString()
  });
});

// Demo API endpoints
app.get('/api/requests', (req, res) => {
  console.log('GET /api/requests - Demo mode');
  res.json({
    success: true,
    data: {
      requests: mockRequests,
      pagination: {
        page: 1,
        limit: 10,
        total: mockRequests.length,
        pages: 1
      }
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  console.log('POST /api/auth/register - Demo mode');
  res.status(201).json({
    success: true,
    message: 'Demo registration successful (no database)',
    data: {
      user: {
        _id: 'demo-user-id',
        name: req.body.name || 'Demo User',
        email: req.body.email || 'demo@example.com',
        type: req.body.type || 'donor'
      },
      token: 'demo-jwt-token-123456'
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  console.log('POST /api/auth/login - Demo mode');
  res.json({
    success: true,
    message: 'Demo login successful (no database)',
    data: {
      user: {
        _id: 'demo-user-id',
        name: 'Demo User',
        email: req.body.email || 'demo@example.com',
        type: req.body.type || 'donor'
      },
      token: 'demo-jwt-token-123456'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Demo Server running on port ${PORT}`);
  console.log(`🎯 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
  console.log(`⚠️  Running in DEMO MODE - No database required`);
});