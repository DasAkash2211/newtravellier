import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (!error) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
    setSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Exclusive Travel Deals
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Get Travel Inspiration
        </h2>
        <p className="text-lg text-sky-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and receive exclusive offers, travel tips, and destination guides straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 outline-none transition-all"
            required
          />
          <button
            type="submit"
            disabled={submitting || subscribed}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            {subscribed ? 'Subscribed!' : submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        <p className="text-sm text-sky-200 mt-4">
          Join 50,000+ travelers. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
