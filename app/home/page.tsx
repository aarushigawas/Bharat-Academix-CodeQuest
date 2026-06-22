'use client';

import Link from 'next/link';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[11px] font-bold tracking-[0.28em] uppercase text-green-600 mb-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </span>
  );
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });

  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center" id="hero">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/homepg.jpg')" }}
        />
        {/* Directional overlay: dark left, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 50%, rgba(10,22,40,0.45) 100%)',
          }}
        />
        {/* Green bleed from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to top, rgba(22,163,74,0.12), transparent)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            >
              AI-Powered Agriculture Platform
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold text-white leading-[1.04] mb-7"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Empowering Farmers{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #16a34a)' }}
              >
                Through AI
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-300 leading-relaxed mb-10 max-w-xl"
            >
              Make smarter farming decisions using AI-powered crop recommendations, market insights,
              and data-driven agricultural guidance.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/planner">
                <motion.span
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white cursor-pointer text-[15px]"
                  style={{
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    boxShadow: '0 8px 32px rgba(22,163,74,0.4)',
                  }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Crop Planning
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.span>
              </Link>
              <a href="#features">
                <motion.span
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold cursor-pointer text-[15px]"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{ scale: 1.04, y: -2, backgroundColor: 'rgba(255,255,255,0.14)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Features
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-green-400 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — WHY FARMING MATTERS
          Signature: giant bleed numbers behind cards (editorial)
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: '#0a1628' }}
      >
        {/* Decorative bleed text */}
        <div
          className="pointer-events-none select-none absolute -top-4 left-0 text-[22vw] font-black leading-none opacity-[0.03] text-white whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          aria-hidden
        >
          FARMING
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-16">
              <SectionLabel>Why It Matters</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Agriculture feeds the world.
                <br />
                <span className="text-green-400">Data helps it thrive.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🌍',
                  stat: '8B+',
                  label: 'People Fed',
                  body: 'Agriculture is the foundation of human civilization — every meal traces back to a farmer\'s decision.',
                },
                {
                  icon: '💰',
                  stat: '$3.5T',
                  label: 'Global Value',
                  body: 'Farming supports economies worldwide, from small subsistence holdings to large commercial operations.',
                },
                {
                  icon: '⚡',
                  stat: '3 Key',
                  label: 'Challenges',
                  body: 'Market volatility, changing climate, and resource scarcity are compressing farmer margins every season.',
                },
                {
                  icon: '🤖',
                  stat: 'AI',
                  label: 'The Solution',
                  body: 'Technology gives every farmer access to the same data-driven decisions once reserved for large agri-corps.',
                },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  variants={fadeUp}
                  custom={i}
                  className="relative rounded-2xl p-7 flex flex-col gap-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{
                    background: 'rgba(22,163,74,0.08)',
                    borderColor: 'rgba(74,222,128,0.25)',
                    y: -4,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-3xl">{card.icon}</span>
                  <div>
                    <p
                      className="text-3xl font-bold text-green-400 leading-none"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {card.stat}
                    </p>
                    <p className="text-xs font-semibold tracking-widest uppercase text-green-600 mt-1">
                      {card.label}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — HOW AGRISENSE AI HELPS
      ══════════════════════════════════════════════════════ */}
      <section
        id="features"
        className="py-28"
        style={{ background: '#f8faf5' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <SectionLabel>Platform Features</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                How AgriSense AI helps farmers
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🗓',
                  title: 'Crop Planner',
                  desc: 'Analyze soil type, farm size, budget, location, and risk preference to identify the most suitable crops for your land.',
                  cta: 'Go To Crop Planner',
                  href: '/planner',
                  accent: '#16a34a',
                  bg: 'rgba(22,163,74,0.06)',
                },
                {
                  icon: '🤖',
                  title: 'AI Crop Recommendations',
                  desc: 'Receive personalized crop recommendations and understand exactly why specific crops suit your farm conditions.',
                  cta: 'View Recommendations',
                  href: '/recommendations',
                  accent: '#0ea5e9',
                  bg: 'rgba(14,165,233,0.06)',
                },
                {
                  icon: '📈',
                  title: 'Market Insights',
                  desc: 'Track commodity prices, demand trends, and profitability opportunities to sell at the right time for the right price.',
                  cta: 'View Market Insights',
                  href: '/market',
                  accent: '#f59e0b',
                  bg: 'rgba(245,158,11,0.06)',
                },
                {
                  icon: '📋',
                  title: 'Farm History',
                  desc: 'Maintain complete records and review previous farming activities, recommendations, and outcomes season by season.',
                  cta: 'View Farm History',
                  href: '/history',
                  accent: '#8b5cf6',
                  bg: 'rgba(139,92,246,0.06)',
                },
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl p-8 flex flex-col gap-5 group"
                  style={{
                    background: feat.bg,
                    border: `1px solid ${feat.accent}20`,
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: `0 20px 48px ${feat.accent}18`,
                    borderColor: `${feat.accent}45`,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${feat.accent}15` }}
                    >
                      {feat.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feat.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link href={feat.href}>
                      <motion.span
                        className="inline-flex items-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 cursor-pointer"
                        style={{
                          color: feat.accent,
                          background: `${feat.accent}12`,
                          border: `1px solid ${feat.accent}25`,
                        }}
                        whileHover={{ scale: 1.03, background: `${feat.accent}22` }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {feat.cta}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — HOW IT WORKS (animated timeline)
      ══════════════════════════════════════════════════════ */}
      <section className="py-28" style={{ background: '#0a1628' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={timelineRef}>
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-20">
              <SectionLabel>The Process</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-bold text-white max-w-xl mx-auto leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                From field to decision in four steps
              </h2>
            </motion.div>
          </AnimatedSection>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            {/* Track line */}
            <div
              className="absolute top-8 left-[10%] right-[10%] h-px"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
            {/* Animated fill */}
            <motion.div
              className="absolute top-8 left-[10%] h-px"
              style={{ background: 'linear-gradient(90deg, #16a34a, #4ade80)' }}
              initial={{ width: '0%' }}
              animate={timelineInView ? { width: '80%' } : { width: '0%' }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="grid grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Enter Farm Information', desc: 'Location, soil type, size, budget, and risk tolerance.', icon: '📍' },
                { step: '2', title: 'AI Analyzes Farm Conditions', desc: 'Cross-reference with climate data, soil science, and market trends.', icon: '🧠' },
                { step: '3', title: 'Receive Crop Recommendations', desc: 'Ranked crop suggestions with yield forecasts and risk scores.', icon: '📊' },
                { step: '4', title: 'Make Better Farming Decisions', desc: 'Act with confidence backed by data, not guesswork.', icon: '✅' },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  animate={timelineInView ? 'show' : 'hidden'}
                  className="flex flex-col items-center text-center gap-5"
                >
                  {/* Node */}
                  <motion.div
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: '0 0 0 6px rgba(22,163,74,0.15)' }}
                    initial={{ scale: 0 }}
                    animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                  >
                    {s.icon}
                  </motion.div>
                  <div>
                    <p
                      className="text-[10px] font-bold tracking-[0.25em] text-green-500 uppercase mb-2"
                    >
                      Step {s.step}
                    </p>
                    <h3 className="text-white font-semibold text-base mb-2 leading-snug">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile timeline — vertical */}
          <div className="md:hidden flex flex-col gap-0">
            {[
              { step: '1', title: 'Enter Farm Information', desc: 'Location, soil type, size, budget, and risk tolerance.', icon: '📍' },
              { step: '2', title: 'AI Analyzes Farm Conditions', desc: 'Cross-reference with climate data, soil science, and market trends.', icon: '🧠' },
              { step: '3', title: 'Receive Crop Recommendations', desc: 'Ranked crop suggestions with yield forecasts and risk scores.', icon: '📊' },
              { step: '4', title: 'Make Better Farming Decisions', desc: 'Act with confidence backed by data, not guesswork.', icon: '✅' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate={timelineInView ? 'show' : 'hidden'}
                className="flex gap-5 pb-10 last:pb-0"
              >
                {/* Spine */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: '0 0 0 4px rgba(22,163,74,0.15)' }}
                  >
                    {s.icon}
                  </div>
                  {i < 3 && <div className="w-px flex-1 mt-3" style={{ background: 'rgba(22,163,74,0.2)' }} />}
                </div>
                <div className="pb-2 pt-1">
                  <p className="text-[10px] font-bold tracking-[0.25em] text-green-500 uppercase mb-1.5">Step {s.step}</p>
                  <h3 className="text-white font-semibold text-base mb-1.5">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: '#f8faf5' }}>
        <AnimatedSection>
          <motion.div
            variants={fadeUp}
            className="max-w-3xl mx-auto rounded-3xl overflow-hidden relative text-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 45%, #065f46 100%)',
              boxShadow: '0 32px 80px rgba(22,163,74,0.28)',
            }}
          >
            {/* Dot grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <div className="relative z-10">
              <p className="text-green-300 text-xs font-bold tracking-[0.3em] uppercase mb-5">
                Get Started Today
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Ready to improve your farming decisions?
              </h2>
              <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Use AgriSense AI to discover suitable crops, understand recommendations, and make
                data-driven agricultural decisions.
              </p>
              <Link href="/planner">
                <motion.span
                  className="inline-flex items-center gap-2.5 bg-white text-green-800 font-bold px-10 py-4 rounded-xl cursor-pointer text-[15px]"
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Planning
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

    </div>
  );
}