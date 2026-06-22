'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { label: 'Analyzing Soil Conditions', icon: '🌱', duration: 700 },
  { label: 'Evaluating Water Availability', icon: '💧', duration: 800 },
  { label: 'Checking Market Trends', icon: '📈', duration: 900 },
  { label: 'Estimating Profitability', icon: '💰', duration: 700 },
  { label: 'Generating Recommendations', icon: '🤖', duration: 900 },
];

interface Props {
  onComplete: () => void;
}

export default function AILoadingScreen({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepIndex = 0;
    let elapsed = 0;
    const totalDuration = STEPS.reduce((sum, s) => sum + s.duration, 0) + 600;

    // Progress bar ticker
    const progressInterval = setInterval(() => {
      elapsed += 40;
      setProgress(Math.min((elapsed / totalDuration) * 100, 98));
    }, 40);

    // Step sequencer
    const runSteps = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        setCurrentStep(i);
        await new Promise((r) => setTimeout(r, STEPS[i].duration));
        setCompletedSteps((prev) => [...prev, i]);
      }
      await new Promise((r) => setTimeout(r, 600));
      clearInterval(progressInterval);
      setProgress(100);
      await new Promise((r) => setTimeout(r, 300));
      onComplete();
    };

    runSteps();
    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ background: 'rgba(10,22,40,0.97)', backdropFilter: 'blur(8px)' }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/ai_analysis.png')" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-md w-full px-8">

        {/* Rotating AI ring */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#16a34a',
              borderRightColor: '#4ade80',
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
          />
          {/* Middle counter-spin ring */}
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{
              border: '1.5px solid transparent',
              borderTopColor: '#22c55e',
              borderLeftColor: '#16a34a',
              opacity: 0.6,
            }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
          />
          {/* Inner pulse */}
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)' }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <span className="text-2xl">🌾</span>
          </motion.div>
        </div>

        {/* Headline */}
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold text-white mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            AgriSense AI is analyzing your farm
          </motion.h2>
          <motion.p
            className="text-green-400/70 text-sm tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            This takes just a few seconds
          </motion.p>
        </div>

        {/* Steps */}
        <div className="w-full flex flex-col gap-3">
          {STEPS.map((step, i) => {
            const isDone = completedSteps.includes(i);
            const isActive = currentStep === i && !isDone;

            return (
              <motion.div
                key={step.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                style={{
                  background: isDone
                    ? 'rgba(22,163,74,0.12)'
                    : isActive
                    ? 'rgba(255,255,255,0.05)'
                    : 'transparent',
                  border: isDone
                    ? '1px solid rgba(74,222,128,0.25)'
                    : isActive
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid transparent',
                }}
                initial={{ opacity: 0.3, x: -8 }}
                animate={{
                  opacity: isDone || isActive ? 1 : 0.35,
                  x: 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Status icon */}
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {isDone ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 0.9 }}
                    />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                  )}
                </div>

                <span className="text-base">{step.icon}</span>

                <span
                  className="text-sm font-medium"
                  style={{
                    color: isDone ? '#4ade80' : isActive ? '#fff' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 tracking-widest uppercase">Progress</span>
            <span className="text-xs text-green-400 font-mono">{Math.round(progress)}%</span>
          </div>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #16a34a, #4ade80)',
                boxShadow: '0 0 12px rgba(74,222,128,0.5)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}