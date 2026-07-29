import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Plane, Calendar, User, ArrowLeft, ArrowRight, Newspaper,
  Tag, Search, ChevronRight, Clock,
} from 'lucide-react';

interface TravelUpdate {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
  published: boolean;
  sort_order: number;
  created_at: string;
}

const categoryColors: Record<string, string> = {
  News: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300',
  Offer: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  Advisory: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  Event: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function readingTime(text: string) {
  const words = (text || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function TravelUpdates() {
  const [updates, setUpdates] = useState<TravelUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TravelUpdate | null>(null);
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('travel_updates')
        .select('*')
        .eq('published', true)
        .order('sort_order')
        .order('created_at', { ascending: false });
      setUpdates((data as TravelUpdate[]) || []);
      setLoading(false);
    })();
  }, []);

  const categories = ['All', ...Array.from(new Set(updates.map((u) => u.category).filter(Boolean)))];

  const filtered = updates.filter((u) => {
    const matchCat = category === 'All' || u.category === category;
    const q = query.trim().toLowerCase();
    const matchQ = !q || u.title.toLowerCase().includes(q) || (u.excerpt || '').toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  if (selected) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => setSelected(null)}
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 hover:gap-3 transition-all mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all updates
          </button>

          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[selected.category] || categoryColors.News}`}>
              <Tag className="w-3 h-3" />
              {selected.category}
            </span>
            <span className="text-sm text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTime(selected.content)} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            {selected.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8">
            {selected.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {selected.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(selected.created_at)}
            </span>
          </div>

          {selected.image_url && (
            <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img src={selected.image_url} alt={selected.title} className="w-full h-72 sm:h-96 object-cover" />
            </div>
          )}

          {selected.excerpt && (
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium border-l-4 border-sky-500 pl-4">
              {selected.excerpt}
            </p>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {(selected.content || '').split('\n').map((para, i) => (
              <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              All updates
            </button>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              <Plane className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            Stay Informed
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Travel Updates
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Latest news, special offers, travel advisories, and event announcements from the Travellier team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + category filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search updates..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">No updates found</p>
            <p className="text-sm text-slate-400 mt-1">Check back soon for new travel updates.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured card */}
            {featured && (
              <button
                onClick={() => setSelected(featured)}
                className="group block w-full text-left bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    {featured.image_url ? (
                      <img
                        src={featured.image_url}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sky-100 to-blue-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                        <Newspaper className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                    <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[featured.category] || categoryColors.News}`}>
                      <Tag className="w-3 h-3" />
                      {featured.category}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featured.created_at)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {readingTime(featured.content)} min read
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 group-hover:gap-3 transition-all">
                      Read full update
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            )}

            {/* Grid of the rest */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelected(u)}
                    className="group block text-left bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {u.image_url ? (
                        <img
                          src={u.image_url}
                          alt={u.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-sky-100 to-blue-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                          <Newspaper className="w-10 h-10 text-slate-400" />
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[u.category] || categoryColors.News}`}>
                        <Tag className="w-3 h-3" />
                        {u.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(u.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {readingTime(u.content)} min
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                        {u.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                        {u.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 dark:text-sky-400 group-hover:gap-2 transition-all">
                        Read more
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
