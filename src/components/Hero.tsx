'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getVideos } from '../api/server.js';

// ikonlar
import AppleIcon from '../app/assets/apple.png';
import GoogleIcon from '../app/assets/google.png';
import LuwLogo from '../app/assets/luwlogo.png';

interface ApiVideo {
  id: string;
  url: string;
  title?: string;
}


const Hero = () => {
  const [backgroundVideo, setBackgroundVideo] = useState<string>('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [allVideos, setAllVideos] = useState<ApiVideo[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos: ApiVideo[] = await getVideos();
        console.log('Fetched videos:', videos); // Debug log
        if (videos.length > 0) {
          setAllVideos(videos);
          // Start with first video
          const firstVideo = videos[0].url;
          setBackgroundVideo(firstVideo);
          setCurrentVideoIndex(0);
        } else {
          console.log('No videos found'); // Debug log
        }
      } catch (error) {
        console.error('Failed to fetch background videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // Auto-change video every 10 seconds
  useEffect(() => {
    if (allVideos.length > 1) {
      const interval = setInterval(() => {
        setCurrentVideoIndex(prev => {
          // For sequential: (prev + 1) % allVideos.length
          // For random: Math.floor(Math.random() * allVideos.length)
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * allVideos.length);
          } while (nextIndex === prev && allVideos.length > 1); // Avoid same video
          
          setBackgroundVideo(allVideos[nextIndex].url);
          setIsVideoLoaded(false); // Reset loading state for new video
          return nextIndex;
        });
      }, 10000); // Change every 10 seconds

      return () => clearInterval(interval);
    }
  }, [allVideos]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Video */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <video
            key={backgroundVideo} // Force re-render when video changes
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-full object-cover transition-opacity duration-1000"
            onError={(e) => {
              console.log("Video load error:", e);
              console.log("Failed video URL:", backgroundVideo);
            }}
            onLoadedData={() => {
              console.log("Video loaded successfully");
              setIsVideoLoaded(true);
            }}
            onCanPlay={() => {
              console.log("Video can play");
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            <source src={backgroundVideo} type="video/webm" />
            <source src={backgroundVideo} type="video/ogg" />
            Your browser does not support the video tag.
          </video>

          
          {/* Grain effect overlay */}
          <div 
            className="absolute inset-0 pointer-events-none  mix-blend-overlay "
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
              animation: 'grain 0.3s steps(10) infinite'
            }}
          />
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Loading fallback */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-purple-900 z-0" />
      )}

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto px-4 text-center z-20"
      >
        <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bebas text-white mb-4 leading-none tracking-tight drop-shadow-2xl">
          AI-POWERED
        </h1>
        <h2 className="text-7xl md:text-9xl lg:text-[6rem]  font-playfair italic mb-6 -rotate-[4deg] drop-shadow-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse relative z-10">
          Creative Tattoo
        </h2>
        <h3 className="text-6xl md:text-8xl lg:text-9xl font-space-grotesk font-bold text-white mb-8 rotate-1 drop-shadow-2xl">
          GENERATOR
        </h3>

        {/* Minimal Subtext */}
        <p className="text-lg md:text-2xl text-gray-300 mt-4 mb-4 drop-shadow-lg">
          Try tattoos on your body in{' '}
          <span className="font-extrabold bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent animate-text-shimmer">
            real time with your camera  🏆 #1 AI Tattoo Generator
          </span>
        </p>

        {/* Powered by */}
        <p className="text-sm md:text-base text-gray-300 mb-8 flex items-center justify-center gap-2">
          Powered by{' '}
          <a
            href="https://luw.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:underline hover:decoration-purple-400 transition"
          >
            luw.ai
          </a>
          <Image
            src={LuwLogo}
            alt="Luw Logo"
            width={16}
            height={16}
            className="object-contain"
          />
        </p>

        {/* Store Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          {/* App Store */}
          <motion.a
            href="https://apps.apple.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl shadow-lg"
          >
            <Image
              src={AppleIcon}
              alt="App Store"
              width={24}
              height={24}
              className="filter brightness-0 invert"
            />
            <span className="font-medium">Download on the App Store</span>
          </motion.a>

          {/* Google Play */}
          <motion.a
            href="https://play.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl shadow-lg"
          >
            <Image
              src={GoogleIcon}
              alt="Google Play"
              width={24}
              height={24}
              className="filter brightness-0 invert"
            />
            <span className="font-medium">Get it on Google Play</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
