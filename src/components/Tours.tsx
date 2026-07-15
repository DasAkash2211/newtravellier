import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Tour {
  id: string;
  slug: string;
  name: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  included: string[];
  best_time: string;
  is_active: boolean;
  sort_order: number;
}

export default function Tours() {
  const [isVisible, setIsVisible] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);
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

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    const { data } = await supabase
      .from('tours')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (data) setTours(data as Tour[]);
  };

  return (
    <section
      id="tours"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-4">
            Popular Tours
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Adventures
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Handpicked journeys to the most remarkable destinations on Earth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tours.map((tour, index) => (
            <TourCard
              key={tour.id}
              tour={tour}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TourCard({ tour, index, isVisible }: { tour: Tour; index: number; isVisible: boolean }) {
  return (
    <Link
      to={`/tour/${tour.slug}`}
      className={`group block transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
        <div className="relative h-48 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 dark:text-slate-300">
            {tour.country}
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-amber-400 rounded-full">
            <Star className="w-3 h-3 text-white fill-white" />
            <span className="text-xs font-bold text-white">{tour.rating}</span>
          </div>

          <div className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg">
            <span className="text-white font-bold">₹{tour.price.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {tour.name}
          </h3>

          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {tour.destination}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {tour.duration}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {tour.highlights.slice(0, 3).map((highlight) => (
              <span
                key={highlight}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {tour.reviews} reviews
            </span>
            <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-medium text-sm group-hover:gap-2 transition-all">
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
