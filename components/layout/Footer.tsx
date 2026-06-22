import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="py-10 px-6 mt-0"
      style={{
        background: '#0a1628',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
          >
            🌱
          </div>
          <span
            className="text-white font-bold text-sm tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Agri<span className="text-green-400">Sense</span> AI
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { label: 'Home', href: '/home' },
            { label: 'Crop Planner', href: '/planner' },
            { label: 'Recommendations', href: '/recommendations' },
            { label: 'Market', href: '/market' },
            { label: 'History', href: '/history' },
            { label: 'About', href: '/about' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-500 hover:text-green-400 text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} AgriSense AI
        </p>
      </div>
    </footer>
  );
}