import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Calendar,
  Check,
  Users,
  Heart,
  Share2,
  ChevronDown,
  Utensils,
  Building,
  Sun,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TourDay {
  id: string;
  tour_id: string;
  day_number: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

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
}

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [itinerary, setItinerary] = useState<TourDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    loadTour();
  }, [id]);

  const loadTour = async () => {
    if (!id) return;
    // Try to find by slug first, then by id
    let query = supabase.from('tours').select('*').eq('slug', id);
    let { data } = await query.maybeSingle();

    if (!data) {
      const result = await supabase.from('tours').select('*').eq('id', id).maybeSingle();
      data = result.data;
    }

    if (data) {
      setTour(data as Tour);
      // Load itinerary
      const { data: days } = await supabase
        .from('tour_days')
        .select('*')
        .eq('tour_id', data.id)
        .order('day_number');
      if (days) setItinerary(days as TourDay[]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Tour Not Found</h1>
          <Link to="/" className="text-sky-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/90" />

        <Link
          to="/"
          className="absolute top-24 left-4 sm:left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back</span>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-2">
              <MapPin className="w-4 h-4" />
              {tour.destination}, {tour.country}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {tour.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 bg-amber-400 rounded-full px-3 py-1.5">
                <Star className="w-4 h-4 text-white fill-white" />
                <span className="text-white font-bold">{tour.rating}</span>
                <span className="text-amber-100 text-sm">({tour.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-5 h-5" />
                <span>Group Tour</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Info */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                About This Tour
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Calendar, label: 'Best Time', value: tour.best_time },
                  { icon: Clock, label: 'Duration', value: tour.duration },
                  { icon: Users, label: 'Group Size', value: 'Max 16' },
                  { icon: MapPin, label: 'Destination', value: tour.destination },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700"
                  >
                    <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                      <item.icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Tour Highlights
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {tour.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800"
                  >
                    <div className="p-1 bg-emerald-500 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Itinerary */}
            {itinerary.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Day-by-Day Itinerary
                </h2>
                <ItineraryTimeline
                  itinerary={itinerary}
                  activeDay={activeDay}
                  setActiveDay={setActiveDay}
                />
              </section>
            )}

            {/* What's Included */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                What's Included
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tour.included.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
                  >
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700 dark:text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard tour={tour} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItineraryTimeline({
  itinerary,
  activeDay,
  setActiveDay,
}: {
  itinerary: TourDay[];
  activeDay: number;
  setActiveDay: (day: number) => void;
}) {
  return (
    <div className="space-y-4">
      {itinerary.map((day) => (
        <div key={day.id} className="relative">
          <button
            onClick={() => setActiveDay(activeDay === day.day_number ? 0 : day.day_number)}
            className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
              activeDay === day.day_number
                ? 'bg-sky-50 dark:bg-sky-900/30 border-2 border-sky-500'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                activeDay === day.day_number
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {day.day_number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {day.title}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      activeDay === day.day_number ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {day.description}
                </p>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeDay === day.day_number ? 'max-h-96 mt-4' : 'max-h-0'
              }`}
            >
              <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
                <div className="mb-4">
                  <h4 className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    Activities
                  </h4>
                  <ul className="space-y-2">
                    {day.activities.map((activity, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                {day.meals.length > 0 && (
                  <div className="mb-4">
                    <h4 className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200 mb-2">
                      <Utensils className="w-4 h-4 text-emerald-500" />
                      Meals Included
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {day.meals.map((meal) => (
                        <span
                          key={meal}
                          className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm rounded-full"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {day.accommodation && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200 mb-2">
                      <Building className="w-4 h-4 text-purple-500" />
                      Accommodation
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {day.accommodation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}

function BookingCard({ tour }: { tour: Tour }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-sky-500 to-blue-600">
        <div className="flex items-end gap-2 mb-2">
          <span className="text-white/80 text-lg">From</span>
          <span className="text-4xl font-bold text-white">₹{tour.price.toLocaleString()}</span>
          <span className="text-white/80">/person</span>
        </div>
        <p className="text-sky-100 text-sm">Starting price, flights included</p>
      </div>

      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Duration</p>
            <p className="font-semibold text-slate-900 dark:text-white">{tour.duration}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Group Size</p>
            <p className="font-semibold text-slate-900 dark:text-white">Max 16</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all">
          Book This Tour
        </button>
        <button className="w-full py-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
          Request Quote
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600'
                : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">
              {isFavorite ? 'Saved' : 'Save'}
            </span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <Check className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm">
              Best Price Guarantee
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Find a lower price, we'll match it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
