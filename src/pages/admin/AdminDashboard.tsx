import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { MapPin, MessageSquare, Mail, Users, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  activeTours: number;
  totalTours: number;
  testimonials: number;
  unreadContacts: number;
  totalContacts: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeTours: 0, totalTours: 0, testimonials: 0,
    unreadContacts: 0, totalContacts: 0, subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    const [toursRes, activeToursRes, testimonialsRes, contactsRes, unreadRes, subscribersRes] =
      await Promise.all([
        supabase.from('tours').select('id', { count: 'exact', head: true }),
        supabase.from('tours').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
      ]);

    setStats({
      totalTours: toursRes.count ?? 0,
      activeTours: activeToursRes.count ?? 0,
      testimonials: testimonialsRes.count ?? 0,
      totalContacts: contactsRes.count ?? 0,
      unreadContacts: unreadRes.count ?? 0,
      subscribers: subscribersRes.count ?? 0,
    });
    setLoading(false);
  };

  const statCards = [
    { title: 'Active Tours', value: stats.activeTours, subtitle: `${stats.totalTours} total`, icon: MapPin, color: 'sky', link: '/admin/tours' },
    { title: 'Testimonials', value: stats.testimonials, subtitle: 'Published reviews', icon: MessageSquare, color: 'amber', link: '/admin/testimonials' },
    { title: 'Contact Messages', value: stats.totalContacts, subtitle: `${stats.unreadContacts} unread`, icon: Mail, color: 'emerald', link: '/admin/contacts' },
    { title: 'Newsletter', value: stats.subscribers, subtitle: 'Subscribers', icon: Users, color: 'rose', link: '/admin/newsletter' },
  ];

  const colorMap: Record<string, { bg: string; icon: string }> = {
    sky: { bg: 'bg-sky-100 dark:bg-sky-900/30', icon: 'text-sky-600 dark:text-sky-400' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', icon: 'text-amber-600 dark:text-amber-400' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', icon: 'text-emerald-600 dark:text-emerald-400' },
    rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', icon: 'text-rose-600 dark:text-rose-400' },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back! Here's an overview of your travel site.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${colorMap[card.color].bg}`}>
                <card.icon className={`w-6 h-6 ${colorMap[card.color].icon}`} />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              {loading ? '...' : card.value}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{card.subtitle}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link to="/admin/tours" className="flex items-center gap-3 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-100 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Manage Tours</span>
          </Link>
          <Link to="/admin/testimonials" className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Manage Reviews</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            <Eye className="w-5 h-5" />
            <span className="font-medium">Site Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
