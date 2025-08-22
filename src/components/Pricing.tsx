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

const pricingPlans = [
  {
    name: 'Daily',
    price: '$1.99',
    period: '/day',
    description: 'Try it out',
    popular: false,
    features: allFeatures
  },
  {
    name: 'Weekly',
    price: '$4.99',
    period: '/week',
    description: 'Perfect for projects',
    popular: true,
    features: allFeatures
  },
  {
    name: 'Monthly',
    price: '$14.99',
    period: '/month',
    description: 'Best value for creators',
    popular: false,
    save: '70%',
    features: allFeatures
  }
];


const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create unlimited tattoo designs with AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access all premium features and unlimited creative possibilities
          </p>
        </motion.div>

        {/* Premium Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-3xl p-8 mb-16 border border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Unlimited AI Designs</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  100+ Tattoo Styles
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  40 Different Tattoo Fonts
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  40 Different Tattoo Styles
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Priority Processing
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Unlimited HD Downloads</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  8K HD Downloads
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Enhancer
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Background Remover
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  No Ads
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Choose Your Plan
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-white bg-white text-black'
                    : 'border-gray-700 bg-gray-900 text-white hover:border-gray-600'
                }`}
              >
                {plan.save && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      SAVE {plan.save}
                    </div>
                  </div>
                )}
                
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">
                      POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                  <p className={`text-sm mb-4 ${plan.popular ? 'text-gray-600' : 'text-gray-400'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-lg ml-1 ${plan.popular ? 'text-gray-600' : 'text-gray-400'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-3 ${
                        plan.popular ? 'bg-black' : 'bg-white'
                      }`}></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

               <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                plan.popular
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              Get Started
            </button>

              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-8">
            All plans include unlimited AI-powered tattoo generation and access to our complete style library.
          </p>
          
          <div className="pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-500">
  © 2024 Tattoo Pro AI. All rights reserved. |{" "}
  <a
    href="https://app.luw.ai/docs/privacy"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:decoration-purple-500"
  >
    Privacy Policy
  </a>{" "}
  |{" "}
  <a
    href="https://app.luw.ai/docs/terms"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:decoration-purple-500"
  >
    Terms of Service
  </a>
</p>


          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;