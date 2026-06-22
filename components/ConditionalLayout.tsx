'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <>
      {!isLanding && <Navbar />}
      <main className={!isLanding ? 'pt-[76px]' : ''}>
        {children}
      </main>
      {!isLanding && <Footer />}
    </>
  );
}