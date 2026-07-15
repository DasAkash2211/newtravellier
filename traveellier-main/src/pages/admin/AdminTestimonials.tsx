import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, X, Save, Star, Eye, EyeOff, MessageSquare } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  trip: string;
  rating: number;
  text: string;
  is_active: boolean;
  sort_order: number;
}

const emptyTestimonial = { name: '', location: '', avatar: '', trip: '', rating: 5, text: '', is_active: true, sort_order: 0 };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadTestimonials(); }, []);

  const loadTestimonials = async () => {
    const { data, error } = await supabase.from('testimonials').select('*').order('sort_order');
    if (!error && data) setTestimonials(data as Testimonial[]);
    setLoading(false);
  };

  const handleNew = () => { setEditing({ ...emptyTestimonial, id: '' } as Testimonial); setIsNew(true); };
  const handleEdit = (t: Testimonial) => { setEditing({ ...t }); setIsNew(false); };

  const handleDelete = async (t: Testimonial) => {
    if (!confirm(`Delete testimonial from "${t.name}"?`)) return;
    await supabase.from('testimonials').delete().eq('id', t.id);
    setTestimonials(testimonials.filter((item) => item.id !== t.id));
  };

  const handleToggleActive = async (t: Testimonial) => {
    const { data } = await supabase.from('testimonials').update({ is_active: !t.is_active }).eq('id', t.id).select().single();
    if (data) setTestimonials(testimonials.map((item) => (item.id === t.id ? { ...item, is_active: !item.is_active } : item)));
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const data = { name: editing.name, location: editing.location, avatar: editing.avatar, trip: editing.trip, rating: editing.rating, text: editing.text, is_active: editing.is_active, sort_order: editing.sort_order };

    if (isNew) {
      const { error } = await supabase.from('testimonials').insert(data);
      if (error) alert('Error: ' + error.message);
    } else {
      const { error } = await supabase.from('testimonials').update(data).eq('id', editing.id);
      if (error) alert('Error: ' + error.message);
    }

    setEditing(null); setIsNew(false); setSaving(false);
    loadTestimonials();
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{isNew ? 'New Testimonial' : 'Edit Testimonial'}</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => { setEditing(null); setIsNew(false); }} className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl shadow-lg disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
              <input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Avatar URL</label>
              <input value={editing.avatar} onChange={(e) => setEditing({ ...editing, avatar: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Trip Name</label>
              <input value={editing.trip} onChange={(e) => setEditing({ ...editing, trip: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating (1-5)</label>
              <input type="number" min="1" max="5" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
              <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Review Text</label>
              <textarea value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active (visible on site)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Testimonials</h1>
        <button onClick={handleNew} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">No testimonials yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  t.is_active ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>{t.is_active ? 'Active' : 'Draft'}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">"{t.text}"</p>
              <div className="flex items-center gap-3 mb-4">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
                <div>
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xs text-sky-600 dark:text-sky-400">{t.trip}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleToggleActive(t)} className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors">
                    {t.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleEdit(t)} className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(t)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
