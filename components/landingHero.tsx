'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingHero() {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);

  const handleGetStarted = async () => {
    setTransitioning(true);
    await new Promise((res) => setTimeout(res, 1000));
    router.push('/home');
  };

  return (
    <>
      {/* Transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d1f0f]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Spinner */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-2 border-green-800" />
                <motion.div
                  className="absolute inset-0 rounded-full border-t-2 border-green-400"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                />
              </div>
              <p className="text-green-300 text-sm tracking-[0.2em] uppercase font-light">
                Loading AgriSense
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <motion.div
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        animate={transitioning ? { scale: 1.06, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/mainpg_pic.jpg')" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35" />

        {/* Breathing pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-green-500/10"
              initial={{ width: 180, height: 180, opacity: 0.6 }}
              animate={{ width: 180 + i * 200, height: 180 + i * 200, opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 3.6,
                delay: i * 1.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            className="text-green-400 text-xs tracking-[0.3em] uppercase mb-6 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            AI-Powered Agriculture
          </motion.p>

          {/* Logo text */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-4 leading-none tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Agri<span className="text-green-400">Sense</span>
            <span className="block text-3xl md:text-4xl font-light text-green-200 tracking-widest mt-1">
              AI
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            className="flex items-center justify-center gap-3 my-7"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <div className="h-px w-16 bg-green-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <div className="h-px w-16 bg-green-500/50" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-green-100/80 text-lg md:text-xl font-light leading-relaxed mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            Empowering Farmers Through
            <br />
            <span className="text-white font-medium">AI-Driven Decisions</span>
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={handleGetStarted}
              disabled={transitioning}
              className="relative group overflow-hidden rounded-full px-10 py-4 text-base font-semibold tracking-wide disabled:pointer-events-none"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(74,222,128,0.5)',
                color: '#fff',
                backdropFilter: 'blur(12px)',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Hover fill */}
              <motion.span
                className="absolute inset-0 bg-green-500 rounded-full"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2.5">
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Subtle hint */}
          <motion.p
            className="text-green-500/40 text-xs mt-8 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            Trusted by 10,000+ farmers
          </motion.p>
        </div>

        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1f0f] to-transparent" />
      </motion.div>
    </>
  );
}