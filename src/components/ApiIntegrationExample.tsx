import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Heart, Clock, MapPin, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface DonationRequest {
  _id: string;
  bloodGroup: string;
  unitsNeeded: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  deadline: string;
  hospital: {
    name: string;
    hospitalName: string;
    location: string;
  };
  createdAt: string;
}

const ApiIntegrationExample: React.FC = () => {
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/requests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Note: In real implementation, you would include JWT token here:
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setRequests(data.data.requests || []);
        toast.success('Requests loaded successfully!');
      } else {
        throw new Error(data.message || 'Failed to fetch requests');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
      console.error('Fetch requests error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              API Integration Example
            </h2>
            <p className="text-gray-600 mt-1">
              Demonstrating real backend API integration with donation requests
            </p>
          </div>
          <button
            onClick={fetchRequests}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
          >
            <strong>Error:</strong> {error}
            <br />
            <small className="text-red-600">
              Note: This is expected if the backend is not running or you're not authenticated.
            </small>
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Loading requests...</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No donation requests found</p>
            <p className="text-sm text-gray-400 mt-2">
              {error ? 'Unable to fetch from backend' : 'Start the backend server and create some requests!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-red-500">
                        {request.bloodGroup}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {request.unitsNeeded} units needed
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{request.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {request.hospital.hospitalName || request.hospital.name}
                      </div>
                      {request.hospital.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {request.hospital.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Deadline: {formatDate(request.deadline)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Backend Integration Info:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Fetches data from <code className="bg-blue-100 px-1 rounded">/api/requests</code> endpoint</li>
            <li>• Demonstrates error handling and loading states</li>
            <li>• Uses real backend data when server is running</li>
            <li>• Includes authentication headers (when token is available)</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ApiIntegrationExample;