import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Users,
  Activity,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  Edit,
  Bell,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const HospitalDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('requests');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCampModal, setShowCampModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    bloodGroup: '',
    urgency: '',
    patientInfo: '',
    unitsNeeded: '',
    description: ''
  });
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bootcamps, setBootcamps] = useState<any[]>([]);
  const [campForm, setCampForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    expectedDonors: ''
  });
  const [editingCamp, setEditingCamp] = useState<any | null>(null);
  // Edit Request state
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState<any | null>(null);
  const [editRequestForm, setEditRequestForm] = useState({
    bloodGroup: '',
    urgency: '',
    patientInfo: '',
    unitsNeeded: '',
    description: '',
    status: ''
  });
  // Responses state
  const [showResponsesModal, setShowResponsesModal] = useState(false);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [responsesRequestTitle, setResponsesRequestTitle] = useState<string>('');

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5500/api/hospital/${user.id}/dashboard`)
        .then(res => res.json())
        .then(data => {
          setDashboard(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load dashboard');
          setLoading(false);
        });
      // Load bootcamps for this hospital
      fetch(`http://localhost:5500/api/hospital/${user.id}/bootcamps`)
        .then(res => res.json())
        .then(data => setBootcamps(data))
        .catch(() => {/* ignore for now */});
    }
  }, [user]);

  // Remove duplicate handleRequestSubmit, keep only the async version below

  // Mock data
  const stats = [
    { label: 'Active Requests', value: '12', icon: Activity, color: 'text-red-500' },
    { label: 'Responses Today', value: '8', icon: Users, color: 'text-blue-500' },
    { label: 'Fulfilled This Week', value: '24', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Upcoming Camps', value: '3', icon: Calendar, color: 'text-purple-500' }
  ];

  const activeRequests = [
    {
      id: 1,
      patientInfo: 'Emergency Surgery - Room 204',
      bloodGroup: 'O+',
      urgency: 'Critical',
      unitsNeeded: 4,
      timePosted: '15 mins ago',
      responses: 3,
      status: 'Active'
    },
    {
      id: 2,
      patientInfo: 'Cancer Treatment - Oncology Ward',
      bloodGroup: 'A+',
      urgency: 'Urgent',
      unitsNeeded: 2,
      timePosted: '1 hour ago',
      responses: 5,
      status: 'Partially Fulfilled'
    },
    {
      id: 3,
      patientInfo: 'Scheduled Surgery - OR 3',
      bloodGroup: 'B+',
      urgency: 'Routine',
      unitsNeeded: 1,
      timePosted: '3 hours ago',
      responses: 8,
      status: 'Fulfilled'
    }
  ];

  const donationTrends = [
    { month: 'Jan', donations: 45, demand: 52 },
    { month: 'Feb', donations: 38, demand: 41 },
    { month: 'Mar', donations: 52, demand: 48 },
    { month: 'Apr', donations: 41, demand: 55 },
    { month: 'May', donations: 47, demand: 43 },
    { month: 'Jun', donations: 55, demand: 49 }
  ];

  const responseTimeData = [
    { hour: '00:00', avgResponse: 45 },
    { hour: '04:00', avgResponse: 60 },
    { hour: '08:00', avgResponse: 25 },
    { hour: '12:00', avgResponse: 20 },
    { hour: '16:00', avgResponse: 30 },
    { hour: '20:00', avgResponse: 35 }
  ];

  const upcomingBootcamps = bootcamps;

  const handleCampSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const response = await fetch('http://localhost:5500/api/bootcamps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hospitalId: user.id,
          title: campForm.title,
          date: campForm.date,
          time: campForm.time,
          venue: campForm.venue,
          expectedDonors: campForm.expectedDonors ? Number(campForm.expectedDonors) : 0,
        }),
      });
      if (!response.ok) throw new Error('Failed');
      toast.success('Camp created');
      // refresh list
      const list = await fetch(`http://localhost:5500/api/hospital/${user.id}/bootcamps`).then(r => r.json());
      setBootcamps(list);
      setShowCampModal(false);
      setCampForm({ title: '', date: '', time: '', venue: '', expectedDonors: '' });
    } catch (err) {
      toast.error('Failed to create camp');
    }
  };

  const deleteCamp = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5500/api/bootcamps/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      setBootcamps(prev => prev.filter(c => c.id !== id));
      toast.success('Camp deleted');
    } catch (err) {
      toast.error('Failed to delete camp');
    }
  };

  const updateCamp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCamp) return;
    try {
      const res = await fetch(`http://localhost:5500/api/bootcamps/${editingCamp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: campForm.title,
          date: campForm.date,
          time: campForm.time,
          venue: campForm.venue,
          expectedDonors: campForm.expectedDonors ? Number(campForm.expectedDonors) : 0,
          status: editingCamp.status,
        })
      });
      if (!res.ok) throw new Error('Failed');
      const updated = await res.json();
      setBootcamps(prev => prev.map(c => c.id === updated.id ? updated : c));
      setEditingCamp(null);
      setShowCampModal(false);
      setCampForm({ title: '', date: '', time: '', venue: '', expectedDonors: '' });
      toast.success('Camp updated');
    } catch (err) {
      toast.error('Failed to update camp');
    }
  };

  const openEditRequest = (req: any) => {
    setEditingRequest(req);
    setEditRequestForm({
      bloodGroup: req.bloodGroup || '',
      urgency: req.urgency || '',
      patientInfo: req.patientInfo || '',
      unitsNeeded: String(req.unitsNeeded ?? ''),
      description: req.description || '',
      status: req.status || 'Active'
    });
    setShowEditRequestModal(true);
  };

  const handleUpdateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;
    try {
      const res = await fetch(`http://localhost:5500/api/requests/${editingRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bloodGroup: editRequestForm.bloodGroup,
          urgency: editRequestForm.urgency,
          patientInfo: editRequestForm.patientInfo,
          unitsNeeded: editRequestForm.unitsNeeded ? Number(editRequestForm.unitsNeeded) : undefined,
          description: editRequestForm.description,
          status: editRequestForm.status,
        })
      });
      if (!res.ok) throw new Error('Failed');
      const updated = await res.json();
      setDashboard((prev: any) => ({
        ...prev,
        requests: prev?.requests?.map((r: any) => r.id === updated.id ? updated : r)
      }));
      setShowEditRequestModal(false);
      setEditingRequest(null);
      toast.success('Request updated');
    } catch (err) {
      toast.error('Failed to update request');
    }
  };

  const openResponses = async (req: any) => {
    try {
      setResponsesLoading(true);
      setShowResponsesModal(true);
      setResponsesRequestTitle(req.patientInfo || `Request #${req.id}`);
      const res = await fetch(`http://localhost:5500/api/requests/${req.id}/responses`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setResponses(data);
    } catch (err) {
      toast.error('Failed to load responses');
      setResponses([]);
    } finally {
      setResponsesLoading(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const response = await fetch('http://localhost:5500/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...requestForm,
        hospitalId: user.id,
      }),
    });
    if (!response.ok) {
      toast.error('Failed to create request');
      return;
    }
    toast.success('Blood request posted successfully!');
    // Refresh dashboard data
    fetch(`http://localhost:5500/api/hospital/${user.id}/dashboard`)
      .then(res => res.json())
      .then(data => setDashboard(data));
    setShowRequestModal(false);
    setRequestForm({
      bloodGroup: '',
      urgency: '',
      patientInfo: '',
      unitsNeeded: '',
      description: ''
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Urgent': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Routine': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Partially Fulfilled': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Fulfilled': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const tabs = [
    { id: 'requests', name: 'Patient Requests', icon: Activity },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'bootcamps', name: 'Blood Camps', icon: Calendar },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
                {user?.name} Dashboard
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Verified Hospital</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user?.location}</span>
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowRequestModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Blood Request</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="card p-6 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-primary-500 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  Active Blood Requests
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Real-time updates</span>
                </div>
              </div>

              <div className="grid gap-6">
                {dashboard && dashboard.requests && dashboard.requests.map((request: any) => (
                  <motion.div
                    key={request.id}
                    whileHover={{ y: -2 }}
                    className="card p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                            {request.patientInfo}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <span className="flex items-center space-x-1">
                            <Activity className="h-4 w-4 text-red-500" />
                            <span>Blood Group: {request.bloodGroup}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{request.unitsNeeded} units needed</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Posted {request.timePosted}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                            {request.responses} responses
                          </div>
                          {request.responses > 0 && (
                            <button className="text-blue-500 hover:text-blue-700 text-sm font-medium" onClick={() => openResponses(request)}>
                              View responses →
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="btn-ghost p-2" onClick={() => openEditRequest(request)}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="btn-secondary">
                          Track Status
                        </button>
                        <button className="btn-primary">
                          Contact Donors
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">
                  Donation vs Demand Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={donationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="donations" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="demand" stroke="#E63946" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Donations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Demand</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">
                  Average Response Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgResponse" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                  Response time in minutes by hour of day
                </p>
              </div>

              <div className="lg:col-span-2 card p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">
                  Predictive Alerts
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <AlertCircle className="h-6 w-6 text-yellow-600 mb-2" />
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-400">
                      High Demand Predicted
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      A+ blood group demand expected to increase by 40% next week
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-blue-800 dark:text-blue-400">
                      Donor Activity Up
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      30% more donors active this month compared to last month
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                    <h4 className="font-semibold text-green-800 dark:text-green-400">
                      Supply Stable
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Current inventory levels are healthy for all blood types
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bootcamps' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  Blood Camp Management
                </h2>
                <button className="btn-primary" onClick={() => setShowCampModal(true)}>
                  Create New Camp
                </button>
              </div>

              <div className="grid gap-6">
                {upcomingBootcamps.map((camp) => (
                  <div key={camp.id} className="card p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                            {camp.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            camp.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                          }`}>
                            {camp.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{camp.date ? new Date(camp.date).toLocaleDateString() : ''}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{camp.time}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{camp.venue}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{camp.expectedDonors} expected</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="btn-ghost" onClick={() => { setEditingCamp(camp); setCampForm({ title: camp.title, date: camp.date, time: camp.time, venue: camp.venue, expectedDonors: String(camp.expectedDonors ?? '') }); setShowCampModal(true); }}>
                          Edit
                        </button>
                        <button className="btn-secondary">
                          View Details
                        </button>
                        <button className="btn-primary" onClick={() => deleteCamp(camp.id)}>
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
                Recent Notifications
              </h2>
              <div className="space-y-4">
                {[
                  {
                    type: 'donor_response',
                    message: 'New donor response for O+ blood request (Room 204)',
                    time: '5 minutes ago',
                    urgent: true
                  },
                  {
                    type: 'bootcamp_confirmation',
                    message: 'Monthly Blood Drive confirmed for Feb 15, 2024',
                    time: '1 hour ago',
                    urgent: false
                  },
                  {
                    type: 'supply_alert',
                    message: 'Low inventory alert: B- blood group running low',
                    time: '2 hours ago',
                    urgent: true
                  },
                  {
                    type: 'donor_feedback',
                    message: 'Positive feedback received from recent donor',
                    time: '1 day ago',
                    urgent: false
                  }
                ].map((notification, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-l-4 ${
                      notification.urgent 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-gray-800 dark:text-gray-200">
                        {notification.message}
                      </p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* New Request Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  New Blood Request
                </h2>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Blood Group Required
                    </label>
                    <select
                      value={requestForm.bloodGroup}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, bloodGroup: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={requestForm.urgency}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select urgency</option>
                      <option value="Critical">Critical</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Routine">Routine</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Patient Information
                    </label>
                    <input
                      type="text"
                      value={requestForm.patientInfo}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, patientInfo: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Emergency Surgery - Room 204"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Units Needed
                    </label>
                    <input
                      type="number"
                      value={requestForm.unitsNeeded}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, unitsNeeded: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Number of units"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Description
                  </label>
                  <textarea
                    value={requestForm.description}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Additional details about the patient's condition or special requirements..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Post Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* New Camp Modal */}
        {showCampModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  Create Blood Camp
                </h2>
                <button
                  onClick={() => setShowCampModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={editingCamp ? updateCamp : handleCampSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Camp Title
                    </label>
                    <input
                      type="text"
                      value={campForm.title}
                      onChange={(e) => setCampForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Community Blood Drive"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={campForm.date}
                      onChange={(e) => setCampForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      value={campForm.time}
                      onChange={(e) => setCampForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 09:00 AM - 05:00 PM"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected Donors
                    </label>
                    <input
                      type="number"
                      value={campForm.expectedDonors}
                      onChange={(e) => setCampForm(prev => ({ ...prev, expectedDonors: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 150"
                      min={0}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={campForm.venue}
                    onChange={(e) => setCampForm(prev => ({ ...prev, venue: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., City Community Center"
                    required
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCampModal(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Create Camp
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Edit Request Modal */}
        {showEditRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  Edit Blood Request
                </h2>
                <button
                  onClick={() => setShowEditRequestModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleUpdateRequest} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Blood Group Required
                    </label>
                    <select
                      value={editRequestForm.bloodGroup}
                      onChange={(e) => setEditRequestForm(prev => ({ ...prev, bloodGroup: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={editRequestForm.urgency}
                      onChange={(e) => setEditRequestForm(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select urgency</option>
                      <option value="Critical">Critical</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Routine">Routine</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Patient Information
                    </label>
                    <input
                      type="text"
                      value={editRequestForm.patientInfo}
                      onChange={(e) => setEditRequestForm(prev => ({ ...prev, patientInfo: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Emergency Surgery - Room 204"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Units Needed
                    </label>
                    <input
                      type="number"
                      value={editRequestForm.unitsNeeded}
                      onChange={(e) => setEditRequestForm(prev => ({ ...prev, unitsNeeded: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Number of units"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Description
                  </label>
                  <textarea
                    value={editRequestForm.description}
                    onChange={(e) => setEditRequestForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Additional details about the patient's condition or special requirements..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={editRequestForm.status}
                    onChange={(e) => setEditRequestForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Partially Fulfilled">Partially Fulfilled</option>
                    <option value="Fulfilled">Fulfilled</option>
                  </select>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditRequestModal(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Responses Modal */}
        {showResponsesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  Donor Responses
                </h2>
                <button
                  onClick={() => setShowResponsesModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                For: <span className="font-medium text-gray-900 dark:text-white">{responsesRequestTitle}</span>
              </div>

              {responsesLoading ? (
                <div className="text-center text-gray-600 dark:text-gray-400">Loading responses...</div>
              ) : responses.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400">No responses yet.</div>
              ) : (
                <div className="space-y-3">
                  {responses.map((r) => (
                    <div key={r.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-gray-900 dark:text-white">{r.donorName}</div>
                        <div className="text-xs text-gray-500">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {r.donorBloodGroup} • {r.donorLocation || 'Location N/A'}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-200">{r.message}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-end mt-6">
                <button className="btn-primary" onClick={() => setShowResponsesModal(false)}>Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;