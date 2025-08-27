'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Video3DProps {
  videoSrc: string;
  title?: string;
  index: number;
  className?: string;
}

const Video3D = ({ videoSrc, title, index, className }: Video3DProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (videoRef.current) {
              videoRef.current.play();
            }
          } else {
            setIsInView(false);
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const getRandomTransform = () => {
    const rotations = [-8, -5, -3, 0, 3, 5, 8];
    const scales = [0.85, 0.9, 0.95, 1, 1.05];
    
    return {
      rotateY: rotations[index % rotations.length],
      rotateX: rotations[(index + 2) % rotations.length],
      scale: scales[index % scales.length],
    };
  };

  const transform = getRandomTransform();

  return (
    <motion.div
      ref={containerRef}
      className={`relative group perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: "easeOut" 
      }}
    >
      <motion.div
        className="relative transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${transform.rotateY}deg) rotateX(${transform.rotateX}deg) scale(${transform.scale})`,
        }}
        whileHover={{
          rotateY: transform.rotateY + 10,
          rotateX: transform.rotateX - 5,
          scale: transform.scale + 0.05,
          transition: { duration: 0.3 }
        }}
      >
        {/* Direct video container without background */}
        <div className="relative overflow-hidden transform-gpu">
          {/* Loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-white/30 border-t-white rounded-full" />
            </div>
          )}
          
          {/* Video element - full container */}
          <video
            ref={videoRef}
            src={videoSrc}
            className={`w-full aspect-video object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            loop
            playsInline
            onLoadedData={() => setIsLoaded(true)}
            onError={(e) => {
              console.error('Video load error:', e);
              setIsLoaded(true);
            }}
          />
          
          {/* Title overlay */}
          {title && (
            <motion.div 
              className="absolute bottom-4 left-4 right-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-black/70 backdrop-blur-sm rounded px-3 py-2">
                <h3 className="text-sm font-medium text-white font-space-grotesk">
                  {title}
                </h3>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Floating elements for extra depth */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full opacity-60"
        animate={{
          y: [0, -10, 0],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default Video3D;