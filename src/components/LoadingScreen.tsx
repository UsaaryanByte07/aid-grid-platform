import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Blood Jar Animation */}
        <div className="relative mx-auto mb-8">
          <div className="blood-jar mx-auto">
            <motion.div 
              className="blood-fill"
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
          {/* Jar Cap */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gray-300 rounded-t-lg border-2 border-gray-400"></div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold font-display gradient-text">
            LifeFlow
          </h1>
          <p className="text-gray-600 text-lg">
            Connecting hearts, saving lives
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-primary-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="mt-8 h-1 bg-primary-500 rounded-full mx-auto"
          style={{ maxWidth: '200px' }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;