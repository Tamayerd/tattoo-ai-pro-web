'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const tattooImages = [
  {
    id: 1,
    title: 'Dragon & Cherry Blossom',
    style: 'Japanese',
    category: 'Traditional',
    description: 'A majestic dragon intertwined with delicate cherry blossoms',
  },
  {
    id: 2,
    title: 'Geometric Wolf',
    style: 'Geometric',
    category: 'Modern',
    description: 'Abstract geometric representation of a wolf head',
  },
  {
    id: 3,
    title: 'Minimalist Mountain',
    style: 'Minimalist',
    category: 'Nature',
    description: 'Simple line art depicting mountain silhouettes',
  },
];

const categories = ['All', 'Traditional', 'Modern', 'Nature'];

const GalleryGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = tattooImages.filter(
    (image) => selectedCategory === 'All' || image.category === selectedCategory
  );

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tattoo{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore thousands of unique AI-generated tattoo designs for
            inspiration
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm">Tattoo Design</p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {image.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                      {image.style}
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;