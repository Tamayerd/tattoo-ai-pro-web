'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface GeneratorForm {
  prompt: string;
  style: string;
  size: string;
  placement: string;
}

const styles = [
  'Traditional',
  'Minimalist',
  'Realistic',
  'Geometric',
  'Watercolor',
  'Black & Grey',
  'Neo-Traditional',
  'Japanese',
];

const sizes = ['Small', 'Medium', 'Large'];
const placements = ['Arm', 'Back', 'Chest', 'Leg', 'Shoulder', 'Wrist'];

const Generator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneratorForm>();

  const onSubmit = async () => {
    setIsGenerating(true);
    
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setGeneratedImage('/api/placeholder/400/400');
    setIsGenerating(false);
  };

  return (
    <section id="generate" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Generate Your{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Dream Tattoo
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Describe your vision and let our AI create the perfect design for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="prompt"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Describe your tattoo idea
                  </label>
                  <textarea
                    {...register('prompt', {
                      required: 'Please describe your tattoo idea',
                    })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="e.g., A majestic dragon wrapped around a cherry blossom tree..."
                  />
                  {errors.prompt && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.prompt.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="style"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Style
                    </label>
                    <select
                      {...register('style', { required: 'Please select a style' })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Select style</option>
                      {styles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                    {errors.style && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.style.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="size"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Size
                    </label>
                    <select
                      {...register('size', { required: 'Please select a size' })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Select size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    {errors.size && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.size.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="placement"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Placement
                  </label>
                  <select
                    {...register('placement', { required: 'Please select placement' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select placement</option>
                    {placements.map((placement) => (
                      <option key={placement} value={placement}>
                        {placement}
                      </option>
                    ))}
                  </select>
                  {errors.placement && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.placement.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating...' : 'Generate Tattoo'}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl h-full flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Creating your unique tattoo design...
                  </p>
                </div>
              ) : generatedImage ? (
                <div className="text-center">
                  <div className="w-80 h-80 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Generated tattoo will appear here
                    </p>
                  </div>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Download Design
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-24 h-24 mx-auto mb-4"
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
                  <p>Your generated tattoo will appear here</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Generator;