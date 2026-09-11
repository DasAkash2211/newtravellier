import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, ArrowLeft } from 'lucide-react';
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
  service_type: string;
  is_active: boolean;
}

const SERVICE_LABELS: Record<string, string> = {
  'bespoke-leisure-groups': 'Bespoke Leisure Groups',
  'ready-to-join-groups': 'Ready to Join Groups',
  'customized-holidays': 'Customized Holidays',
  'speciality-groups': 'Speciality Groups',
  'india-inbound': 'India Inbound',
  flights: 'Flights',
  'visa-assist': 'Visa Assist',
  insurance: 'Insurance',
  forex: 'Forex',
};

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'bespoke-leisure-groups':
    'Handpicked itineraries for your own circle of friends, family, or colleagues — travel your way, with people you choose.',
  'ready-to-join-groups':
    'Join a curated group of fellow travelers and set off on a shared adventure, with everything planned for you.',
  'customized-holidays':
    'Tailor-made trips built around exactly what you want to see, do, and experience.',
  'speciality-groups':
    'Purpose-built tours for educational excursions, community groups, and special-interest travelers.',
  'india-inbound': 'Curated journeys across India for travelers visiting from abroad.',
  flights: 'Flight bookings and air travel arrangements for your trip.',
  'visa-assist': 'End-to-end assistance with visa applications and documentation.',
  insurance: 'Travel insurance options to keep you covered on every trip.',
  forex: 'Foreign exchange services to help you carry the right currency, hassle-free.',
};

export default function ServiceTours() {
  const { slug = '' } = useParams();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const label = SERVICE_LABELS[slug] || 'Our Services';
  const description = SERVICE_DESCRIPTIONS[slug] || 'Explore tours under this service category.';

  useEffect(() => {
    let isMounted = true;
    const loadTours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('service_type', label)
        .eq('is_active', true)
        .order('sort_order');
      if (!error && data && isMounted) setTours(data as Tour[]);
      if (isMounted) setLoading(false);
    };
    loadTours();
    return () => {
      isMounted = false;
    };
  }, [label]);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{label}</h1>
          <p className="text-slate-400 max-w-2xl">{description}</p>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {loading ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400">Loading tours...</div>
        ) : tours.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              No tours are listed under {label} right now.
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Check back soon, or get in touch and we'll help you plan one.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <Link
                key={tour.id}
                to={`/tour/${tour.id}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-white backdrop-blur-sm">
                    {tour.country}
                  </span>
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-slate-900">
                    <Star className="w-3 h-3 fill-current" /> {tour.rating}
                  </span>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm font-bold bg-emerald-500 text-white">
                    ₹{tour.price.toLocaleString()}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{tour.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {tour.destination}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {tour.duration}
                    </span>
                  </div>
                  {tour.highlights?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 2).map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
