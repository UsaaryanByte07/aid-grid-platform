import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your LifeFlow assistant. I can help you with donation guidelines, health tips, and navigating our platform. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "Am I eligible to donate?",
    "What should I eat before donating?",
    "How often can I donate?",
    "Find nearest blood bank",
    "Post-donation care tips"
  ];

  const botResponses: { [key: string]: string } = {
    "eligible": "To be eligible for blood donation, you must: be 18-65 years old, weigh at least 50kg, be in good health, not have donated in the last 56 days. Would you like me to check your eligibility?",
    "eat": "Before donating: eat iron-rich foods (spinach, red meat), drink plenty of water, avoid fatty foods, get good sleep. Avoid alcohol 24 hours before donation.",
    "often": "You can donate whole blood every 56 days (8 weeks). Platelet donations can be done every 7 days, up to 24 times per year. Your body needs time to replenish!",
    "find": "I can help you find nearby blood banks! Please share your location or check our Search page for interactive maps.",
    "care": "After donation: rest for 15 minutes, drink fluids, avoid heavy lifting for 24 hours, eat iron-rich foods, watch for any unusual symptoms. Your health is our priority!"
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  // Get smart response based on user input
  const getSmartResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('eligible') || lowerMessage.includes('qualify')) {
      return "To be eligible for blood donation, you must: be 18-65 years old, weigh at least 50kg, be in good health, not have donated in the last 56 days (8 weeks). Are you currently taking any medications or have any health conditions?";
    }
    
    if (lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('before')) {
      return "Before donating: eat iron-rich foods (spinach, red meat, beans), drink plenty of water, avoid fatty/greasy foods, get good sleep. Avoid alcohol 24 hours before donation. A good meal 3-4 hours before is ideal!";
    }
    
    if (lowerMessage.includes('often') || lowerMessage.includes('how much') || lowerMessage.includes('frequency')) {
      return "You can donate whole blood every 56 days (8 weeks). Platelet donations can be done every 7 days, up to 24 times per year. Your body needs time to replenish red blood cells!";
    }
    
    if (lowerMessage.includes('find') || lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('bank')) {
      return "You can find nearby blood banks using our Search page! Click on 'Search' in the navigation menu to see interactive maps with verified blood banks and hospitals near you.";
    }
    
    if (lowerMessage.includes('after') || lowerMessage.includes('care') || lowerMessage.includes('post')) {
      return "After donation: rest for 15 minutes, drink lots of fluids, avoid heavy lifting for 24 hours, eat iron-rich foods, watch for dizziness. If you feel unwell, contact us immediately!";
    }

    if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('join')) {
      return "To register as a donor, click 'Register as Donor' on our homepage! You'll need to provide basic info, health details, and verify your email. It takes just 2-3 minutes!";
    }

    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('sos')) {
      return "For medical emergencies requiring immediate blood, click the red 'EMERGENCY SOS' button on our homepage. This will alert nearby verified donors and hospitals instantly!";
    }

    if (lowerMessage.includes('types') || lowerMessage.includes('blood group') || lowerMessage.includes('compatibility')) {
      return "Blood types: O- (universal donor), AB+ (universal recipient). O and A are most needed. Your blood type is determined during first donation. All types are valuable!";
    }

    if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('long')) {
      return "The donation process takes about 45-60 minutes total: registration (10 min), health screening (15 min), actual donation (8-10 min), rest/refreshments (15 min). The needle part is quick!";
    }

    // Default helpful response
    return "I'm here to help with blood donation questions! I can assist you with eligibility requirements, preparation tips, finding blood banks, post-donation care, registration process, and emergency procedures. What would you like to know?";
  };

  // Unified send handler for both input and quick replies
  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText !== undefined ? overrideText : inputText;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Add a delay to make it feel more natural
    setTimeout(async () => {
      try {
        // Try AI service first
        const res = await fetch("http://localhost:5500/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: textToSend }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.reply && !data.reply.includes("error") && data.reply.length > 10) {
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: data.reply,
              isBot: true,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
            return;
          }
        }
        
        // Fallback to smart local responses
        throw new Error("AI service unavailable or poor response");
        
      } catch (err) {
        // Use smart local response system
        const smartResponse = getSmartResponse(textToSend);
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: smartResponse,
          isBot: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 1000); // 1 second delay for natural feel
  };

  // Quick reply handler uses handleSend with override
  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Bot className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: isMinimized ? 0.8 : 1, 
              y: 0,
              height: isMinimized ? '60px' : '520px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
            style={{ height: isMinimized ? '60px' : '520px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="h-8 w-8" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold">LifeFlow Assistant</h3>
                  <p className="text-xs text-primary-100">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-xs p-3 rounded-2xl ${
                          message.isBot 
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                            : 'bg-primary-500 text-white'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.isBot ? 'text-gray-500 dark:text-gray-400' : 'text-primary-100'
                          }`}>
                            {message.timestamp instanceof Date
                              ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length <= 2 && (
                  <div className="px-4 pb-2 flex-shrink-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input - Always Visible at Bottom */}
                <div className="flex-shrink-0 p-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!inputText.trim()}
                      className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;