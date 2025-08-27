'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import VideoCarousel from './VideoCarousel';
import { getVideos } from '../api/server.js';

interface ApiVideo {
  id: string;
  url: string;
  title?: string;
}

const AsymmetricVideoGrid = () => {
  const [videos, setVideos] = useState<ApiVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiVideos = await getVideos();
        setVideos(apiVideos.slice(0, 8)); // Limit to 8 videos for layout
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const getAsymmetricLayout = (index: number) => {
    const layouts = [
      // Row 1 - Intentionally unbalanced
      { 
        size: 'large', 
        position: 'col-span-2 row-span-2',
        margin: 'mt-0 ml-0',
        transform: 'translate-x-8',
      },
      { 
        size: 'medium', 
        position: 'col-span-1 row-span-1',
        margin: 'mt-12 ml-4',
        transform: '-translate-x-4',
      },
      { 
        size: 'small', 
        position: 'col-span-1 row-span-1',
        margin: 'mt-24 ml-8',
        transform: 'translate-y-8',
      },
      
      // Row 2 - More chaos
      { 
        size: 'medium', 
        position: 'col-span-1 row-span-1',
        margin: 'mt-8 -ml-4',
        transform: 'rotate-3',
      },
      { 
        size: 'large', 
        position: 'col-span-2 row-span-1',
        margin: 'mt-16 ml-12',
        transform: '-rotate-2 translate-x-4',
      },
      { 
        size: 'small', 
        position: 'col-span-1 row-span-1',
        margin: 'mt-4 ml-2',
        transform: '-translate-y-4',
      },
      
      // Row 3 - Final asymmetry
      { 
        size: 'medium', 
        position: 'col-span-1 row-span-1',
        margin: 'mt-20 ml-16',
        transform: 'rotate-1 translate-x-6',
      },
      { 
        size: 'small', 
        position: 'col-span-1 row-span-1',
        margin: 'mt-8 -ml-8',
        transform: '-rotate-1 -translate-x-2',
      },
    ];

    return layouts[index] || layouts[0];
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'w-96 h-96 md:w-[32rem] md:h-[32rem] lg:w-[40rem] lg:h-[40rem]';
      case 'medium':
        return 'w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]';
      case 'small':
        return 'w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96';
      default:
        return 'w-80 h-80';
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-7xl md:text-9xl font-bebas text-black mb-4 leading-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              LOADING
            </motion.h2>
            <motion.div 
              className="w-16 h-16 mx-auto border-4 border-black border-t-transparent rounded-full animate-spin"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[80vh]">
          
          {/* Left Side - Headers and Info */}
          <div className="flex flex-col justify-center">
            <div className="relative">
              <motion.h2 
                className="text-6xl md:text-8xl lg:text-9xl font-bebas text-black leading-none"
                style={{ 
                  transform: 'rotate(-2deg) translateX(-20px)',
                  transformOrigin: 'left center'
                }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                TATTOO
              </motion.h2>
              
              <motion.h3 
                className="text-4xl md:text-6xl lg:text-7xl font-playfair italic text-gray-700 ml-16 lg:ml-32 -mt-4"
                style={{ 
                  transform: 'rotate(1deg) translateX(40px)',
                }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                Animations
              </motion.h3>
              
              <motion.a
                href="https://app.luw.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-8 right-4 lg:right-20 text-sm font-space-grotesk text-gray-500 hover:text-black rotate-12 transition-colors cursor-pointer"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 12 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 15 }}
              >
                ↗ powered by AI
              </motion.a>
            </div>
            
            {/* Description */}
            <motion.div 
              className="mt-12 lg:mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                We create personalized tattoos just for you. Transform your unique design into a 
                certificated video animation that's exclusively yours. Each video brings extraordinary 
                artistry to life with stunning visual effects.
              </p>
              
              <p className="text-base text-gray-500 mb-8">
                Discover different styles and animations by browsing through our collection. 
                Watch as each design transforms before your eyes with captivating motion.
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white" />
                </div>
                <span className="text-sm text-gray-600">
                  {videos.length}+ unique animations
                </span>
              </div>
            </motion.div>
          </div>
          
          {/* Right Side - Video Carousel */}
          <div className="flex items-center">
            <motion.div 
              className="w-full h-full min-h-[500px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <VideoCarousel videos={videos} />
            </motion.div>
          </div>
          
        </div>

        {/* Floating decorative elements */}
        <motion.div 
          className="fixed top-1/4 left-10 w-2 h-2 bg-purple-500 rounded-full opacity-60 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        
        <motion.div 
          className="fixed top-3/4 right-20 w-1 h-8 bg-black opacity-30 rotate-45 hidden lg:block"
          animate={{
            rotate: [45, 135, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
      </div>
    </section>
  );
};

export default AsymmetricVideoGrid;