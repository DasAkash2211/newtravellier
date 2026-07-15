import { useEffect, useRef, useState } from 'react';
import { Shield, Award, Heart, Globe } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Global Network',
    description: '150+ destinations across 50 countries with trusted local partners.',
    color: 'sky',
  },
  {
    icon: Shield,
    title: 'Fully Protected',
    description: 'Complete travel protection and 24/7 support throughout your journey.',
    color: 'emerald',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized as the #1 travel company for customer satisfaction.',
    color: 'amber',
  },
  {
    icon: Heart,
    title: 'Personalized Service',
    description: 'Custom itineraries tailored to your unique travel preferences.',
    color: 'rose',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Travelers' },
  { value: '150+', label: 'Destinations' },
  { value: '15+', label: 'Years Experience' },
  { value: '99%', label: 'Satisfaction Rate' },
];

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.pexels.com/photos/3228623/pexels-photo-3228623.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Travel experience"
                className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                    15+
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Years of Excellence</p>
                </div>
              </div>

              {/* Stats Badge */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <div className="text-lg font-bold">#1 Rated</div>
                    <div className="text-emerald-100 text-sm">Travel Agency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-4">
              About Travellier
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Creating Unforgettable{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                Travel Experiences
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Since 2009, Travellier has been crafting extraordinary journeys for adventure seekers and leisure travelers alike. We believe travel is more than just visiting places—it's about creating memories that last a lifetime.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className={`p-3 rounded-xl ${
                    feature.color === 'sky' ? 'bg-sky-100 dark:bg-sky-900/30' :
                    feature.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                    feature.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' :
                    'bg-rose-100 dark:bg-rose-900/30'
                  }`}>
                    <feature.icon className={`w-5 h-5 ${
                      feature.color === 'sky' ? 'text-sky-600 dark:text-sky-400' :
                      feature.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                      feature.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                      'text-rose-600 dark:text-rose-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-slate-100 dark:border-slate-700">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
