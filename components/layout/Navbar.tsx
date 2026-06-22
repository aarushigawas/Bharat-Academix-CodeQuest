'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '/home' },
  { label: 'Crop Planner', href: '/planner' },
  { label: 'Recommendations', href: '/recommendations' },
  { label: 'Market Insights', href: '/market' },
  { label: 'Farm History', href: '/history' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="mx-4 mt-4 rounded-2xl transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.88)'
            : 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(22,163,74,0.14)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.10), 0 1px 0 rgba(22,163,74,0.08)'
            : '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <nav className="flex items-center justify-between px-5 py-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
            >
              🌱
            </div>
            <span
              className="text-gray-900 font-bold text-base tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Agri<span className="text-green-600">Sense</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative px-3.5 py-2 rounded-xl text-sm font-medium transition-colors duration-150 block"
                    style={{ color: active ? '#16a34a' : '#4b5563' }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: 'rgba(22,163,74,0.1)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block flex-shrink-0">
            <Link href="/planner">
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  boxShadow: '0 4px 16px rgba(22,163,74,0.3)',
                }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Plan My Crops
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl"
            style={{ color: '#4b5563' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.div animate={mobileOpen ? 'open' : 'closed'}>
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </motion.div>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="px-4 pb-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                        style={{
                          color: active ? '#16a34a' : '#4b5563',
                          background: active ? 'rgba(22,163,74,0.08)' : 'transparent',
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="mt-2">
                  <Link
                    href="/planner"
                    className="block text-center px-4 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
                  >
                    Plan My Crops
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}