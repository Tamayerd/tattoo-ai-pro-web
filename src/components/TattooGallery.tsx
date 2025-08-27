'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import TattooCard from './TattooCard';
import { getImages } from '../api/server.js';

interface ApiImage {
  id: string;
  url: string;
  title?: string;
  style: string;
  type: 'Image' | 'Font';
}


const TattooGallery = () => {
  const [images, setImages] = useState<ApiImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('🟡 Starting to fetch images...');
        const apiImages = await getImages();
        console.log('🟢 Fetched images:', apiImages);
        console.log('🟢 Images count:', apiImages.length);
        setImages(apiImages);
      } catch (error) {
        console.error('🔴 Failed to fetch images:', error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Infinite scroll animation
  useEffect(() => {
    if (!isLoading && images.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      let animationId: number;
      let isAnimating = true;
      let scrollSpeed = 1; // pixels per frame
      
      console.log('🟡 Starting infinite scroll animation');
      console.log('🟡 Container height:', container.clientHeight);
      console.log('🟡 Scroll height:', container.scrollHeight);
      
      const animate = () => {
        if (container && isAnimating) {
          container.scrollTop += scrollSpeed;
          
          // Reset when reached 1/3 point for seamless loop (since we have 3x content)
          const resetPoint = container.scrollHeight / 3;
          if (container.scrollTop >= resetPoint - 10) {
            console.log('🔄 Resetting scroll position');
            container.scrollTop = 0;
          }
          
          animationId = requestAnimationFrame(animate);
        }
      };
      
      // Start animation immediately for testing
      animationId = requestAnimationFrame(animate);
      
      // Pause on hover
      const handleMouseEnter = () => {
        console.log('🛑 Pausing animation');
        isAnimating = false;
      };
      
      const handleMouseLeave = () => {
        console.log('▶️ Resuming animation');
        isAnimating = true;
        if (!animationId) {
          animationId = requestAnimationFrame(animate);
        }
      };
      
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        console.log('🧹 Cleaning up animation');
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        container?.removeEventListener('mouseenter', handleMouseEnter);
        container?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isLoading, images]);

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
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
    <section id="features" className="py-20 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[80vh]">
          
          {/* Left Side - Info and Filters */}
          <div className="flex flex-col justify-center">
            <div className="relative">
              <motion.h2 
                className="text-6xl md:text-8xl lg:text-9xl font-bebas text-black leading-none"
                style={{ 
                  transform: 'rotate(-1deg) translateX(-10px)',
                  transformOrigin: 'left center'
                }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                TATTOO
              </motion.h2>
              
              <motion.h3 
                className="text-4xl md:text-6xl lg:text-7xl font-playfair italic text-gray-700 ml-8 lg:ml-16 -mt-4"
                style={{ 
                  transform: 'rotate(0.5deg) translateX(20px)',
                }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                Gallery
              </motion.h3>
            </div>
            
            {/* Description */}
            <motion.div 
              className="mt-12 lg:mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                Create your dream tattoo with your own prompts and imagination. 
                Explore <span className="font-bold">40 different artistic styles</span> and 
                <span className="font-bold"> 40 unique fonts</span> for text tattoos.
              </p>
              
              <p className="text-base text-gray-500 mb-8">
                Visualize any tattoo design you can imagine. From traditional artwork 
                to modern typography, bring your creative vision to life with AI.
              </p>

           
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <span className="text-sm text-gray-600">
                  40+ unique designs
                </span>
              </div>
            </motion.div>
          </div>
          
          {/* Right Side - Tattoo Gallery Grid */}
          <div className="flex items-center">
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <div 
                ref={scrollContainerRef}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-scroll scrollbar-hide"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  scrollBehavior: 'auto'
                }}
              >
                {/* Multiple duplicates for seamless infinite scroll */}
                {[...images, ...images, ...images].map((image, index) => (
                  <TattooCard
                    key={`${image.id}-${index}`}
                    imageUrl={image.url}
                    style={image.style}
                    type={image.type}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>

        {/* Floating decorative elements */}
        <motion.div 
          className="fixed top-1/3 left-16 w-2 h-2 bg-pink-500 rounded-full opacity-60 hidden lg:block"
          animate={{
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        
        <motion.div 
          className="fixed top-2/3 right-24 w-1 h-6 bg-purple-500 opacity-40 rotate-45 hidden lg:block"
          animate={{
            rotate: [45, 135, 45],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />
      </div>
    </section>
  );
};

export default TattooGallery;