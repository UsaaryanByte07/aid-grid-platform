import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Calendar,
  MapPin,
  Bell,
  Award,
  TrendingUp,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';

const DonorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const donationStats = [
    { name: 'Total Donations', value: 8 },
    { name: 'Lives Saved', value: 24 },
    { name: 'Points Earned', value: 480 }
  ];

  const monthlyDonations = [
    { month: 'Jan', donations: 2 },
    { month: 'Feb', donations: 1 },
    { month: 'Mar', donations: 3 },
    { month: 'Apr', donations: 2 },
    { month: 'May', donations: 0 },
    { month: 'Jun', donations: 1 }
  ];

  const bloodGroupData = [
    { name: 'O+', value: 35, color: '#E63946' },
    { name: 'A+', value: 25, color: '#F77F00' },
    { name: 'B+', value: 20, color: '#FCBF49' },
    { name: 'AB+', value: 10, color: '#003566' },
    { name: 'Others', value: 10, color: '#0077B6' }
  ];

  const liveRequests = [
    {
      id: 1,
      hospital: 'City General Hospital',
      bloodGroup: 'O+',
      urgency: 'Critical',
      distance: '2.3 km',
      timePosted: '15 mins ago',
      description: 'Emergency surgery patient needs immediate blood transfusion'
    },
    {
      id: 2,
      hospital: 'St. Mary Medical Center',
      bloodGroup: 'A+',
      urgency: 'Urgent',
      distance: '4.1 km',
      timePosted: '1 hour ago',
      description: 'Cancer patient undergoing chemotherapy'
    },
    {
      id: 3,
      hospital: 'Metro Health Institute',
      bloodGroup: 'B+',
      urgency: 'Routine',
      distance: '5.8 km',
      timePosted: '3 hours ago',
      description: 'Scheduled surgery preparation'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', donations: 23, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
    { rank: 2, name: 'Michael Chen', donations: 21, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
    { rank: 3, name: 'Emily Davis', donations: 18, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily' },
    { rank: 4, name: user?.name || 'You', donations: 8, avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
    { rank: 5, name: 'David Wilson', donations: 15, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' }
  ];

  const badges = [
    { name: 'First Drop', description: 'Made your first donation', earned: true, icon: '🩸' },
    { name: 'Life Saver', description: 'Saved 10 lives', earned: true, icon: '💪' },
    { name: 'Regular Hero', description: '5 donations in 6 months', earned: true, icon: '🏆' },
    { name: 'Community Champion', description: '20 donations milestone', earned: false, icon: '👑' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Urgent': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Routine': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'requests', name: 'Live Requests', icon: AlertCircle },
    { id: 'leaderboard', name: 'Leaderboard', icon: Award },
    { id: 'community', name: 'Community', icon: Users }
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
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
                  Welcome back, {user?.name}!
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Blood Group: {user?.bloodGroup}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user?.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Last Donation: {user?.lastDonation}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                ✅ Eligible to Donate
              </div>
              <button className="btn-primary">
                Book Appointment
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {donationStats.map((stat, index) => (
            <div key={stat.name} className="card p-6 text-center">
              <div className="text-3xl font-bold font-display text-primary-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.name}
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
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Impact Dashboard */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">
                    Your Impact Over Time
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyDonations}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="donations" fill="#E63946" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">
                    Blood Group Demand
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={bloodGroupData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {bloodGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {bloodGroupData.map((item) => (
                      <div key={item.name} className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.name}: {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Badges */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">
                    Your Badges
                  </h3>
                  <div className="space-y-3">
                    {badges.map((badge) => (
                      <div
                        key={badge.name}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          badge.earned
                            ? 'border-primary-200 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800'
                            : 'border-gray-200 dark:border-gray-700 opacity-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{badge.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {badge.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {badge.description}
                            </p>
                          </div>
                          {badge.earned && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Reminders */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">
                    Health Reminders
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <p className="text-sm text-blue-800 dark:text-blue-400">
                        💧 Stay hydrated - drink at least 8 glasses of water daily
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <p className="text-sm text-green-800 dark:text-green-400">
                        🥗 Eat iron-rich foods like spinach and red meat
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                      <p className="text-sm text-purple-800 dark:text-purple-400">
                        😴 Get adequate sleep - 7-8 hours per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                    Live Blood Requests
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Help save lives by responding to urgent requests in your area
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by hospital..."
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button className="btn-ghost">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-6">
                {liveRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    whileHover={{ y: -2 }}
                    className="card p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                            {request.hospital}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {request.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>Blood Group: {request.bloodGroup}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{request.distance} away</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{request.timePosted}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {request.bloodGroup === user?.bloodGroup && (
                          <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                            Match!
                          </div>
                        )}
                        <button className="btn-primary">
                          Respond
                        </button>
                        <button className="btn-secondary">
                          Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
                Community Leaderboard
              </h2>
              <div className="space-y-4">
                {leaderboard.map((donor) => (
                  <motion.div
                    key={donor.rank}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      donor.name === user?.name
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        donor.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {donor.rank <= 3 ? ['🥇', '🥈', '🥉'][donor.rank - 1] : donor.rank}
                      </div>
                      <img
                        src={donor.avatar}
                        alt={donor.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {donor.name} {donor.name === user?.name && '(You)'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {donor.donations} donations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {donor.donations * 20} pts
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Health Blog</span>
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Pre-Donation Nutrition Guide',
                      excerpt: 'What to eat and drink before your donation...',
                      readTime: '3 min read'
                    },
                    {
                      title: 'Recovery Tips After Blood Donation',
                      excerpt: 'How to take care of yourself post-donation...',
                      readTime: '4 min read'
                    },
                    {
                      title: 'Understanding Blood Types',
                      excerpt: 'Learn about compatibility and universal donors...',
                      readTime: '5 min read'
                    }
                  ].map((article, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {article.excerpt}
                      </p>
                      <span className="text-xs text-primary-500">
                        {article.readTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">
                  Thank You Messages
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      message: "Thank you for saving my daughter's life. Your donation made her surgery possible.",
                      from: "Sarah's Mom",
                      verified: true
                    },
                    {
                      message: "Amazing community of heroes! Keep up the great work.",
                      from: "Dr. Johnson",
                      verified: true
                    },
                    {
                      message: "Your regular donations help us maintain adequate blood supply.",
                      from: "City Hospital",
                      verified: true
                    }
                  ].map((testimonial, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-primary-50 to-red-50 dark:from-primary-900/20 dark:to-red-900/20 rounded-xl">
                      <p className="text-gray-700 dark:text-gray-300 mb-2 italic">
                        "{testimonial.message}"
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          - {testimonial.from}
                        </span>
                        {testimonial.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DonorDashboard;