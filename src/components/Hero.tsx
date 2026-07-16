import { useEffect, useRef, useState } from 'react';
import { Plane, MapPin, Calendar, Users, ChevronDown, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const planeProgress = Math.min(scrollY / 600, 1);
  const planeX = -100 + (planeProgress * (typeof window !== 'undefined' ? window.innerWidth + 200 : 1500));

  const stats = [
    { icon: MapPin, value: '150+', label: 'Destinations' },
    { icon: Users, value: '50K+', label: 'Happy Travelers' },
    { icon: Calendar, value: '15+', label: 'Years Experience' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/62623/wing-plane-sky-air-62623.jpeg?auto=compress&cs=tinysrgb&w=1920"
          
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
      </div>

      {/* Animated Plane */}
      <div
        className="absolute pointer-events-none z-20"
        style={{
          top: `${20 + (planeProgress * 60)}%`,
          left: `${planeX}px`,
          transform: `rotate(${8 + (planeProgress * -3)}deg) scale(${1.5 - (planeProgress * 0.3)})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="relative">
          {/* Contrail */}
          <div
            className="absolute right-full top-1/2 -translate-y-1/2"
            style={{
              width: `${Math.max(0, planeProgress * 800)}px`,
              background: 'linear-gradient(to left, rgba(255,255,255,0.6), transparent)',
              height: '3px',
              borderRadius: '2px',
            }}
          />
          <Plane className="w-16 h-16 text-white drop-shadow-2xl" />
        </div>
      </div>

      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              top: `${10 + i * 15}%`,
              left: `${-10 + (i * 5)}%`,
              width: `${200 + (i * 50)}px`,
              height: `${60 + (i * 10)}px`,
              animation: `cloudFloat ${20 + (i * 5)}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div className="w-full h-full bg-white rounded-full blur-xl" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Your Journey Awaits
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up animation-delay-200">
              Explore The{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                  World
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-sky-400/50"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-400">
              Discover breathtaking destinations, create unforgettable memories, and embark on journeys that transform your life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
              <Link
                to="/#tours"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-full shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Journey
                <Plane className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-45 transition-transform" />
              </Link>
              <Link
                to="/vr"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <Headphones className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Try VR Experience</span>
                <span className="relative z-10 px-1.5 py-0.5 bg-cyan-400/20 border border-cyan-400/40 rounded text-cyan-300 text-[10px] font-bold tracking-wider uppercase">New</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in-up animation-delay-800">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center lg:text-left"
                >
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-white/70 mb-1">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Card Preview */}
          <div className="hidden lg:block relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main feature card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-float">
                <img
                  src="https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Bali Paradise"
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-white font-bold text-xl mb-2">Bali Paradise Escape</h3>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Indonesia</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-emerald-400 text-2xl font-bold">₹1,08,000</div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent cards */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-xl animate-float animation-delay-500">
                <span className="text-white font-bold">50+ Tours</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 shadow-xl animate-float animation-delay-1000">
                <span className="text-white font-bold">Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-white/60" />
      </div>

      <style>{`
        @keyframes cloudFloat {
          from { transform: translateX(-100%); }
          to { transform: translateX(calc(100vw + 100%)); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
