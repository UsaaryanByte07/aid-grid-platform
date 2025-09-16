import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Heart, 
  Users, 
  MapPin, 
  Calendar,
  Award,
  Shield,
  Activity,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  X
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const HomePage: React.FC = () => {
  
  const stats = [
    { label: 'Active Donors', value: '150+', icon: Users, color: 'text-blue-500' },
    { label: 'Ongoing Requests', value: '20', icon: Activity, color: 'text-red-500' },
    { label: 'Blood Camps', value: '5', icon: Calendar, color: 'text-green-500' },
    { label: 'Lives Saved', value: '500+', icon: Heart, color: 'text-pink-500' },
  ];

  const whyDonate = [
    {
      icon: Heart,
      title: 'Save Lives',
      description: 'One donation can save up to 3 lives',
      color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
    },
    {
      icon: Shield,
      title: 'Health Check',
      description: 'Free health screening with every donation',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      icon: Award,
      title: 'Community Impact',
      description: 'Be part of a life-saving community',
      color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      icon: Clock,
      title: 'Quick Process',
      description: 'Donation takes only 10-15 minutes',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
    }
  ];

  const upcomingBootcamps = [
    {
      id: 1,
      title: 'City Hospital Blood Drive',
      date: '2024-02-15',
      time: '9:00 AM - 5:00 PM',
      location: 'Downtown Community Center',
      expectedDonors: 150,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'University Blood Camp',
      date: '2024-02-20',
      time: '10:00 AM - 4:00 PM',
      location: 'State University Campus',
      expectedDonors: 200,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Corporate Wellness Drive',
      date: '2024-02-25',
      time: '8:00 AM - 6:00 PM',
      location: 'Tech Park Business Center',
      expectedDonors: 100,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop'
    }
  ];

  const mythsFacts = [
    {
      myth: 'Blood donation makes you weak',
      fact: 'Your body replaces the donated blood within 24-48 hours'
    },
    {
      myth: 'Donating blood is painful',
      fact: 'Most donors feel only a slight pinch, similar to a routine blood test'
    },
    {
      myth: 'You can get diseases from donating',
      fact: 'All equipment is sterile and used only once - completely safe'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900/20 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOWZhZmIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    20 urgent requests nearby
                  </span>
                </motion.div>
                
                <h1 className="text-hero gradient-text leading-tight">
                  Save Lives with a Drop
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                  Connect with those in need. Every donation matters. Join our community of lifesavers.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/login" className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4">
                    <Heart className="h-5 w-5" />
                    <span>Register as Donor</span>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/login" className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-4">
                    <Shield className="h-5 w-5" />
                    <span>Hospital Login</span>
                  </Link>
                </motion.div>
              </div>

              {/* SOS Alert Button */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(239, 68, 68, 0.7)',
                    '0 0 0 10px rgba(239, 68, 68, 0)',
                    '0 0 0 0 rgba(239, 68, 68, 0)'
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="pt-4"
              >
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>EMERGENCY SOS</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
                  alt="Blood donation"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent rounded-3xl"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="font-semibold text-gray-800 dark:text-white">150+ Donors</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-red-500" />
                  <span className="font-semibold text-gray-800 dark:text-white">500+ Lives Saved</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section gradient-text mb-4">
              Why Donate Blood?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your single act of kindness can create a ripple effect of hope and healing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyDonate.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Bootcamps */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section gradient-text mb-4">
              Upcoming Blood Camps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join our organized blood donation drives in your area
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {upcomingBootcamps.map((camp) => (
              <SwiperSlide key={camp.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="card overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={camp.image}
                      alt={camp.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(camp.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                      {camp.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{camp.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{camp.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Expected: {camp.expectedDonors} donors
                      </div>
                      <button className="btn-secondary text-sm">
                        Register
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-red-50 dark:from-gray-900 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section gradient-text mb-4">
              Myths vs Facts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Let's debunk common misconceptions about blood donation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {mythsFacts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-4 mb-4">
                    <h4 className="font-bold mb-2 flex items-center">
                      <X className="h-5 w-5 mr-2" />
                      Myth
                    </h4>
                    <p className="text-sm">{item.myth}</p>
                  </div>
                  
                  <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg p-4">
                    <h4 className="font-bold mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Fact
                    </h4>
                    <p className="text-sm">{item.fact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Ready to Save Lives?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of heroes who are making a difference every day
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login" className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors duration-300">
                  <span>Start Donating</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/impact" className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-primary-600 transition-all duration-300">
                  <Play className="h-5 w-5" />
                  <span>See Our Impact</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;