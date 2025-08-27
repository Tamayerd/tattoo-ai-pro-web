'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TattooCardProps {
  imageUrl: string;
  style: string;
  type: 'Image' | 'Font';
  index: number;
}

const TattooCard = ({ imageUrl, style, type, index }: TattooCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="aspect-[3/4] bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Image */}
        <img
          src={imageUrl}
          alt={`${style} ${type.toLowerCase()}`}
          className={`w-full aspect-[3/4] object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Content Overlay */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
        >
         
        </motion.div>
        
       
        
        {/* Hover Effect Ring */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-purple-400"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 1.05 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      
    </motion.div>
  );
};

export default TattooCard;