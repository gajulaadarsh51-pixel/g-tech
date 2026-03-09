import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Shield, Share2, Instagram, Linkedin, Facebook, Youtube, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [techSparkles, setTechSparkles] = useState<Array<{ id: number; left: string; top: string; delay: string; size: number; duration: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Generate tech sparkles
    const newSparkles = [];
    for (let i = 0; i < 50; i++) {
      newSparkles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 3 + 2
      });
    }
    setTechSparkles(newSparkles);
  }, []);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showShareMenu && !(e.target as Element).closest('.share-button')) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showShareMenu]);

  const socialLinks = [
    { 
      Icon: Instagram, 
      href: 'https://instagram.com/gtechcomputer', 
      color: 'hover:bg-pink-600', 
      label: 'Instagram',
      delay: 0
    },
    { 
      Icon: Linkedin, 
      href: 'https://linkedin.com/company/gtech-computer-education', 
      color: 'hover:bg-blue-600', 
      label: 'LinkedIn',
      delay: 0.2
    },
    { 
      Icon: Facebook, 
      href: 'https://facebook.com/gtechcomputer', 
      color: 'hover:bg-blue-700', 
      label: 'Facebook',
      delay: 0.4
    },
    { 
      Icon: Youtube, 
      href: 'https://youtube.com/@gtechcomputer', 
      color: 'hover:bg-red-600', 
      label: 'YouTube',
      delay: 0.6
    },
    { 
      Icon: Github, 
      href: 'https://github.com/gtechcomputer', 
      color: 'hover:bg-gray-800', 
      label: 'GitHub',
      delay: 0.8
    },
    { 
      Icon: Twitter, 
      href: 'https://twitter.com/gtechcomputer', 
      color: 'hover:bg-sky-500', 
      label: 'Twitter',
      delay: 1.0
    },
  ];

  // Function to handle social link click
  const handleSocialClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1120] pt-20 md:pt-0">
      {/* Tech Sparkles Background */}
      {techSparkles.map((sparkle) => (
        <motion.div
          key={`tech-sparkle-${sparkle.id}`}
          className="absolute rounded-full"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            background: sparkle.size > 2 ? '#60a5fa' : '#c084fc',
            boxShadow: sparkle.size > 2 
              ? '0 0 10px rgba(96, 165, 250, 0.6)' 
              : '0 0 10px rgba(192, 132, 252, 0.6)',
          }}
          animate={{
            opacity: [0, 0.4, 0.8, 0.4, 0],
            scale: [0, 1, 1.3, 1, 0],
            y: [0, -10, 0, 10, 0],
            x: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: parseFloat(sparkle.delay),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating gradient orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.15, 0.1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.1, 0.15, 0.1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"
      />

      {/* Circuit line pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L90 10 M10 10 L10 90 M90 10 L90 90 M10 90 L90 90" stroke="white" strokeWidth="0.5" fill="none" />
              <circle cx="10" cy="10" r="2" fill="white" />
              <circle cx="90" cy="10" r="2" fill="white" />
              <circle cx="10" cy="90" r="2" fill="white" />
              <circle cx="90" cy="90" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {/* G-Tech Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-4xl md:text-5xl font-display font-bold text-white">
                G-Tech
              </span>
              <span className="text-sm text-blue-300 font-mono bg-blue-600/20 px-3 py-1.5 rounded-lg border border-blue-500/30">
                &lt;code_lab /&gt;
              </span>
            </motion.div>

            {/* Admissions Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Admissions Open for 2026
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-4"
            >
              <span className="text-white">Launch Your</span>
              <br />
              <span className="gradient-text">Tech Career</span>
              <br />
              <span className="text-white">With Confidence</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-gray-300 mb-8 max-w-lg leading-relaxed"
            >
              Master Python, Java, Power BI and more with industry-expert training at G-Tech Computer Education. Your journey to becoming a tech professional starts here.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link
                to="/courses"
                className="group inline-flex items-center gap-2 gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-600/25 hover:scale-105 transition-all duration-300"
              >
                Explore Courses
              </Link>
              
              <Link
                to="/contact"
                className="group inline-flex items-center bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-blue-500/50 hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Industry Certified</div>
                  <div className="text-xs text-gray-400">Training Programs</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center border border-purple-500/30">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">100% Placement</div>
                  <div className="text-xs text-gray-400">Assistance</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-lg mx-auto"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Terminal */}
              <div className="relative bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                {/* Terminal Header */}
                <div className="flex items-center px-4 py-3 bg-[#1E293B] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-gray-500 ml-4">terminal@G-Tech:~$</span>
                </div>
                
                {/* Terminal Content */}
                <div className="p-6 font-mono">
                  <div className="space-y-4">
                    {/* Prompt */}
                    <div className="text-green-400 text-sm">g-tech@career:~$</div>

                    {/* Command */}
                    <div className="text-blue-400 text-sm flex items-center gap-2">
                      <span className="text-gray-500">$</span>
                      python launch_career.py
                    </div>

                    {/* Progress Items */}
                    <div className="space-y-3 mt-4">
                      {[
                        'Loading Python curriculum...',
                        'Initializing Java modules...',
                        'Setting up Power BI...',
                        'Configuring databases...',
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity, 
                              delay: index * 0.2 
                            }}
                            className="w-1.5 h-1.5 rounded-full bg-blue-400"
                          />
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}

                      {/* Launching Line */}
                      <div className="flex items-center gap-3 text-sm mt-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-2 h-2 border-2 border-yellow-400 border-t-transparent rounded-full"
                        />
                        <span className="text-yellow-400">Launching your future...</span>
                      </div>

                      {/* System Ready */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="text-center mt-6"
                      >
                        <span className="text-green-400 text-sm bg-green-400/10 px-4 py-2 rounded-full border border-green-400/30">
                          System Ready
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Icons - Separate from container to ensure fixed positioning */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 right-4 md:right-8 z-[9999]"
        style={{ pointerEvents: 'auto' }}
      >
        {isMobile ? (
          // Mobile: Grid layout with 3 rows of 2 icons - No tooltips on click
          <div className="grid grid-cols-2 gap-2 bg-[#0B1120]/90 backdrop-blur-md p-2.5 rounded-2xl border border-white/15 shadow-2xl">
            {socialLinks.map(({ Icon, href, color, label, delay }) => (
              <motion.button
                key={label}
                onClick={(e) => handleSocialClick(e, href)}
                className="relative group"
                animate={{ 
                  y: [0, -4, 0],
                }}
                transition={{ 
                  duration: 2,
                  delay: delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="" // Remove title attribute
              >
                <div className={`w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center shadow-xl border border-white/10 ${color} transition-all duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                {/* Glow ring */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: delay }}
                />
              </motion.button>
            ))}
          </div>
        ) : (
          // Desktop: Share Button with Menu
          <div className="share-button relative">
            <motion.button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="relative group"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-600/50 border border-white/20">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              
              {/* Glow ring */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-xl"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Share Menu */}
            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-20 right-0 p-2 bg-[#1E293B] rounded-xl border border-white/10 shadow-2xl min-w-[200px]"
                >
                  <div className="grid grid-cols-3 gap-1">
                    {socialLinks.map(({ Icon, href, color, label }) => (
                      <motion.button
                        key={label}
                        onClick={(e) => handleSocialClick(e, href)}
                        className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors group w-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${color} transition-colors`}>
                          <Icon className="w-4 h-4 text-gray-300 group-hover:text-white" />
                        </div>
                        <span className="text-[8px] text-gray-300 group-hover:text-white">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default HeroSection;