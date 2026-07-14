import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Users, Download } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadSubscribers(); }, []);

  const loadSubscribers = async () => {
    const { data, error } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
    if (!error && data) setSubscribers(data as Subscriber[]);
    setLoading(false);
  };

  const handleDelete = async (sub: Subscriber) => {
    if (!confirm(`Remove ${sub.email}?`)) return;
    await supabase.from('newsletter_subscribers').delete().eq('id', sub.id);
    setSubscribers(subscribers.filter((s) => s.id !== sub.id));
  };

  const handleExport = () => {
    const csv = 'Email,Subscribed Date\n' + subscribers.map((s) => `${s.email},${new Date(s.created_at).toLocaleDateString()}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'newsletter-subscribers.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Newsletter Subscribers</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">{subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}</p>
        </div>
        {subscribers.length > 0 && (
          <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading...</div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">No subscribers yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Subscribed</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{sub.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{formatDate(sub.created_at)}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(sub)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
