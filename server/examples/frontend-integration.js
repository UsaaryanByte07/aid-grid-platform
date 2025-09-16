// Example API service for frontend integration
// This file shows how to connect the React frontend with the backend API

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const authRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Authentication API calls
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  },

  // Get current user profile
  getProfile: () => authRequest('/auth/me'),

  // Update user profile
  updateProfile: (profileData) => authRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),

  // Logout user
  logout: async () => {
    try {
      await authRequest('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};

// Requests API calls
export const requestsAPI = {
  // Get all requests with optional filters
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return authRequest(`/requests${params ? `?${params}` : ''}`);
  },

  // Get a single request by ID
  getById: (id) => authRequest(`/requests/${id}`),

  // Create a new request
  create: (requestData) => authRequest('/requests', {
    method: 'POST',
    body: JSON.stringify(requestData),
  }),

  // Update a request
  update: (id, updateData) => authRequest(`/requests/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  }),

  // Delete a request
  delete: (id) => authRequest(`/requests/${id}`, {
    method: 'DELETE',
  }),

  // Donate to a request
  donate: (id, donationData) => authRequest(`/requests/${id}/donate`, {
    method: 'POST',
    body: JSON.stringify(donationData),
  }),

  // Add an update to a request
  addUpdate: (id, updateData) => authRequest(`/requests/${id}/update`, {
    method: 'POST',
    body: JSON.stringify(updateData),
  }),

  // Get requests by user ID
  getByUser: (userId, filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return authRequest(`/requests/user/${userId}${params ? `?${params}` : ''}`);
  },
};

// Example usage in React components:

/*
// In a React component for login
import { authAPI } from './services/api';

const LoginComponent = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(credentials);
      if (response.success) {
        // Redirect to dashboard or update app state
        console.log('Login successful:', response.data.user);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};
*/

/*
// In a React component for displaying requests
import { requestsAPI } from './services/api';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await requestsAPI.getAll(filters);
        if (response.success) {
          setRequests(response.data.requests);
        }
      } catch (error) {
        console.error('Failed to fetch requests:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [filters]);

  const handleDonate = async (requestId, amount) => {
    try {
      const response = await requestsAPI.donate(requestId, { amount });
      if (response.success) {
        // Refresh the request or update state
        console.log('Donation successful');
      }
    } catch (error) {
      console.error('Donation failed:', error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {requests.map(request => (
        <div key={request._id}>
          <h3>{request.title}</h3>
          <p>{request.description}</p>
          <p>Status: {request.status}</p>
          <p>Raised: ${request.raisedAmount} / ${request.targetAmount}</p>
          <button onClick={() => handleDonate(request._id, 50)}>
            Donate $50
          </button>
        </div>
      ))}
    </div>
  );
};
*/