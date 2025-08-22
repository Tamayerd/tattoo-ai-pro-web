'use client';

import { motion } from 'framer-motion';

const allFeatures = [
  'Unlimited AI Designs',
  'Unlimited HD Downloads',
  '100+ Tattoo Styles',
  '8K HD Downloads',
  '40 Different Tattoo Fonts',
  '40 Different Tattoo Styles',
  'Enhancer',
  'Background Remover',
  'Priority Processing',
  'No Ads',
  'AI Portrait',
  'Magic Wand AI',
  'Your Story Tattoo',
  'Sketch AI',
  'Tattoo Cover AI',
  'Pet Portrait',
  'Enhance AI',
];

const Features = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Tattoo Pro AI
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the future of tattoo design with our cutting-edge AI technology
          </p>
        </motion.div>

        {/* Özellikler Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {allFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-gray-800 dark:text-gray-100 font-medium text-sm md:text-base">
                {feature}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
