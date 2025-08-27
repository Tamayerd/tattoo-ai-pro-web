'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';

interface Comment {
  id: string;
  text: string;
  timestamp: Date;
}

interface ApiVideo {
  id: string;
  url: string;
  title?: string;
}

interface VideoCarouselProps {
  videos: ApiVideo[];
}

const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
      
      autoPlayRef.current = setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % (videos.length - 1));
      }, 6000);
    };

    if (!isDragging && videos.length > 2) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex, isDragging, videos.length]);


  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    
    // Prevent text selection
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const x = e.clientX;
    const walk = x - dragStart;
    
    // Change video based on drag direction
    if (Math.abs(walk) > 50) { // Minimum drag distance
      if (walk > 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (walk < 0 && currentIndex < videos.length - 2) {
        setCurrentIndex(prev => prev + 1);
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const x = e.touches[0].clientX;
    const walk = x - dragStart;
    
    // Change video based on swipe direction
    if (Math.abs(walk) > 50) { // Minimum swipe distance
      if (walk > 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (walk < 0 && currentIndex < videos.length - 2) {
        setCurrentIndex(prev => prev + 1);
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleAddComment = (videoId: string, comment: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text: comment,
      timestamp: new Date()
    };
    
    setComments(prev => ({
      ...prev,
      [videoId]: [...(prev[videoId] || []), newComment]
    }));
  };

  const handleDeleteComment = (videoId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [videoId]: (prev[videoId] || []).filter(comment => comment.id !== commentId)
    }));
  };

  return (
    <div className="w-full h-full flex flex-col">

     

      {/* Carousel Container */}
      <div className="flex-1 relative">
        <div
          ref={containerRef}
          className={`
            w-full h-full overflow-hidden scrollbar-hide
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {videos.slice(1).length > 0 && (
            <VideoCard
              key={videos.slice(1)[currentIndex]?.id}
              videoSrc={videos.slice(1)[currentIndex]?.url}
              title={videos.slice(1)[currentIndex]?.title || `Tattoo Animation ${currentIndex + 2}`}
              index={currentIndex + 1}
              isActive={true}
              comments={comments[`video-${currentIndex + 1}`] || []}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
            />
          )}
        </div>
        
      </div>

    
        
    </div>
  );
};

export default VideoCarousel;