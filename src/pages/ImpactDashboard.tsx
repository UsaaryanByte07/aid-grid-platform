import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Users,
  Hospital,
  TrendingUp,
  Award,
  Globe,
  Calendar,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';

const ImpactDashboard: React.FC = () => {
  // Mock data
  const globalStats = [
    { label: 'Total Lives Saved', value: '12,450', icon: Heart, color: 'text-red-500', growth: '+15%' },
    { label: 'Registered Donors', value: '8,920', icon: Users, color: 'text-blue-500', growth: '+8%' },
    { label: 'Partner Hospitals', value: '156', icon: Hospital, color: 'text-green-500', growth: '+12%' },
    { label: 'Blood Donations', value: '24,800', icon: Activity, color: 'text-purple-500', growth: '+18%' }
  ];

  const donationsOverTime = [
    { month: 'Jan', donations: 1850, lives: 920 },
    { month: 'Feb', donations: 2100, lives: 1050 },
    { month: 'Mar', donations: 2350, lives: 1175 },
    { month: 'Apr', donations: 2800, lives: 1400 },
    { month: 'May', donations: 2450, lives: 1225 },
    { month: 'Jun', donations: 2900, lives: 1450 },
    { month: 'Jul', donations: 3100, lives: 1550 },
    { month: 'Aug', donations: 2750, lives: 1375 },
    { month: 'Sep', donations: 3200, lives: 1600 },
    { month: 'Oct', donations: 3450, lives: 1725 },
    { month: 'Nov', donations: 3600, lives: 1800 },
    { month: 'Dec', donations: 3800, lives: 1900 }
  ];

  const bloodGroupDistribution = [
    { name: 'O+', value: 35, count: 8680, color: '#E63946' },
    { name: 'A+', value: 25, count: 6200, color: '#F77F00' },
    { name: 'B+', value: 20, count: 4960, color: '#FCBF49' },
    { name: 'AB+', value: 8, count: 1984, color: '#003566' },
    { name: 'O-', value: 5, count: 1240, color: '#0077B6' },
    { name: 'A-', value: 4, count: 992, color: '#00B4D8' },
    { name: 'B-', value: 2, count: 496, color: '#90E0EF' },
    { name: 'AB-', value: 1, count: 248, color: '#CAF0F8' }
  ];

  const demandSupplyTrends = [
    { month: 'Jan', demand: 2000, supply: 1850 },
    { month: 'Feb', demand: 2200, supply: 2100 },
    { month: 'Mar', demand: 2400, supply: 2350 },
    { month: 'Apr', demand: 2600, supply: 2800 },
    { month: 'May', demand: 2300, supply: 2450 },
    { month: 'Jun', demand: 2800, supply: 2900 },
    { month: 'Jul', demand: 3000, supply: 3100 },
    { month: 'Aug', demand: 2900, supply: 2750 },
    { month: 'Sep', demand: 3100, supply: 3200 },
    { month: 'Oct', demand: 3300, supply: 3450 },
    { month: 'Nov', demand: 3400, supply: 3600 },
    { month: 'Dec', demand: 3600, supply: 3800 }
  ];

  const regionsData = [
    { region: 'North America', donors: 3200, hospitals: 45, donations: 8500 },
    { region: 'Europe', donors: 2800, hospitals: 38, donations: 7200 },
    { region: 'Asia Pacific', donors: 2100, hospitals: 42, donations: 5900 },
    { region: 'Latin America', donors: 520, hospitals: 18, donations: 1800 },
    { region: 'Africa', donors: 300, hospitals: 13, donations: 1400 }
  ];

  const milestones = [
    {
      date: '2024-01-15',
      title: '10,000 Lives Saved',
      description: 'Reached our milestone of saving 10,000 lives through blood donations',
      type: 'major'
    },
    {
      date: '2024-02-01',
      title: '5,000 Donors Registered',
      description: 'Welcomed our 5,000th registered donor to the LifeFlow community',
      type: 'community'
    },
    {
      date: '2024-02-10',
      title: '100 Partner Hospitals',
      description: 'Expanded our network to include 100 verified hospital partners',
      type: 'growth'
    },
    {
      date: '2024-02-12',
      title: 'AI Prediction System',
      description: 'Launched AI-powered blood demand prediction for better inventory management',
      type: 'innovation'
    }
  ];

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'major': return Heart;
      case 'community': return Users;
      case 'growth': return Hospital;
      case 'innovation': return TrendingUp;
      default: return Award;
    }
  };

  const getMilestoneColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'community': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'growth': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'innovation': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display gradient-text mb-4">
            Global Impact Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track the collective impact of our global blood donation community
          </p>
        </motion.div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {globalStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-bl-lg text-xs font-bold">
                {stat.growth}
              </div>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Donations Over Time */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
              Donations & Lives Saved Over Time
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={donationsOverTime}>
                <defs>
                  <linearGradient id="donationsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E63946" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E63946" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="livesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="#E63946" 
                  fillOpacity={1} 
                  fill="url(#donationsGradient)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="lives" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#livesGradient)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Donations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Lives Saved</span>
              </div>
            </div>
          </motion.div>

          {/* Blood Group Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
              Blood Group Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={bloodGroupDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {bloodGroupDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${props.payload.count} donors (${value}%)`,
                    props.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {bloodGroupDistribution.map((item) => (
                <div key={item.name} className="text-center">
                  <div
                    className="w-4 h-4 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.name}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Demand vs Supply */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mb-12"
        >
          <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
            Blood Demand vs Supply Analysis
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={demandSupplyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="demand" 
                stroke="#f59e0b" 
                strokeWidth={3}
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="supply" 
                stroke="#3b82f6" 
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-0.5 bg-yellow-500" style={{ borderTop: '3px dashed #f59e0b' }}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Demand</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-0.5 bg-blue-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Supply</span>
            </div>
          </div>
        </motion.div>

        {/* Regional Impact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6 mb-12"
        >
          <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <span>Regional Impact</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Region</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Donors</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Hospitals</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Donations</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Impact</th>
                </tr>
              </thead>
              <tbody>
                {regionsData.map((region, index) => (
                  <motion.tr
                    key={region.region}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {region.region}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {region.donors.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {region.hospitals}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {region.donations.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${(region.donations / 8500) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {Math.round((region.donations / 8500) * 100)}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Timeline of Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6"
        >
          <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Calendar className="h-6 w-6" />
            <span>Recent Milestones</span>
          </h3>
          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const IconComponent = getMilestoneIcon(milestone.type);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`p-3 rounded-full ${getMilestoneColor(milestone.type)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {milestone.title}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(milestone.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactDashboard;