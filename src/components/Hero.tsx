'use client';

import { motion } from 'framer-motion';

// ikonlar
import AppleIcon from '../app/assets/apple.png';
import GoogleIcon from '../app/assets/google.png';
import LuwLogo from '../app/assets/luwlogo.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-20 z-0 overflow-hidden mt-20">
        <div className="flex w-[200%] animate-marquee">
          {[
            "/1.png","/2.png","/3.png","/4.png",
            "/5.png","/6.png","/7.png","/8.png",
            "/9.png","/10.png","/11.png","/12.png",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-96 h-96 md:w-[450px] md:h-[550px] object-cover grayscale rounded-lg mx-3 mt-10"
            />
          ))}
        </div>
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto px-4 text-center z-20"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-black mb-4">
          AI-POWERED
        </h1>
        <h2 className="text-5xl md:text-7xl font-bold text-black mb-6">
          CREATIVE TATTOO
        </h2>
        <h3 className="text-6xl md:text-8xl font-bold text-black mb-8">
          GENERATOR
        </h3>
        
        {/* Minimal Subtext */}
        <p className="text-lg md:text-2xl text-gray-600 mt-4 mb-4">
          Try tattoos on your body in{' '}
          <span className="font-extrabold bg-gradient-to-r from-purple-950 via-gray-300 to-purple-900 bg-clip-text text-transparent animate-text-shimmer">
            real time with your camera
          </span>
        </p>


        {/* Powered by */}
        <p className="text-sm md:text-base text-gray-400 mb-8 flex items-center justify-center gap-2">
          Powered by{' '}
          <a
            href="https://luw.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-black hover:underline hover:decoration-purple-500 transition"
          >
            luw.ai
          </a>
          <img
            src={LuwLogo.src}
            alt="Luw Logo"
            className="h-4 w-4 object-contain"
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
            <img
              src={AppleIcon.src}
              alt="App Store"
              className="w-6 h-6 filter brightness-0 invert"
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
            <img
              src={GoogleIcon.src}
              alt="Google Play"
              className="w-6 h-6 filter brightness-0 invert"
            />
            <span className="font-medium">Get it on Google Play</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
