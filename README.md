# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a05a4411-f4fc-4193-80b1-5909173445e8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a05a4411-f4fc-4193-80b1-5909173445e8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

### Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Backend Setup

This project includes a full-stack backend built with Node.js, Express, and MongoDB.

### Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - **Local MongoDB**: [Install MongoDB Community Edition](https://docs.mongodb.com/manual/installation/)
   - **MongoDB Atlas**: [Create free cluster](https://cloud.mongodb.com/)

### Quick Start (Both Frontend & Backend)

```sh
# Install frontend dependencies
npm install

# Install backend dependencies
npm run server:install

# Set up backend environment
cd server
cp .env.example .env
# Edit .env file with your configuration
cd ..

# Start both frontend and backend together
npm run dev:full
```

This will start:
- Frontend on: http://localhost:8080
- Backend API on: http://localhost:5000

### Backend-Only Setup

```sh
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env file with your MongoDB connection string and other config
# For local MongoDB: MONGODB_URI=mongodb://localhost:27017/aidgrid
# For MongoDB Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aidgrid

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the `/server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aidgrid

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:8080
```

### Database Setup

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service: `mongod`
3. The application will automatically create the `aidgrid` database

#### Option 2: MongoDB Atlas (Production)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier available)
3. Create database user and get connection string
4. Update `MONGODB_URI` in `.env` file

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "type": "donor",
  "bloodGroup": "O+",
  "location": "New York, NY"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "type": "donor"
}
```

### Profile Endpoints

#### Get Profile
```http
GET /api/profile
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PUT /api/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "location": "Boston, MA",
  "phone": "+1234567890"
}
```

### Donation Endpoints (Donors Only)

#### Get My Donations
```http
GET /api/donations/my?page=1&limit=10
Authorization: Bearer <jwt_token>
```

#### Record Donation
```http
POST /api/donations/record
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "hospitalId": "hospital_object_id",
  "bloodGroup": "O+",
  "unitsRecorded": 1,
  "donationDate": "2024-01-15T10:00:00Z",
  "location": "City Hospital, NY",
  "notes": "Regular donation"
}
```

### Request Endpoints

#### Get Donation Requests
```http
GET /api/requests?page=1&limit=10&bloodGroup=O+&urgency=high
Authorization: Bearer <jwt_token>
```

#### Create Request (Hospitals Only)
```http
POST /api/requests
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "bloodGroup": "O+",
  "unitsNeeded": 3,
  "urgency": "high",
  "description": "Emergency surgery patient needs blood",
  "patientAge": 45,
  "contactNumber": "+1234567890",
  "address": "123 Hospital St, NY",
  "deadline": "2024-01-20T18:00:00Z"
}
```

#### Respond to Request (Donors Only)
```http
POST /api/requests/:requestId/respond
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "I can donate tomorrow",
  "contactNumber": "+1234567890",
  "availableDate": "2024-01-16T10:00:00Z"
}
```

### Data Models

#### User Model
- **Donor**: name, email, bloodGroup, location, lastDonation, etc.
- **Hospital**: name, email, hospitalName, licenseNumber, location, etc.

#### DonationRequest Model
- bloodGroup, unitsNeeded, urgency, description, deadline
- hospital (reference), responses (array of donor responses)

#### DonationRecord Model
- donor, hospital, bloodGroup, unitsRecorded, donationDate
- Medical info: hemoglobinLevel, bloodPressure

### Frontend Integration Example

Visit `/api-demo` in the frontend to see a live example of API integration that:
- Fetches donation requests from the backend
- Handles loading states and errors  
- Demonstrates real API communication

## Development Tips

1. **API Testing**: Use Postman or curl to test API endpoints
2. **Database Viewing**: Use MongoDB Compass to view your local database
3. **Logs**: Backend logs appear in terminal, check for any errors
4. **CORS**: Frontend and backend are configured to work together
5. **Authentication**: Most endpoints require JWT token in Authorization header

## How can I deploy this project?

### Frontend Deployment
Simply open [Lovable](https://lovable.dev/projects/a05a4411-f4fc-4193-80b1-5909173445e8) and click on Share → Publish.

### Backend Deployment
For production deployment, consider:
- **Heroku**: Easy Node.js deployment
- **Railway**: Simple full-stack deployment  
- **DigitalOcean**: App Platform or Droplets
- **AWS**: EC2, Elastic Beanstalk, or Lambda

Remember to:
1. Set production environment variables
2. Use MongoDB Atlas for production database
3. Set strong JWT secret
4. Enable HTTPS in production

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
