'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Comment {
  id: string;
  text: string;
  timestamp: Date;
}

interface VideoCardProps {
  videoSrc: string;
  title: string;
  index: number;
  isActive?: boolean;
  comments?: Comment[];
  onAddComment?: (videoId: string, comment: string) => void;
  onDeleteComment?: (videoId: string, commentId: string) => void;
}

const VideoCard = ({ 
  videoSrc, 
  title, 
  index, 
  isActive = false, 
  comments = [], 
  onAddComment,
  onDeleteComment 
}: VideoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newComment, setNewComment] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoId = `video-${index}`;

  useEffect(() => {
    if (isActive && videoRef.current && isLoaded) {
      videoRef.current.play().catch(err => {
        console.log('Video play failed:', err);
      });
      setIsPlaying(true);
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, isLoaded]);

  const handleAddComment = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(videoId, newComment.trim());
      setNewComment('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <motion.div
      className="flex-shrink-0 group cursor-grab active:cursor-grabbing w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Video Container - No background */}
      <div className="relative w-full">
        {/* Video Element */}
        <div className="bg-black overflow-hidden relative w-full rounded-xl" style={{ height: '700px' }}>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 rounded-full" />
            </div>
          )}
          
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            onLoadedData={() => setIsLoaded(true)}
            onError={(e) => {
              console.error('Video load error:', e);
              setIsLoaded(true);
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play indicator */}
          {!isPlaying && isLoaded && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-0 h-0 border-l-8 border-l-white border-y-4 border-y-transparent ml-1"></div>
              </div>
            </div>
          )}
          
         
        </div>
        
        

       
      </div>
    </motion.div>
  );
};

export default VideoCard;