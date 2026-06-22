'use client';

import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 48 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Floating particles ───────────────────────────────────────────────────────
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? 'rgba(74,222,128,0.6)' : i % 3 === 1 ? 'rgba(22,163,74,0.4)' : 'rgba(255,255,255,0.3)',
          }}
          animate={{
            y: [0, -(Math.random() * 60 + 30), 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
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

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-block text-[11px] font-bold tracking-[0.28em] uppercase mb-4 ${light ? 'text-green-300' : 'text-green-600'}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </span>
  );
}

// ─── Parallax image wrapper ───────────────────────────────────────────────────
function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover scale-110"
      />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function FarmHistoryPage() {
  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/farmer_hands_seedling.jpg')" }}
        />
        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(120deg, rgba(4,21,45,0.93) 0%, rgba(7,31,63,0.82) 55%, rgba(4,21,45,0.6) 100%)',
          }}
        />
        {/* Green glow bottom bleed */}
        <div
          className="absolute bottom-0 left-0 right-0 h-56"
          style={{ background: 'linear-gradient(to top, rgba(22,163,74,0.15), transparent)' }}
        />
        {/* Radial green orb */}
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)',
          }}
        />

        <FloatingParticles />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.p
                variants={fadeUp}
                className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
              >
                Farm History — AgriSense
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-bold text-white leading-[1.04] mb-7"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The Roots of{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #16a34a)' }}
                >
                  Our Future
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-xl text-gray-300 leading-relaxed mb-10 max-w-xl"
                style={{ fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "Every meal we eat begins with a farmer."
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-10 max-w-lg">
                Farming is not merely an industry. It is the oldest story humanity has ever told —
                a saga of survival, ingenuity, and our unbreakable bond with the earth.
              </motion.p>

              <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
                <motion.a
                  href="#history"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white text-[15px]"
                  style={{
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    boxShadow: '0 8px 32px rgba(22,163,74,0.4)',
                  }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore the Story
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Hero image — desktop only decorative frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative"
            >
              <div
                className="absolute -inset-4 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(22,163,74,0.25), rgba(74,222,128,0.08))',
                  filter: 'blur(32px)',
                }}
              />
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(74,222,128,0.2)', height: 480 }}
              >
                <img
                  src="/images/farmer_hands_seedling.jpg"
                  alt="Farmer planting seedling"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(4,21,45,0.5) 0%, transparent 60%)' }}
                />
                <div
                  className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl"
                  style={{
                    background: 'rgba(4,21,45,0.7)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(74,222,128,0.15)',
                  }}
                >
                  <p className="text-green-400 text-xs font-bold tracking-widest uppercase mb-1">Did you know</p>
                  <p className="text-white text-sm leading-relaxed">Agriculture is 10,000 years old — the foundation upon which all civilization was built.</p>
                </div>
              </div>
            </motion.div>
          </div>
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
          SECTION 2 — HISTORY OF FARMING (Timeline)
      ══════════════════════════════════════════════════════ */}
      <section
        id="history"
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #04152d 0%, #071f3f 100%)' }}
      >
        {/* Bleed text decoration */}
        <div
          className="pointer-events-none select-none absolute -top-2 left-0 text-[18vw] font-black leading-none opacity-[0.025] text-white whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          aria-hidden
        >
          HISTORY
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-20">
              <SectionLabel light>10,000 Years of Growth</SectionLabel>
              <h2
                className="text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The History of Farming
              </h2>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
                From the first seeds pressed into fertile soil to satellite-guided tractors —
                farming's story is humanity's most important chapter.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical spine */}
            <div
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(22,163,74,0.4) 10%, rgba(22,163,74,0.4) 90%, transparent)' }}
            />

            {[
              {
                era: '10,000 BCE',
                title: 'The Neolithic Revolution',
                desc: 'Humans transitioned from nomadic hunter-gatherers to settled farmers in the Fertile Crescent. The first crops — wheat, barley, and lentils — were cultivated by hand, marking the birth of civilization itself.',
                icon: '🌾',
                image: '/images/farming_evolution.jpg',
                align: 'left',
              },
              {
                era: '3,000 BCE',
                title: 'Animal-Powered Farming',
                desc: 'Oxen and horses were domesticated to pull plows, dramatically expanding the land that could be farmed. Egyptian, Mesopotamian, and Chinese civilizations built empires on the backs of agricultural surpluses.',
                icon: '🐂',
                image: null,
                align: 'right',
              },
              {
                era: '1800s CE',
                title: 'The Age of Machinery',
                desc: "The Industrial Revolution transformed farming. Mechanical reapers, threshers, and steam-powered plows reduced labor and increased yields. For the first time, one farmer could feed dozens of families.",
                icon: '⚙️',
                image: null,
                align: 'left',
              },
              {
                era: 'Today',
                title: 'Precision & AI Farming',
                desc: 'GPS-guided tractors, drone monitoring, AI-powered recommendations, and satellite imagery have ushered in farming\'s most transformative era. Data is the new soil — and every seed decision is backed by intelligence.',
                icon: '🛰️',
                image: null,
                align: 'right',
              },
            ].map((item, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-60px' });
              return (
                <div key={item.era} className="relative mb-16 lg:mb-20" ref={ref}>
                  {/* Center node */}
                  <motion.div
                    className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full items-center justify-center text-2xl z-10"
                    style={{
                      background: 'linear-gradient(135deg, #16a34a, #15803d)',
                      boxShadow: '0 0 0 8px rgba(22,163,74,0.12), 0 0 32px rgba(22,163,74,0.3)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Card */}
                  <div className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${item.align === 'right' ? 'direction-rtl' : ''}`}>
                    <motion.div
                      className={`${item.align === 'right' ? 'lg:col-start-2' : 'lg:col-start-1'}`}
                      variants={item.align === 'left' ? slideLeft : slideRight}
                      initial="hidden"
                      animate={inView ? 'show' : 'hidden'}
                    >
                      <div
                        className="rounded-2xl p-8"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(74,222,128,0.12)',
                          backdropFilter: 'blur(12px)',
                        }}
                      >
                        <p className="text-green-400 text-xs font-bold tracking-[0.25em] uppercase mb-3">{item.era}</p>
                        <h3
                          className="text-2xl font-bold text-white mb-4"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>

                    {/* Spacer for the other column on desktop */}
                    <div className={`hidden lg:block ${item.align === 'right' ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — WHY FARMING MATTERS
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: '#f8faf5' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image */}
            <AnimatedSection>
              <motion.div
                variants={slideLeft}
                className="relative rounded-3xl overflow-hidden"
                style={{ height: 520 }}
              >
                <ParallaxImage
                  src="/images/farmer_working_field.jpg"
                  alt="Farmer working in field"
                  className="w-full h-full"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(22,163,74,0.2), transparent)' }}
                />
              </motion.div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <SectionLabel>The Pillars of Civilization</SectionLabel>
                <h2
                  className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Why Farming{' '}
                  <span style={{ color: '#16a34a' }}>Matters</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  Farming is not a relic of the past — it is the living infrastructure of
                  human survival. Every economy, every culture, every table traces its origin
                  to soil and the hands that work it.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* 4 Impact Cards */}
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🌍',
                  stat: '8B+',
                  label: 'Food Security',
                  desc: 'Agriculture feeds over 8 billion people across the globe every single day.',
                  color: '#16a34a',
                },
                {
                  icon: '👨‍🌾',
                  stat: '1.3B',
                  label: 'Livelihoods',
                  desc: 'More than 1.3 billion people depend on farming as their primary source of income.',
                  color: '#0ea5e9',
                },
                {
                  icon: '💰',
                  stat: '$3.5T',
                  label: 'Economy',
                  desc: 'Global agriculture contributes trillions to the world economy annually.',
                  color: '#f59e0b',
                },
                {
                  icon: '🌿',
                  stat: '50%',
                  label: 'Environment',
                  desc: 'Farmers manage half of the world\'s habitable land, making them stewards of our ecosystems.',
                  color: '#8b5cf6',
                },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl p-7 flex flex-col gap-4 group"
                  style={{
                    background: `${card.color}08`,
                    border: `1px solid ${card.color}25`,
                  }}
                  whileHover={{ y: -6, boxShadow: `0 20px 48px ${card.color}18`, borderColor: `${card.color}45` }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-3xl">{card.icon}</span>
                  <div>
                    <p
                      className="text-3xl font-bold leading-none"
                      style={{ color: card.color, fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {card.stat}
                    </p>
                    <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: card.color }}>{card.label}</p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — WHAT IF FARMING DISAPPEARED?
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #04152d 0%, #0a0a0a 100%)' }}
      >
        {/* Blood-red glow orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <SectionLabel light>A Warning</SectionLabel>
              <h2
                className="text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                What if farming{' '}
                <span style={{ color: '#ef4444' }}>disappeared?</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
                The consequences would cascade faster than most people imagine.
                This is not a hypothetical — it is a warning about what we risk losing.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '❌', title: 'Food Shortages', desc: 'Within weeks, grocery store shelves would empty as supply chains collapse globally.', severity: 'Critical' },
              { icon: '📈', title: 'Rising Prices', desc: 'The scarcity of food would trigger hyperinflation, making basic nutrition unaffordable.', severity: 'Critical' },
              { icon: '💔', title: 'Mass Hunger', desc: 'Billions would face starvation. Hunger would become the defining crisis of our era.', severity: 'Critical' },
              { icon: '🏭', title: 'Economic Collapse', desc: 'Industries from food processing to logistics to retail would unravel in a chain reaction.', severity: 'Severe' },
              { icon: '🔗', title: 'Supply Chain Breakdown', desc: 'International trade, transport, and packaging industries would grind to a halt.', severity: 'Severe' },
              { icon: '🌍', title: 'Civilizational Crisis', desc: 'Without food, social order fractures. Governments would face collapse. Cities would empty.', severity: 'Existential' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                className="rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  background: 'rgba(220,38,38,0.05)',
                  border: '1px solid rgba(220,38,38,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{
                  background: 'rgba(220,38,38,0.1)',
                  borderColor: 'rgba(220,38,38,0.3)',
                  y: -4,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      background: item.severity === 'Existential' ? 'rgba(220,38,38,0.3)' : item.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: item.severity === 'Existential' ? '#fca5a5' : item.severity === 'Critical' ? '#f87171' : '#fbbf24',
                    }}
                  >
                    {item.severity}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Animated stat bar */}
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="mt-16 rounded-3xl p-10 text-center"
              style={{
                background: 'rgba(220,38,38,0.08)',
                border: '1px solid rgba(220,38,38,0.2)',
              }}
            >
              <p className="text-red-400 text-xs font-bold tracking-[0.25em] uppercase mb-4">The Scale of Dependence</p>
              <p
                className="text-6xl md:text-8xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <AnimatedCounter target={100} suffix="%" />
              </p>
              <p className="text-gray-300 text-xl">of human nutrition depends on farming.</p>
              <p className="text-gray-500 mt-2">There is no alternative. There is no backup plan.</p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — CLIMATE CHANGE & GLOBAL WARMING
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #071f3f 0%, #04152d 100%)' }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(74,222,128,0.3), transparent)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <SectionLabel light>The Climate Emergency</SectionLabel>
                <h2
                  className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Climate Change &{' '}
                  <span style={{ color: '#fb923c' }}>Global Warming</span>
                </h2>
                <p className="text-gray-400 leading-relaxed text-lg mb-6">
                  Farmers are on the front lines of climate change. They did not create this crisis —
                  yet they bear its harshest consequences. Rising temperatures, erratic rainfall,
                  and extreme weather events are rewriting the rulebook on what can grow, and where.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  The crops that fed communities for generations are failing. The seasons farmers
                  relied upon are shifting. And the water that sustains life is disappearing.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div variants={slideRight} className="relative rounded-3xl overflow-hidden" style={{ height: 480 }}>
                <ParallaxImage
                  src="/images/climate_impact_farm.jpg"
                  alt="Climate impact on farming"
                  className="w-full h-full"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(7,31,63,0.7) 0%, transparent 60%)' }}
                />
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Animated stat cards */}
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { stat: '+2°C', label: 'Average Global Warming', desc: 'Temperatures have risen 2°C above pre-industrial levels, with farming regions hit hardest.', icon: '🌡️', color: '#fb923c' },
                { stat: '-30%', label: 'Freshwater Reduction', desc: 'Agricultural water availability has declined 30% in key farming regions due to drought and glacial loss.', icon: '💧', color: '#38bdf8' },
                { stat: '-40%', label: 'Potential Crop Yield Loss', desc: 'Climate models project up to 40% reduction in staple crop yields by 2050 without intervention.', icon: '🌽', color: '#fbbf24' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: `${stat.color}10`,
                    border: `1px solid ${stat.color}25`,
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{ y: -6, boxShadow: `0 20px 48px ${stat.color}15` }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <p
                    className="text-5xl font-bold mb-2"
                    style={{ color: stat.color, fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {stat.stat}
                  </p>
                  <p className="text-white font-semibold mb-3">{stat.label}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Threats grid */}
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: '🔥', label: 'Rising Temperatures' },
                { icon: '🏜️', label: 'Droughts' },
                { icon: '🌊', label: 'Floods' },
                { icon: '⛈️', label: 'Extreme Weather' },
                { icon: '🌱', label: 'Crop Loss' },
                { icon: '🚱', label: 'Water Scarcity' },
              ].map((threat, i) => (
                <motion.div
                  key={threat.label}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  whileHover={{
                    background: 'rgba(251,146,60,0.08)',
                    borderColor: 'rgba(251,146,60,0.2)',
                    y: -3,
                  }}
                >
                  <div className="text-3xl mb-3">{threat.icon}</div>
                  <p className="text-gray-400 text-xs font-semibold leading-snug">{threat.label}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — STORIES FROM THE FIELD
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #f8faf5 100%)' }}
      >
        <div
          className="pointer-events-none select-none absolute top-0 right-0 text-[16vw] font-black leading-none opacity-[0.04] text-green-700 whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          aria-hidden
        >
          STORIES
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <SectionLabel>Voices from the Soil</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Stories from the Field
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
                Behind every harvest is a human story — of perseverance, hope, and the love of land.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Amara Diallo',
                location: 'Mali, West Africa',
                quote: "My grandfather farmed this land with his bare hands. Now I farm it with sensors and AI. But the love for this soil — that never changes.",
                image: '/images/farmer_story_1.jpg',
                crop: 'Sorghum & Millet',
              },
              {
                name: 'Priya Sharma',
                location: 'Punjab, India',
                quote: 'Three years of drought nearly ended us. We changed our crops, adapted our irrigation, and survived. Technology gave us the data. But hope kept us going.',
                image: '/images/farmer_story_2.jpg',
                crop: 'Rice & Wheat',
              },
              {
                name: 'Carlos Mendez',
                location: 'Oaxaca, Mexico',
                quote: "The climate is different now. The rains come later. The heat lasts longer. I worry about what I will leave my children. But I will not stop farming.",
                image: '/images/farmer_story_3.jpg',
                crop: 'Corn & Beans',
              },
            ].map((farmer, i) => (
              <motion.div
                key={farmer.name}
                variants={fadeUp}
                custom={i}
                className="group rounded-3xl overflow-hidden"
                style={{
                  background: '#fff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(22,163,74,0.1)',
                }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 24px 64px rgba(22,163,74,0.12)',
                  borderColor: 'rgba(22,163,74,0.25)',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }}
                  />
                  <div
                    className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(22,163,74,0.9)', color: '#fff' }}
                  >
                    {farmer.crop}
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 leading-relaxed italic mb-6 text-sm">
                    "{farmer.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-gray-900">{farmer.name}</p>
                    <p className="text-green-600 text-xs font-semibold tracking-wide mt-1">📍 {farmer.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — MODERN SOLUTIONS
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #04152d 0%, #071f3f 100%)' }}
      >
        {/* Green glow orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <SectionLabel light>The Future Is Now</SectionLabel>
                <h2
                  className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Modern Solutions for{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #16a34a)' }}
                  >
                    Modern Challenges
                  </span>
                </h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Technology is not replacing the farmer — it is amplifying them. Today's agricultural
                  innovations give every farmer the tools once reserved for the world's largest
                  agribusinesses.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div variants={slideRight} className="relative rounded-3xl overflow-hidden" style={{ height: 400 }}>
                <ParallaxImage
                  src="/images/smart_farming_drone.jpg"
                  alt="Smart farming drone"
                  className="w-full h-full"
                />
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{ boxShadow: 'inset 0 0 60px rgba(22,163,74,0.2)' }}
                />
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Solution cards */}
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🤖', title: 'AI Crop Recommendations', desc: 'Machine learning analyzes soil, climate, and market data to recommend the most profitable and sustainable crops for your land.', glow: '#16a34a' },
                { icon: '💧', title: 'Smart Irrigation', desc: 'Sensor networks and weather data eliminate guesswork, delivering precisely the right amount of water at the right time.', glow: '#38bdf8' },
                { icon: '🎯', title: 'Precision Farming', desc: 'GPS-guided machinery and variable-rate application reduce waste, lower costs, and maximize yield per hectare.', glow: '#a78bfa' },
                { icon: '🚁', title: 'Drone Monitoring', desc: 'Aerial surveillance detects crop stress, disease, and water issues weeks before they become visible to the naked eye.', glow: '#fb923c' },
                { icon: '⛅', title: 'Weather Forecasting', desc: 'Hyper-local weather modeling gives farmers a 14-day window to plan planting, harvesting, and protection.', glow: '#fbbf24' },
                { icon: '📊', title: 'Data Analytics', desc: 'Aggregated farm data reveals patterns across seasons, helping farmers make better decisions every year.', glow: '#4ade80' },
              ].map((solution, i) => (
                <motion.div
                  key={solution.title}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl p-7 flex flex-col gap-4 group"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{
                    background: `${solution.glow}0D`,
                    borderColor: `${solution.glow}30`,
                    y: -5,
                    boxShadow: `0 16px 48px ${solution.glow}15`,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${solution.glow}20`, boxShadow: `0 0 16px ${solution.glow}20` }}
                  >
                    {solution.icon}
                  </div>
                  <h3
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {solution.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{solution.desc}</p>
                  <div
                    className="h-px w-12 mt-auto group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(to right, ${solution.glow}, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — OUR RESPONSIBILITY
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: '#f8faf5' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <SectionLabel>What You Can Do</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-2xl mx-auto"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Shared{' '}
                <span style={{ color: '#16a34a' }}>Responsibility</span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
                Farmers cannot solve the food crisis alone. Society must stand with those who feed it.
                Here is how you can make a difference.
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  number: '01',
                  icon: '🧺',
                  title: 'Support Local Farmers',
                  desc: "Buy from farmers' markets. Choose local produce. Every purchase is a vote for the kind of food system you want to live in.",
                  color: '#16a34a',
                },
                {
                  number: '02',
                  icon: '🍽️',
                  title: 'Reduce Food Waste',
                  desc: 'One-third of all food produced is wasted. Planning meals, storing food correctly, and composting can dramatically reduce this.',
                  color: '#f59e0b',
                },
                {
                  number: '03',
                  icon: '🌱',
                  title: 'Sustainable Consumption',
                  desc: 'Choose sustainably grown food. Opt for seasonal produce. Reduce consumption of resource-intensive foods.',
                  color: '#22c55e',
                },
                {
                  number: '04',
                  icon: '🚿',
                  title: 'Water Conservation',
                  desc: 'Agriculture uses 70% of global freshwater. Conserving water at home creates a ripple effect that reaches farms around the world.',
                  color: '#38bdf8',
                },
                {
                  number: '05',
                  icon: '🤝',
                  title: 'Community Farming',
                  desc: 'Join or support community gardens, CSA programs, and urban farming initiatives that bring food production closer to home.',
                  color: '#8b5cf6',
                },
                {
                  number: '06',
                  icon: '📢',
                  title: 'Advocate for Farmers',
                  desc: "Support fair trade policies, agricultural subsidies for small farmers, and climate action that protects farming communities' futures.",
                  color: '#ec4899',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="relative rounded-2xl p-7 flex flex-col gap-4 group overflow-hidden"
                  style={{
                    background: '#fff',
                    border: `1px solid ${item.color}20`,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: `0 20px 48px ${item.color}14`,
                    borderColor: `${item.color}40`,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Number watermark */}
                  <div
                    className="absolute -top-2 -right-2 text-8xl font-black leading-none opacity-[0.04] select-none"
                    style={{ color: item.color, fontFamily: "'Playfair Display', Georgia, serif" }}
                    aria-hidden
                  >
                    {item.number}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${item.color}12` }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — FUTURE OF FARMING
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #04152d 0%, #071f3f 50%, #04152d 100%)' }}
      >
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/images/future_farming.jpg')" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(4,21,45,0.7) 0%, rgba(7,31,63,0.5) 50%, rgba(4,21,45,0.9) 100%)' }}
        />

        {/* Radial green glow — the signature element */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.18) 0%, transparent 70%)' }}
        />

        <FloatingParticles />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-32 text-center w-full">
          <AnimatedSection>
            <motion.p
              variants={fadeUp}
              className="text-green-400 text-xs font-bold tracking-[0.3em] uppercase mb-8"
            >
              A Hopeful Vision
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mb-10"
            >
              <span
                className="text-7xl md:text-9xl leading-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                🌱
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Farming is not just our past.{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #16a34a)' }}
              >
                It is our future.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto"
            >
              With the right tools, the right knowledge, and the right support — farmers can
              feed a growing world, heal degraded land, and build communities resilient to
              whatever the future holds. That story starts now.
            </motion.p>

            {/* 3 final stats */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
            >
              {[
                { label: 'Farmers Supported by Technology', value: 500, suffix: 'M+' },
                { label: 'Potential Yield Increase with AI', value: 70, suffix: '%' },
                { label: 'Countries with Precision Farming', value: 130, suffix: '+' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl p-7 text-center"
                  style={{
                    background: 'rgba(22,163,74,0.08)',
                    border: '1px solid rgba(74,222,128,0.15)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <p
                    className="text-4xl font-bold text-green-400 mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-400 text-sm leading-snug">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  Start Planning Your Crops
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.span>
              </Link>
              <Link href="/recommendations">
                <motion.span
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold cursor-pointer text-[15px]"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View AI Recommendations
                </motion.span>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}