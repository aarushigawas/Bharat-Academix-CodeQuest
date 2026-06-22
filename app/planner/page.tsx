'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AILoadingScreen from './components/AILoadingScreen';
import type { PlannerFormData } from './types';

// -- Field wrapper ------------------------------------------------------------
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-semibold tracking-[0.12em] uppercase"
        style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// -- Shared input styles ------------------------------------------------------
const inputCls =
  'w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200 placeholder:text-white/25';
const inputStyle = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.1)',
  fontFamily: "'Inter', sans-serif",
};
const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.border = '1px solid rgba(74,222,128,0.55)';
  e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.15)';
};
const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
  e.currentTarget.style.boxShadow = 'none';
};

// -- Main ---------------------------------------------------------------------
export default function PlannerPage() {
  // -- All original state � untouched --
  const [formData, setFormData] = useState<PlannerFormData>({
    location: '',
    soilType: '',
    farmSize: '',
    waterAvailability: '',
    budget: '',
    riskPreference: '',
  });

  const [showLoader, setShowLoader] = useState(false);

  const soilTypes = ['Alluvial', 'Black', 'Red', 'Loamy', 'Sandy', 'Clay'];
  const waterOptions = ['High', 'Medium', 'Low'];
  const riskOptions = ['Low', 'Medium', 'High'];

  // -- Original handleSubmit � only added setShowLoader --
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoader(true); // show loading screen

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      if (!data.response) {
        console.error('No response data received:', data);
        alert('Failed to get recommendation: No response data');
        setShowLoader(false);
        return;
      }

      console.log('FULL DATA:', data);
      console.log('data.response:', data.response);

      localStorage.setItem(
        'recommendation',
        JSON.stringify(data.response)
      );

      console.log('Saved recommendation:');
      console.log(data.response);
      
      // navigation happens in onComplete callback below
    } catch (error) {
      console.error(error);
      alert('Failed to get recommendation');
      setShowLoader(false);
    }
  };

  // Called when loading animation finishes
  const handleLoadComplete = () => {
    window.location.href = '/recommendations';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <>
      {/* Loading screen overlay */}
      <AnimatePresence>{showLoader && <AILoadingScreen onComplete={handleLoadComplete} />}</AnimatePresence>

      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: '#0a1628', fontFamily: "'Inter', sans-serif" }}
      >
        {/* Background blobs */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #16a34a 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">

            {/* -- LEFT: illustration panel -- */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="hidden lg:flex flex-col justify-center gap-8"
            >
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img
                  src="/planner_farmer.png"
                  alt="Farmer in field"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-40"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,22,40,0.95) 0%, transparent 100%)',
                  }}
                />
                {/* Badge */}
                <div
                  className="absolute bottom-6 left-6 right-6 px-5 py-4 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <p
                    className="text-white font-semibold text-sm mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    AI-Powered Precision
                  </p>
                  <p className="text-green-300/70 text-xs leading-relaxed">
                    Soil, water, market & risk � analyzed in seconds to surface your best crop.
                  </p>
                </div>
              </div>

              {/* Trust pills */}
              <div className="flex gap-3 flex-wrap">
                {['?? Location-aware', '?? Soil analysis', '?? Market-linked'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3.5 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(22,163,74,0.12)',
                      border: '1px solid rgba(74,222,128,0.2)',
                      color: '#4ade80',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* -- RIGHT: form panel -- */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
            >
              {/* Header */}
              <div className="mb-8">
                <span
                  className="inline-block text-[11px] font-bold tracking-[0.28em] uppercase text-green-500 mb-3"
                >
                  Crop Planning Assistant
                </span>
                <h1
                  className="text-4xl font-bold text-white mb-3 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  AI Crop Planning
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #16a34a)' }}
                  >
                    Assistant
                  </span>
                </h1>
                <p className="text-white/45 text-sm leading-relaxed max-w-sm">
                  Enter your farm details and let AgriSense AI analyze soil conditions, water availability,
                  risk tolerance, and budget to recommend the most profitable crops.
                </p>
              </div>

              {/* Glass form card */}
              <div
                className="rounded-3xl p-8"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Location */}
                  <Field label="Location">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                      required
                      className={inputCls}
                      style={inputStyle}
                      placeholder="e.g. Punjab, India"
                    />
                  </Field>

                  {/* Soil Type */}
                  <Field label="Soil Type">
                    <select
                      id="soilType"
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleChange}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                      required
                      className={inputCls}
                      style={{ ...inputStyle, appearance: 'none' as const }}
                    >
                      <option value="" style={{ background: '#0d1f10' }}>Select soil type</option>
                      {soilTypes.map((type) => (
                        <option key={type} value={type} style={{ background: '#0d1f10' }}>{type}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Farm Size + Water � 2 col */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Farm Size (acres)">
                      <input
                        type="number"
                        id="farmSize"
                        name="farmSize"
                        value={formData.farmSize}
                        onChange={handleChange}
                        onFocus={inputFocusHandler}
                        onBlur={inputBlurHandler}
                        required
                        min="0.1"
                        step="0.1"
                        className={inputCls}
                        style={inputStyle}
                        placeholder="e.g. 5"
                      />
                    </Field>
                    <Field label="Water Availability">
                      <select
                        id="waterAvailability"
                        name="waterAvailability"
                        value={formData.waterAvailability}
                        onChange={handleChange}
                        onFocus={inputFocusHandler}
                        onBlur={inputBlurHandler}
                        required
                        className={inputCls}
                        style={{ ...inputStyle, appearance: 'none' as const }}
                      >
                        <option value="" style={{ background: '#0d1f10' }}>Select</option>
                        {waterOptions.map((o) => (
                          <option key={o} value={o} style={{ background: '#0d1f10' }}>{o}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Budget + Risk � 2 col */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Budget (INR)">
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={inputFocusHandler}
                        onBlur={inputBlurHandler}
                        required
                        min="1000"
                        step="1000"
                        className={inputCls}
                        style={inputStyle}
                        placeholder="e.g. 50000"
                      />
                    </Field>
                    <Field label="Risk Preference">
                      <select
                        id="riskPreference"
                        name="riskPreference"
                        value={formData.riskPreference}
                        onChange={handleChange}
                        onFocus={inputFocusHandler}
                        onBlur={inputBlurHandler}
                        required
                        className={inputCls}
                        style={{ ...inputStyle, appearance: 'none' as const }}
                      >
                        <option value="" style={{ background: '#0d1f10' }}>Select</option>
                        {riskOptions.map((o) => (
                          <option key={o} value={o} style={{ background: '#0d1f10' }}>{o}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-white text-sm"
                      style={{
                        background: 'linear-gradient(135deg, #16a34a, #15803d)',
                        boxShadow: '0 6px 24px rgba(22,163,74,0.38)',
                      }}
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(22,163,74,0.5)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                      Get Recommendations
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() =>
                        setFormData({
                          location: '',
                          soilType: '',
                          farmSize: '',
                          waterAvailability: '',
                          budget: '',
                          riskPreference: '',
                        })
                      }
                      className="px-5 py-3.5 rounded-xl font-semibold text-sm"
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.55)',
                      }}
                      whileHover={{
                        borderColor: 'rgba(255,255,255,0.35)',
                        color: 'rgba(255,255,255,0.9)',
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Reset
                    </motion.button>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
