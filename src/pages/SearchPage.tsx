import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Heart,
  Hospital,
  Calendar,
  Users,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchType, setSearchType] = useState<'donors' | 'hospitals'>('donors');
  const [filters, setFilters] = useState({
    bloodGroup: '',
    location: '',
    availability: '',
    distance: '10'
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const donors = [
    {
      id: 1,
      name: 'John Smith',
      bloodGroup: 'O+',
      location: 'New York, NY',
      distance: '2.3 km',
      lastDonation: '2023-12-15',
      totalDonations: 12,
      rating: 4.9,
      availability: 'Available',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      verified: true,
      badges: ['Regular Donor', 'Life Saver']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      bloodGroup: 'A+',
      location: 'Brooklyn, NY',
      distance: '4.1 km',
      lastDonation: '2024-01-20',
      totalDonations: 8,
      rating: 4.8,
      availability: 'Available',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      verified: true,
      badges: ['First Time Donor', 'Community Hero']
    },
    {
      id: 3,
      name: 'Michael Chen',
      bloodGroup: 'B+',
      location: 'Manhattan, NY',
      distance: '5.8 km',
      lastDonation: '2024-02-01',
      totalDonations: 15,
      rating: 5.0,
      availability: 'Busy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      verified: true,
      badges: ['Veteran Donor', 'Gold Star']
    },
    {
      id: 4,
      name: 'Emily Davis',
      bloodGroup: 'AB+',
      location: 'Queens, NY',
      distance: '7.2 km',
      lastDonation: '2024-01-10',
      totalDonations: 6,
      rating: 4.7,
      availability: 'Available',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      verified: true,
      badges: ['Rising Star']
    }
  ];

  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Medical Center Dr, New York, NY',
      distance: '1.5 km',
      phone: '+1 (555) 123-4567',
      email: 'blood.bank@citygeneral.com',
      rating: 4.8,
      verified: true,
      specialties: ['Emergency Care', 'Surgery', 'Oncology'],
      availableSlots: [
        { date: '2024-02-15', time: '9:00 AM - 12:00 PM', slots: 8 },
        { date: '2024-02-16', time: '2:00 PM - 5:00 PM', slots: 12 },
        { date: '2024-02-17', time: '10:00 AM - 1:00 PM', slots: 5 }
      ],
      currentNeeds: ['O+', 'A-', 'B+'],
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      name: 'St. Mary Medical Center',
      address: '456 Healthcare Ave, Brooklyn, NY',
      distance: '3.2 km',
      phone: '+1 (555) 234-5678',
      email: 'donations@stmary.org',
      rating: 4.9,
      verified: true,
      specialties: ['Cardiology', 'Pediatrics', 'Maternity'],
      availableSlots: [
        { date: '2024-02-15', time: '8:00 AM - 11:00 AM', slots: 15 },
        { date: '2024-02-18', time: '1:00 PM - 4:00 PM', slots: 10 },
        { date: '2024-02-19', time: '9:00 AM - 12:00 PM', slots: 18 }
      ],
      currentNeeds: ['AB+', 'O-', 'A+'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      name: 'Metro Health Institute',
      address: '789 Wellness Blvd, Manhattan, NY',
      distance: '4.7 km',
      phone: '+1 (555) 345-6789',
      email: 'bloodservice@metrohealth.com',
      rating: 4.6,
      verified: true,
      specialties: ['Trauma Care', 'Blood Disorders', 'Research'],
      availableSlots: [
        { date: '2024-02-16', time: '10:00 AM - 1:00 PM', slots: 6 },
        { date: '2024-02-17', time: '3:00 PM - 6:00 PM', slots: 9 },
        { date: '2024-02-20', time: '8:00 AM - 11:00 AM', slots: 12 }
      ],
      currentNeeds: ['B-', 'AB-', 'O+'],
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop'
    }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = donors.filter(donor => {
    const matchesBloodGroup = !filters.bloodGroup || donor.bloodGroup === filters.bloodGroup;
    const matchesLocation = !filters.location || donor.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesAvailability = !filters.availability || donor.availability === filters.availability;
    const matchesSearch = !searchQuery || donor.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesBloodGroup && matchesLocation && matchesAvailability && matchesSearch;
  });

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesLocation = !filters.location || hospital.address.toLowerCase().includes(filters.location.toLowerCase());
    const matchesSearch = !searchQuery || hospital.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLocation && matchesSearch;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Busy': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Unavailable': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

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
            Find & Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Search for blood donors or hospitals in your area and book appointments easily
          </p>
        </motion.div>

        {/* Search Type Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-sm">
            <button
              onClick={() => setSearchType('donors')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                searchType === 'donors'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span className="font-medium">Find Donors</span>
            </button>
            <button
              onClick={() => setSearchType('hospitals')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                searchType === 'hospitals'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Hospital className="h-5 w-5" />
              <span className="font-medium">Find Hospitals</span>
            </button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <div className="grid md:grid-cols-5 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${searchType}...`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Blood Group Filter (for donors) */}
            {searchType === 'donors' && (
              <select
                value={filters.bloodGroup}
                onChange={(e) => setFilters(prev => ({ ...prev, bloodGroup: e.target.value }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            )}

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Availability Filter (for donors) */}
            {searchType === 'donors' && (
              <select
                value={filters.availability}
                onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Availability</option>
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            )}

            {/* Map Button */}
            <button className="btn-primary flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>View Map</span>
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {searchType === 'donors' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  Available Donors ({filteredDonors.length})
                </h2>
                <button className="btn-ghost flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>More Filters</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredDonors.map((donor, index) => (
                  <motion.div
                    key={donor.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="card p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={donor.avatar}
                          alt={donor.name}
                          className="w-16 h-16 rounded-full"
                        />
                        {donor.verified && (
                          <CheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-green-500 bg-white rounded-full" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                            {donor.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(donor.availability)}`}>
                            {donor.availability}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {donor.bloodGroup}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {donor.distance}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {renderStars(donor.rating)}
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                              {donor.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <span>{donor.totalDonations} donations</span>
                          <span>Last: {new Date(donor.lastDonation).toLocaleDateString()}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {donor.badges.map((badge, badgeIndex) => (
                            <span
                              key={badgeIndex}
                              className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-3">
                          <button className="flex-1 btn-primary text-sm">
                            Contact Donor
                          </button>
                          <button className="btn-secondary text-sm">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  Partner Hospitals ({filteredHospitals.length})
                </h2>
                <button className="btn-ghost flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>More Filters</span>
                </button>
              </div>

              <div className="space-y-6">
                {filteredHospitals.map((hospital, index) => (
                  <motion.div
                    key={hospital.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="card p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Hospital Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-4">
                          <img
                            src={hospital.image}
                            alt={hospital.name}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                                {hospital.name}
                              </h3>
                              {hospital.verified && (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              )}
                            </div>

                            <div className="flex items-center space-x-1 mb-2">
                              {renderStars(hospital.rating)}
                              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                                {hospital.rating} rating
                              </span>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">{hospital.address}</span>
                                <span className="text-sm">({hospital.distance})</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <Phone className="h-4 w-4" />
                                  <span className="text-sm">{hospital.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                  <Mail className="h-4 w-4" />
                                  <span className="text-sm">{hospital.email}</span>
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Specialties:</p>
                              <div className="flex flex-wrap gap-1">
                                {hospital.specialties.map((specialty, specIndex) => (
                                  <span
                                    key={specIndex}
                                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Blood Needs:</p>
                              <div className="flex space-x-2">
                                {hospital.currentNeeds.map((need, needIndex) => (
                                  <span
                                    key={needIndex}
                                    className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-full"
                                  >
                                    {need}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Available Slots */}
                      <div>
                        <h4 className="text-lg font-bold font-display text-gray-900 dark:text-white mb-4">
                          Available Slots
                        </h4>
                        <div className="space-y-3">
                          {hospital.availableSlots.map((slot, slotIndex) => (
                            <div
                              key={slotIndex}
                              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                            >
                              <div className="flex items-center space-x-2 mb-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {new Date(slot.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {slot.time}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                                  <Users className="h-4 w-4" />
                                  <span className="text-sm">{slot.slots} slots</span>
                                </div>
                                <button className="btn-primary text-xs px-3 py-1">
                                  Book
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 space-y-2">
                          <button className="w-full btn-primary">
                            Book Appointment
                          </button>
                          <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                            <ExternalLink className="h-4 w-4" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;