import { useEffect, useState } from 'react';
import { Zap, Clock, ArrowRight } from 'lucide-react';

const taglines = [
  { question: 'Stuck with the same old tour operator?', answer: 'We do things differently.' },
  { question: 'Still waiting weeks for an itinerary?', answer: 'Get yours in 10 days — guaranteed.' },
  { question: 'Tired of cookie-cutter packages?', answer: 'Every journey is built just for you.' },
  { question: 'Paying too much for too little?', answer: 'Premium experiences, honest prices.' },
];

const tickerItems = [
  'Bored with Traditional Tour Operators?',
  'Something New is Coming in 10 Days',
  'Say Goodbye to Cookie-Cutter Packages',
  'Your Dream Itinerary — Built in 10 Days',
  'Real Destinations. Real Experiences. Zero Compromises.',
  'The Future of Travel is Here',
];

export default function CatchyBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % taglines.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const active = taglines[activeIndex];

  return (
    <div className="relative overflow-hidden">
      {/* Ticker strip */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 py-2.5 overflow-hidden">
        <div className="ticker-track flex gap-16 whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-white text-sm font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 bg-sky-300 rounded-full flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Challenge section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/15 border border-sky-500/30 rounded-full text-sky-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Zap className="w-3.5 h-3.5" />
            Why Choose Us
          </div>

          {/* Rotating tagline */}
          <div className="min-h-[110px] flex flex-col items-center justify-center mb-6">
            <p
              className="text-2xl sm:text-3xl text-white/50 font-light mb-3 transition-all duration-400"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-12px)' }}
            >
              {active.question}
            </p>
            <h2
              className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent leading-tight transition-all duration-400"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
            >
              {active.answer}
            </h2>
          </div>

          {/* Static bold statement */}
          <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: Clock,
                headline: '10-Day Promise',
                sub: 'Your complete custom itinerary — planned, priced, and ready — in just 10 days.',
                color: '#38bdf8',
              },
              {
                icon: Zap,
                headline: 'Zero Generic Tours',
                sub: 'We craft every journey from scratch. No off-the-shelf packages. Ever.',
                color: '#22d3ee',
              },
              {
                icon: ArrowRight,
                headline: 'You Lead, We Plan',
                sub: 'Tell us where your heart wants to go. We handle every detail.',
                color: '#60a5fa',
              },
            ].map(({ icon: Icon, headline, sub, color }) => (
              <div
                key={headline}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{headline}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <p className="mt-12 text-white/40 text-lg font-light">
            Bored with traditional tour operators?{' '}
            <span className="text-sky-400 font-semibold">
              Something new is just 10 days away.
            </span>
          </p>
        </div>
      </div>

      <style>{`
        .ticker-track {
          animation: ticker 30s linear infinite;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .duration-400 {
          transition-duration: 400ms;
        }
      `}</style>
    </div>
  );
}
