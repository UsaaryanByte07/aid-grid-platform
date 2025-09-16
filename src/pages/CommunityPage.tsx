import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Share2,
  Heart,
  MessageCircle,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar,
  MapPin
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const CommunityPage: React.FC = () => {
  const [activeMythIndex, setActiveMythIndex] = useState(0);

  const mythsFacts = [
    {
      myth: "Blood donation makes you weak and tired",
      fact: "Your body replaces the donated blood within 24-48 hours. Most donors feel energized knowing they've helped save lives!",
      details: "The human body contains about 10-12 pints of blood. When you donate 1 pint, your body quickly replenishes the volume with plasma and regenerates red blood cells within weeks."
    },
    {
      myth: "Donating blood is painful and takes too long",
      fact: "Most donors feel only a slight pinch, similar to a routine blood test. The entire process takes just 10-15 minutes.",
      details: "Modern donation techniques and equipment make the process quick and comfortable. The actual blood draw takes only 8-10 minutes."
    },
    {
      myth: "You can get diseases from donating blood",
      fact: "All equipment is sterile and used only once. There's zero risk of infection when donating blood at certified centers.",
      details: "Donation centers follow strict safety protocols. Every needle, tube, and bag is brand new and discarded after single use."
    },
    {
      myth: "People with tattoos can't donate blood",
      fact: "You can donate blood 3 months after getting a tattoo from a licensed, regulated facility using sterile equipment.",
      details: "The waiting period ensures any potential infection has been detected and cleared from your system."
    },
    {
      myth: "Vegetarians can't donate blood due to low iron",
      fact: "Vegetarians can absolutely donate blood! Plant-based diets can provide adequate iron through leafy greens, legumes, and fortified foods.",
      details: "All donors undergo iron level testing before donation. Many vegetarians have excellent iron levels and are regular donors."
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Complete Pre-Donation Nutrition Guide",
      excerpt: "Discover the best foods to eat before donating blood to ensure a smooth and safe donation experience.",
      author: "Dr. Sarah Johnson",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      readTime: "5 min read",
      category: "Health",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop",
      date: "Feb 10, 2024",
      likes: 234,
      comments: 18
    },
    {
      id: 2,
      title: "Recovery and Post-Donation Care Tips",
      excerpt: "Learn how to take care of yourself after donating blood to ensure quick recovery and prepare for your next donation.",
      author: "Nurse Maria Garcia",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      readTime: "4 min read",
      category: "Care",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      date: "Feb 8, 2024",
      likes: 189,
      comments: 12
    },
    {
      id: 3,
      title: "Understanding Blood Types and Compatibility",
      excerpt: "A comprehensive guide to blood types, universal donors, and how blood compatibility affects transfusions.",
      author: "Dr. Michael Chen",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      readTime: "7 min read",
      category: "Education",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      date: "Feb 5, 2024",
      likes: 312,
      comments: 25
    },
    {
      id: 4,
      title: "The Science Behind Blood Storage and Processing",
      excerpt: "Ever wondered what happens to your blood after donation? Learn about the journey from donation to transfusion.",
      author: "Lab Technician Alex Kim",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      readTime: "6 min read",
      category: "Science",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop",
      date: "Feb 3, 2024",
      likes: 156,
      comments: 9
    }
  ];

  const campaigns = [
    {
      id: 1,
      title: "Be a Hero Campaign",
      description: "Join thousands of everyday heroes saving lives through blood donation",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      shares: 1250,
      hashtag: "#BeAHeroToday"
    },
    {
      id: 2,
      title: "One Drop, Multiple Lives",
      description: "Your single donation can save up to three lives. Make the difference today.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      shares: 890,
      hashtag: "#OneDropMultipleLives"
    },
    {
      id: 3,
      title: "Emergency Response Ready",
      description: "Help us maintain emergency blood supplies for critical situations",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
      shares: 673,
      hashtag: "#EmergencyReady"
    }
  ];

  const communityEvents = [
    {
      id: 1,
      title: "Monthly Donor Appreciation Meet",
      date: "2024-02-20",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center Hall",
      attendees: 145,
      type: "Social"
    },
    {
      id: 2,
      title: "Blood Donation Awareness Workshop",
      date: "2024-02-25",
      time: "2:00 PM - 4:00 PM",
      location: "University Auditorium",
      attendees: 89,
      type: "Educational"
    },
    {
      id: 3,
      title: "Volunteer Training Session",
      date: "2024-03-05",
      time: "10:00 AM - 1:00 PM",
      location: "LifeFlow Training Center",
      attendees: 32,
      type: "Training"
    }
  ];

  const nextMyth = () => {
    setActiveMythIndex((prev) => (prev + 1) % mythsFacts.length);
  };

  const prevMyth = () => {
    setActiveMythIndex((prev) => (prev - 1 + mythsFacts.length) % mythsFacts.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Care': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Education': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Science': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Social': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      case 'Educational': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Training': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
            Community & Awareness
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn, share, and grow together in our mission to save lives through blood donation
          </p>
        </motion.div>

        {/* Myths vs Facts Interactive Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white text-center mb-8">
            Myths vs Facts
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="card p-8 text-center min-h-[400px] flex flex-col justify-center">
              <div className="mb-6">
                <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center justify-center space-x-2">
                    <span className="text-2xl">❌</span>
                    <span>Myth</span>
                  </h3>
                  <p className="text-lg">{mythsFacts[activeMythIndex].myth}</p>
                </div>
                
                <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center justify-center space-x-2">
                    <span className="text-2xl">✅</span>
                    <span>Fact</span>
                  </h3>
                  <p className="text-lg mb-4">{mythsFacts[activeMythIndex].fact}</p>
                  <p className="text-sm opacity-75">{mythsFacts[activeMythIndex].details}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={prevMyth}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <div className="flex space-x-2">
                  {mythsFacts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveMythIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeMythIndex ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextMyth}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Blog Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-primary-500" />
              <span>Health & Wellness Blog</span>
            </h2>
            <button className="btn-secondary">
              View All Articles
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="card overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {post.date} • {post.readTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                    <button className="text-primary-500 hover:text-primary-700 font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awareness Campaigns */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white text-center mb-8">
            Awareness Campaigns
          </h2>
          
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            navigation={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="campaign-swiper pb-12"
          >
            {campaigns.map((campaign) => (
              <SwiperSlide key={campaign.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
                >
                  <div className="relative h-80">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold font-display mb-2">
                        {campaign.title}
                      </h3>
                      <p className="text-gray-200 mb-4">
                        {campaign.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span>{campaign.shares}</span>
                          </button>
                          <span className="text-sm opacity-75">{campaign.hashtag}</span>
                        </div>
                        <button className="bg-primary-500 hover:bg-primary-600 px-6 py-2 rounded-full font-medium transition-colors">
                          Share
                        </button>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Community Events */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary-500" />
              <span>Community Events</span>
            </h2>
            <button className="btn-secondary">
              View All Events
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{event.attendees} attending</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="flex-1 btn-primary text-sm">
                    Join Event
                  </button>
                  <button className="btn-ghost p-2">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-8 text-center bg-gradient-to-br from-primary-50 to-red-50 dark:from-primary-900/20 dark:to-red-900/20"
        >
          <Heart className="h-16 w-16 text-primary-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Join Our Community of Lifesavers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with fellow donors, share your experiences, and help us spread awareness about the importance of blood donation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Join Community
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Share Your Story
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;