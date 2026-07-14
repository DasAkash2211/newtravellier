import { useEffect, useRef, useState } from 'react';

const countries = [
  { code: 'US', name: 'USA', flag: '🇺🇸' },
  { code: 'GB', name: 'UK', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
];

export default function CountryFlags() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-4">
            Global Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Explore the World
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From tropical paradises to ancient wonders, we connect you to destinations across every continent.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-slate-900 z-10 pointer-events-none" />

          {/* First Row - Left to Right */}
          <div
            className={`flex gap-6 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              animation: isVisible ? 'marqueeLeft 30s linear infinite' : 'none',
            }}
          >
            {[...countries.slice(0, 25), ...countries.slice(0, 25)].map((country, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 min-w-[100px]">
                  <span className="text-4xl mb-2 transform group-hover:scale-125 transition-transform duration-300">
                    {country.flag}
                  </span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 text-center">
                    {country.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - Right to Left */}
          <div
            className={`flex gap-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              animation: isVisible ? 'marqueeRight 35s linear infinite' : 'none',
            }}
          >
            {[...countries.slice(25), ...countries.slice(25)].map((country, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 min-w-[100px]">
                  <span className="text-4xl mb-2 transform group-hover:scale-125 transition-transform duration-300">
                    {country.flag}
                  </span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 text-center">
                    {country.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
