import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Settings,
  Bell,
  Shield,
  Edit,
  Save,
  X,
  Award,
  Activity,
  Users,
  Globe,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme, language, setLanguage } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: user?.location || '',
    bloodGroup: user?.bloodGroup || '',
    emergencyContact: 'Jane Doe (+1 555 987-6543)',
    medicalConditions: 'None',
    lastDonation: user?.lastDonation || ''
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    donationReminders: true,
    emergencyAlerts: true,
    privacyMode: false,
    locationSharing: true,
    twoFactorAuth: false
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'accessibility', name: 'Accessibility', icon: Eye }
  ];

  const donationHistory = [
    { date: '2024-01-15', location: 'City General Hospital', type: 'Whole Blood', units: 1 },
    { date: '2023-11-20', location: 'St. Mary Medical Center', type: 'Platelets', units: 1 },
    { date: '2023-09-10', location: 'Metro Health Institute', type: 'Whole Blood', units: 1 },
    { date: '2023-07-05', location: 'Community Blood Center', type: 'Whole Blood', units: 1 }
  ];

  const achievements = [
    { name: 'First Drop', description: 'Made your first donation', date: '2023-01-15', earned: true },
    { name: 'Life Saver', description: 'Saved 10 lives through donations', date: '2023-06-20', earned: true },
    { name: 'Regular Hero', description: '5 donations in 6 months', date: '2023-09-10', earned: true },
    { name: 'Community Champion', description: '20 donations milestone', date: null, earned: false }
  ];

  const handleSave = () => {
    // Simulate API call
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast.success(`${setting} ${value ? 'enabled' : 'disabled'}`);
  };

  const SettingToggle = ({ 
    label, 
    description, 
    enabled, 
    onChange, 
    icon: Icon 
  }: {
    label: string;
    description: string;
    enabled: boolean;
    onChange: (value: boolean) => void;
    icon: React.ComponentType<any>;
  }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{label}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display gradient-text mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-1">
                {user?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email}</p>
              
              <div className="flex justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">12</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Donations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">36</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Lives Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">4.9</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Blood Group: {user?.bloodGroup}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{user?.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Last Donation: {user?.lastDonation}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="card p-4 mt-6">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Form */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                      Personal Information
                    </h3>
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="btn-ghost p-2"
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleSave}
                          className="btn-primary p-2"
                        >
                          <Save className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Blood Group
                      </label>
                      <select
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      >
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
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Donation History */}
                <div className="card p-6">
                  <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
                    Donation History
                  </h3>
                  <div className="space-y-4">
                    {donationHistory.map((donation, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                            <Heart className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {donation.type} • {donation.units} unit(s)
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {donation.location}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(donation.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="card p-6">
                  <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
                    Achievements
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          achievement.earned
                            ? 'border-primary-200 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800'
                            : 'border-gray-200 dark:border-gray-700 opacity-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Award className={`h-8 w-8 ${achievement.earned ? 'text-primary-500' : 'text-gray-400'}`} />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {achievement.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                                Earned: {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card p-6">
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
                  General Settings
                </h3>
                <div className="space-y-6">
                  {/* Theme Settings */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Appearance
                    </h4>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-3">
                        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Dark Mode</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Switch between light and dark themes
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isDark ? 'bg-primary-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isDark ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Language Settings */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Language & Region
                    </h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <h5 className="font-medium text-gray-900 dark:text-white">Language</h5>
                      </div>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sound Settings */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Audio
                    </h4>
                    <SettingToggle
                      label="Sound Effects"
                      description="Enable sound for notifications and interactions"
                      enabled={settings.soundEnabled}
                      onChange={(value) => handleSettingChange('soundEnabled', value)}
                      icon={settings.soundEnabled ? Volume2 : VolumeX}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card p-6">
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <SettingToggle
                    label="Email Notifications"
                    description="Receive updates and alerts via email"
                    enabled={settings.emailNotifications}
                    onChange={(value) => handleSettingChange('emailNotifications', value)}
                    icon={Mail}
                  />
                  
                  <SettingToggle
                    label="Push Notifications"
                    description="Get real-time notifications on your device"
                    enabled={settings.pushNotifications}
                    onChange={(value) => handleSettingChange('pushNotifications', value)}
                    icon={Bell}
                  />
                  
                  <SettingToggle
                    label="SMS Notifications"
                    description="Receive critical alerts via text message"
                    enabled={settings.smsNotifications}
                    onChange={(value) => handleSettingChange('smsNotifications', value)}
                    icon={Phone}
                  />
                  
                  <SettingToggle
                    label="Donation Reminders"
                    description="Get reminded when you're eligible to donate again"
                    enabled={settings.donationReminders}
                    onChange={(value) => handleSettingChange('donationReminders', value)}
                    icon={Calendar}
                  />
                  
                  <SettingToggle
                    label="Emergency Alerts"
                    description="Receive urgent blood requests in your area"
                    enabled={settings.emergencyAlerts}
                    onChange={(value) => handleSettingChange('emergencyAlerts', value)}
                    icon={Activity}
                  />
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="card p-6">
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
                  Privacy & Security
                </h3>
                <div className="space-y-4">
                  <SettingToggle
                    label="Privacy Mode"
                    description="Hide your profile from public search results"
                    enabled={settings.privacyMode}
                    onChange={(value) => handleSettingChange('privacyMode', value)}
                    icon={settings.privacyMode ? EyeOff : Eye}
                  />
                  
                  <SettingToggle
                    label="Location Sharing"
                    description="Allow hospitals to see your approximate location"
                    enabled={settings.locationSharing}
                    onChange={(value) => handleSettingChange('locationSharing', value)}
                    icon={MapPin}
                  />
                  
                  <SettingToggle
                    label="Two-Factor Authentication"
                    description="Add an extra layer of security to your account"
                    enabled={settings.twoFactorAuth}
                    onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                    icon={Shield}
                  />
                </div>

                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                    Data Security
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Your data is encrypted and stored securely. We comply with HIPAA regulations and never share your personal information without your consent.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'accessibility' && (
              <div className="card p-6">
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
                  Accessibility Options
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                      Coming Soon
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      We're working on accessibility features including screen reader support, high contrast mode, and keyboard navigation improvements.
                    </p>
                  </div>
                  
                  <div className="space-y-4 opacity-50">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">High Contrast Mode</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Increase contrast for better visibility
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Reduced Motion</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Minimize animations and transitions
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Screen Reader Support</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enhanced compatibility with screen readers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;