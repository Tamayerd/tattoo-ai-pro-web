'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';


import image1 from '../../src/app/screenshot/1.png';
import image2 from '../../src/app/screenshot/2.png';
import image3 from '../../src/app/screenshot/3.png';

type Shot = {
  src: any;
  title: string;
  desc: string;
  badges?: string[];
};

const screenshots: Shot[] = [
  {
    src: image1,
    title: 'Idea & Style Selection',
    desc:
      'Choose from 40 tattoo styles and 40 text styles. Start with your idea and instantly generate a unique draft.',
    badges: ['40+ Tattoo Styles', '40 Text Styles', 'Quick Start'],
  },
  {
    src: image2,
    title: 'Body Placement Preview',
    desc:
      'Try your tattoo on realistic body placements. Switch between male and female views, preview on arm, leg, chest, and more.',
    badges: ['Body Placement', 'Male / Female', 'Realistic Preview', '8K Download'],
  },
  {
    src: image3,
    title: 'Advanced AI Tools',
    desc:
      'Enhance your designs in 8K and remove backgrounds with a single account. Use Magic Wand, Sketch AI, and Cover AI for unlimited fine-tuning.',
    badges: ['8K Enhance', 'Background Removal', 'Magic Wand'],
  },
];

const Gallery = () => {
  const [hoverPos, setHoverPos] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { top, height } = e.currentTarget.getBoundingClientRect();
    const y = (e.clientY - top) / height;
    setHoverPos(y);
  };

  const handleMouseLeave = () => setHoverPos(0);

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">

        {/* Yeni Başlık */}
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
          Explore Our Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
          Discover how our app helps you design, preview, and enhance tattoos with cutting-edge AI tools.
        </p>
      </div>

      {/* Screenshots grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {screenshots.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <motion.div
                className="overflow-hidden rounded-2xl shadow-lg relative h-64 md:h-72 lg:h-80 cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={item.src.src}
                  alt={item.title}
                  className="w-full h-auto min-h-full object-cover"
                  style={{ transformOrigin: 'center top' }}
                  animate={{ y: `-${hoverPos * 50}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-black dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                  {item.desc}
                </p>
                {!!item.badges?.length && (
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    {item.badges.map((b) => (
                      <span
                        key={b}
                        className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
