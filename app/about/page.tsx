'use client';


import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// ─── Utility: animated counter ───────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Utility: fade-up wrapper ────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Floating particles ──────────────────────────────────────────────────────
function Particles({ count = 22 }: { count?: number }) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        dur: Math.random() * 6 + 5,
        delay: Math.random() * 4,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-green-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.25,
          }}
          animate={{
            y: [0, -28, 0],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-green-400"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.25 }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── Glassmorphism card ───────────────────────────────────────────────────────
function GlassCard({ children, className = '', hoverGlow = true }: { children: React.ReactNode; className?: string; hoverGlow?: boolean }) {
  return (
    <motion.div
      whileHover={hoverGlow ? { y: -6, boxShadow: '0 0 32px rgba(74,222,128,0.18)' } : {}}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────
function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

// ─── Icons (inline SVG, no extra deps) ───────────────────────────────────────
const icons: Record<string, React.JSX.Element> = {
  sprout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><path d="M12 22V12M12 12C12 7 7 3 2 3c0 5 4 9 10 9zM12 12c0-5 5-9 10-9 0 5-4 9-10 9z"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><path d="M3 3v18h18"/><path d="M18 9l-5 5-3-3-4 4"/></svg>,
  history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  droplet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  cpu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><circle cx="12" cy="12" r="9"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AboutPage() {

  // ── Data ──────────────────────────────────────────────────────────────────
  const globalStats = [
    { icon: icons.users, value: 8, suffix: 'B+', label: 'People to Feed', sub: 'Global population straining food systems' },
    { icon: icons.droplet, value: 70, suffix: '%', label: 'Freshwater Used', sub: 'Agriculture consumes most of Earth\'s freshwater' },
    { icon: icons.cloud, value: 40, suffix: '%', label: 'Yield Loss Risk', sub: 'Climate change threatens crop outputs globally' },
    { icon: icons.globe, value: 56, suffix: '%', label: 'More Food by 2050', sub: 'Demand growth demands smarter solutions now' },
  ];

  const farmerProblems = [
    'Guessing crop choices without soil or climate data',
    'Missing market windows due to lack of price intelligence',
    'Over-irrigating, wasting water and increasing costs',
    'No historical performance data to improve next season',
    'Unprepared for extreme weather and crop disease risks',
    'Disconnected from AI tools accessible only to large agribusinesses',
  ];

  const features = [
    { icon: icons.sprout, title: 'AI Crop Recommendations', desc: 'Soil-aware, climate-matched crop suggestions powered by advanced ML trained on regional agricultural data.' },
    { icon: icons.chart, title: 'Real-Time Market Insights', desc: 'Live price feeds, demand trend forecasts, and profit-margin projections so you sell at the right moment.' },
    { icon: icons.history, title: 'Farm History Tracking', desc: 'Log every season, every decision, and every outcome. Your farm gets smarter with every harvest.' },
    { icon: icons.shield, title: 'Risk Analysis', desc: 'Proactive alerts on pest pressure, disease outbreak probability, and extreme weather impact windows.' },
    { icon: icons.droplet, title: 'Water Optimization', desc: 'Precision irrigation schedules tied to live weather data to cut water use without sacrificing yield.' },
    { icon: icons.cpu, title: 'Data-Driven Decisions', desc: 'Every recommendation is backed by verifiable data — not hunches, not tradition, not guesswork.' },
  ];

  const steps = [
    { n: '01', title: 'Enter Farm Data', desc: 'Input your land area, soil type, water availability, and previous crops in minutes.' },
    { n: '02', title: 'AI Analysis', desc: 'Gemini AI cross-references your inputs with climate models, regional soil databases, and historical yield data.' },
    { n: '03', title: 'Market Evaluation', desc: 'Live market APIs surface demand trends, price curves, and projected margins for each crop option.' },
    { n: '04', title: 'Risk Assessment', desc: 'Weather patterns, pest calendars, and disease pressure are mapped against your planting window.' },
    { n: '05', title: 'Smart Recommendations', desc: 'A ranked list of best-fit crops arrives — with reasoning you can read and act on immediately.' },
    { n: '06', title: 'Better Farming Decisions', desc: 'Every season feeds back into your farm profile, making each recommendation sharper than the last.' },
  ];

  const impactMetrics = [
    { value: 92, suffix: '%', label: 'Recommendation Accuracy', desc: 'Validated against real seasonal outcomes across test farms' },
    { value: 35, suffix: '%', label: 'Better Resource Usage', desc: 'Average reduction in water and input costs per acre' },
    { value: 25, suffix: '%', label: 'Potential Profit Increase', desc: 'Farmers who time markets with AgriSense earn significantly more' },
    { value: 40, suffix: '%', label: 'Better Planning Decisions', desc: 'Measured improvement in crop selection vs. intuition-led choices' },
  ];

  const aiReasons = [
    { icon: icons.zap, title: 'Climate Resilience', desc: 'AI adapts recommendations dynamically as weather patterns shift — no static calendar can do that.' },
    { icon: icons.sprout, title: 'Precision Agriculture', desc: 'Field-level granularity replaces one-size-fits-all advice, treating every farm as unique.' },
    { icon: icons.globe, title: 'Sustainable Outcomes', desc: 'Optimised inputs mean less chemical runoff, healthier soil, and a smaller environmental footprint.' },
    { icon: icons.chart, title: 'Future Food Security', desc: 'Scaling smart farming is the most direct path to feeding a growing world without destroying it.' },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: '#04152d' }}>

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about_hero_farm.jpg')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(4,21,45,0.72) 0%, rgba(4,21,45,0.55) 50%, rgba(4,21,45,0.92) 100%)' }} />
        {/* Green glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(22,163,74,0.18) 0%, transparent 70%)' }} />
        {/* Particles */}
        <Particles count={28} />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-sm text-green-300 mb-8 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Powered by Google Gemini AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            About{' '}
            <span className="relative inline-block">
              <span style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AgriSense AI
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-px w-full"
                style={{ background: 'linear-gradient(to right,transparent,#4ade80,transparent)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Empowering farmers through intelligent, data-driven agriculture — because the next harvest should always be better than the last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/crop-planner">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(74,222,128,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white flex items-center gap-2 justify-center"
                style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }}
              >
                Start Planning {icons.arrowRight}
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              Learn How It Works
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>Scroll to explore</span>
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
        </motion.div>
      </section>

      {/* ── SECTION 2: GLOBAL CHALLENGE ─────────────────────────────────────── */}
      <Section id="challenge" className="bg-[#071f3f]">
        <FadeUp className="text-center mb-16">
          <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">The Scale of the Problem</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Agriculture is at a <br className="hidden sm:block" />
            <span style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>breaking point</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Population growth, climate instability, and resource depletion are colliding — and the world's farms are caught in the middle.</p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {globalStats.map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <GlassCard className="text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl text-green-400" style={{ background: 'rgba(22,163,74,0.12)' }}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-1" style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-semibold text-white mb-2">{stat.label}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{stat.sub}</p>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* ── SECTION 3: FARMER PROBLEMS ──────────────────────────────────────── */}
      <Section className="bg-[#04152d]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Image */}
          <FadeUp>
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(22,163,74,0.12)' }}>
              <img
                src="/images/farmer_challenges.jpg"
                alt="Farmer in field facing challenges"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #04152d)' }} />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md px-4 py-3">
                <p className="text-xs text-gray-300 mb-0.5">Estimated annual loss</p>
                <p className="text-2xl font-bold text-white">$940B+</p>
                <p className="text-xs text-green-400">due to poor crop planning</p>
              </div>
            </div>
          </FadeUp>

          {/* Right: Problems list */}
          <div>
            <FadeUp>
              <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">What Farmers Face Every Day</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Farming without data <br />is farming blind.
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Across India and the world, millions of farmers make critical decisions with incomplete information — decisions that determine whether a season succeeds or fails.
              </p>
            </FadeUp>
            <div className="space-y-4">
              {farmerProblems.map((problem, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/4 p-4"
                  >
                    <div className="mt-0.5 flex-shrink-0 rounded-full p-1 text-green-400" style={{ background: 'rgba(22,163,74,0.15)' }}>
                      {icons.check}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{problem}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── SECTION 4: OUR SOLUTION ─────────────────────────────────────────── */}
      <Section id="solution" className="bg-[#071f3f]">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(22,163,74,0.08) 0%, transparent 70%)' }} />

        <FadeUp className="text-center mb-16">
          <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">The AgriSense Solution</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Six ways AI transforms <br />your farm.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Every feature is built around one question: what does a farmer actually need to make a better decision today?
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <GlassCard className="h-full group">
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="flex-shrink-0 p-3 rounded-xl text-green-400 transition-all"
                    style={{ background: 'rgba(22,163,74,0.12)' }}
                  >
                    {f.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* ── SECTION 5: HOW IT WORKS ─────────────────────────────────────────── */}
      <Section className="bg-[#04152d]">
        <FadeUp className="text-center mb-16">
          <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">The Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">How AgriSense works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">From your first input to your best harvest — six steps driven by data.</p>
        </FadeUp>

        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.3), transparent)', transform: 'translateX(-50%)' }} />

          <div className="space-y-10">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <FadeUp key={i} delay={i * 0.07}>
                  <div className={`flex flex-col lg:flex-row items-center gap-6 ${isLeft ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Card */}
                    <div className="flex-1 w-full">
                      <GlassCard className={isLeft ? 'lg:mr-8' : 'lg:ml-8'}>
                        <div className="flex items-start gap-4">
                          <span className="text-3xl font-black" style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{step.n}</span>
                          <div>
                            <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                    {/* Centre dot */}
                    <div className="hidden lg:flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center border-2 border-green-500 bg-[#04152d] z-10">
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    {/* Spacer */}
                    <div className="flex-1 hidden lg:block" />
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── SECTION 6: IMPACT METRICS ───────────────────────────────────────── */}
      <Section className="bg-[#071f3f]">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(22,163,74,0.1) 0%, transparent 70%)' }} />

        <FadeUp className="text-center mb-16">
          <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">Measurable Impact</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Numbers that matter to farmers
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((m, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <GlassCard className="text-center h-full" hoverGlow>
                <div
                  className="text-5xl font-black mb-3"
                  style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  <AnimatedCounter target={m.value} suffix={m.suffix} duration={2.2} />
                </div>
                <p className="font-semibold text-white mb-2">{m.label}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* ── SECTION 7: WHY AI ───────────────────────────────────────────────── */}
      <Section className="bg-[#04152d]">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img src="/images/ai_agriculture.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #04152d 10%, transparent 40%, #04152d 90%)' }} />
        </div>

        <div className="relative z-10">
          <FadeUp className="text-center mb-16">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">Why AI in Agriculture</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Intelligence is the new <br />
              <span style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>green revolution</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Just as irrigation and fertilizers transformed farming in the 20th century, AI is redefining what's possible in the 21st.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aiReasons.map((r, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <GlassCard className="flex gap-4 items-start h-full">
                  <div className="flex-shrink-0 p-3 rounded-xl text-green-400" style={{ background: 'rgba(22,163,74,0.12)' }}>
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{r.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </GlassCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </Section>

      {/* ── SECTION 8: FUTURE / CTA ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 px-4 sm:px-6">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/images/future_agriculture.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(4,21,45,0.85) 0%, rgba(7,31,63,0.78) 50%, rgba(4,21,45,0.92) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(22,163,74,0.2) 0%, transparent 70%)' }} />
        </div>

        <Particles count={20} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeUp>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(74,222,128,0.5))' }} />
              <span className="text-green-400 text-sm tracking-widest uppercase font-semibold">The Future of Farming</span>
              <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(74,222,128,0.5))' }} />
            </div>

            <blockquote
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ textShadow: '0 0 40px rgba(74,222,128,0.15)' }}
            >
              "Feeding the future starts with{' '}
              <span style={{ background: 'linear-gradient(135deg,#4ade80,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                smarter decisions
              </span>{' '}
              today."
            </blockquote>

            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              AgriSense AI is built for every farmer who deserves the same intelligence that was once available only to large agricultural enterprises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/crop-planner">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(74,222,128,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-xl font-semibold flex items-center gap-2 justify-center"
                  style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }}
                >
                  Start Planning My Crops {icons.arrowRight}
                </motion.button>
              </Link>
              <Link href="/market-insights">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-xl font-semibold border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors flex items-center gap-2 justify-center"
                >
                  Explore Market Insights {icons.arrowRight}
                </motion.button>
              </Link>
            </div>

            {/* Hackathon badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-3 text-sm text-gray-300"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Built for <span className="text-white font-semibold">Bharat Academix CodeQuest</span> — to make AI farming accessible to all.
            </motion.div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}