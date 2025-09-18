# Aid Grid Platform - Backend API

A robust Node.js backend API for the Aid Grid Platform, built with Express.js and MongoDB. This API provides authentication, request management, and donation tracking features for connecting aid donors with those in need.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Request Management**: CRUD operations for aid requests with advanced filtering
- **Donation Tracking**: Track donations and funding progress
- **Data Validation**: Comprehensive input validation and sanitization
- **Security**: Rate limiting, CORS, and security headers
- **MongoDB Integration**: Mongoose ODM with optimized queries
- **Error Handling**: Centralized error handling with detailed logging

## 📋 Prerequisites

Before running this backend, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## 🛠️ Installation & Setup

### 1. Navigate to Server Directory
```bash
cd server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aid-grid-platform
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The database will be created automatically on first connection

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

### 5. Start the Server

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "John Updated",
  "profile": {
    "phone": "+1234567890",
    "address": "123 Main St"
  }
}
```

### Request Endpoints

#### Get All Requests
```http
GET /api/requests?page=1&limit=10&category=medical_supplies&status=open
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `category`: Filter by category
- `status`: Filter by status (open, in_progress, fulfilled, closed)
- `urgency`: Filter by urgency (low, medium, high, critical)
- `city`: Filter by city
- `state`: Filter by state
- `search`: Search in title and description
- `sortBy`: Sort field (createdAt, title, urgency, deadline, targetAmount)
- `order`: Sort order (asc, desc)

#### Get Single Request
```http
GET /api/requests/:id
```

#### Create Request
```http
POST /api/requests
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Medical Supplies Needed",
  "description": "Urgent need for medical supplies...",
  "category": "medical_supplies",
  "urgency": "high",
  "location": {
    "address": "123 Hospital St",
    "city": "New York",
    "state": "NY"
  },
  "targetAmount": 5000,
  "beneficiaries": 100,
  "deadline": "2024-12-31T23:59:59.000Z"
}
```

#### Update Request
```http
PUT /api/requests/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "status": "in_progress",
  "urgency": "medium"
}
```

#### Delete Request
```http
DELETE /api/requests/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Donate to Request
```http
POST /api/requests/:id/donate
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "amount": 100,
  "message": "Hope this helps!"
}
```

#### Add Update to Request
```http
POST /api/requests/:id/update
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Progress Update",
  "content": "We've received 50% of our target...",
  "images": ["https://example.com/image1.jpg"]
}
```

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email",
      "value": "invalid-email"
    }
  ]
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### User Roles
- **donor**: Can create requests, donate to requests
- **hospital**: Can create and manage requests (hospital-specific features)
- **admin**: Full access, can verify requests and manage users

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['donor', 'hospital', 'admin'],
  profile: {
    phone: String,
    address: String,
    organization: String,
    avatar: String
  },
  isVerified: Boolean,
  isActive: Boolean,
  lastLogin: Date
}
```

### Request Model
```javascript
{
  title: String,
  description: String,
  category: String,
  urgency: ['low', 'medium', 'high', 'critical'],
  status: ['open', 'in_progress', 'fulfilled', 'closed'],
  requester: ObjectId (ref: User),
  location: {
    address: String,
    city: String,
    state: String,
    coordinates: { latitude: Number, longitude: Number }
  },
  targetAmount: Number,
  raisedAmount: Number,
  beneficiaries: Number,
  deadline: Date,
  images: [String],
  donors: [{
    user: ObjectId (ref: User),
    amount: Number,
    donatedAt: Date,
    message: String
  }],
  updates: [{
    title: String,
    content: String,
    images: [String],
    createdAt: Date
  }]
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/aid-grid-platform |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |

## 🚀 Deployment

### Production Deployment

1. Set environment variables for production
2. Ensure MongoDB is accessible
3. Start the server with `npm start`

### Docker Deployment (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

To test the API endpoints, you can use:

1. **Postman**: Import the API collection
2. **curl**: Use command line requests
3. **Frontend Integration**: Connect with the React frontend

### Example curl requests:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🔗 Frontend Integration

To connect with the React frontend:

1. Update the frontend's API base URL to `http://localhost:5000/api`
2. Include JWT tokens in API requests
3. Handle authentication state in the frontend
4. Use the provided endpoints for data operations

### Example Frontend API Service:
```javascript
// api/auth.js
const API_BASE = 'http://localhost:5000/api';

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const getRequests = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_BASE}/requests?${queryString}`);
  return response.json();
};
```

## 📝 Error Handling

The API provides comprehensive error handling with appropriate HTTP status codes:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:

1. Check the API documentation above
2. Review error messages and logs
3. Ensure all environment variables are set correctly
4. Verify MongoDB connection
5. Check network connectivity between frontend and backend

## 🔮 Future Enhancements

- File upload support for images and documents
- Email notifications for donations and updates
- Real-time notifications with WebSockets
- Advanced search with geolocation
- Payment gateway integration
- Admin dashboard APIs
- Reporting and analytics endpoints