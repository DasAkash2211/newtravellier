import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Plus, Pencil, Trash2, X, Save, ChevronDown, ChevronUp,
  Eye, EyeOff, Star, GripVertical, MapPin,
} from 'lucide-react';

interface TourDay {
  id?: string;
  tour_id?: string;
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
  sort_order: number;
  tour_days?: TourDay[];
}

const emptyTour = {
  slug: '', name: '', destination: '', country: '', duration: '',
  price: 0, rating: 4.5, reviews: 0, image: '', highlights: [] as string[],
  included: [] as string[], best_time: '', is_active: true, sort_order: 0,
};

const emptyDay: Omit<TourDay, 'id' | 'tour_id'> = {
  day_number: 1, title: '', description: '', activities: [], meals: [], accommodation: '',
};

const arr2str = (arr: string[]) => arr.join(', ');
const str2arr = (str: string) => str.split(',').map((s) => s.trim()).filter(Boolean);

export default function AdminTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  useEffect(() => { loadTours(); }, []);

  const loadTours = async () => {
    const { data, error } = await supabase.from('tours').select('*').order('sort_order');
    if (!error && data) setTours(data as Tour[]);
    setLoading(false);
  };

  const loadTourDays = async (tourId: string): Promise<TourDay[]> => {
    const { data } = await supabase.from('tour_days').select('*').eq('tour_id', tourId).order('day_number');
    return (data as TourDay[]) || [];
  };

  const handleNew = () => {
    setEditingTour({ ...emptyTour, id: '', tour_days: [{ ...emptyDay }] } as Tour);
    setIsNew(true);
    setExpandedDay(1);
  };

  const handleEdit = async (tour: Tour) => {
    const days = await loadTourDays(tour.id);
    setEditingTour({ ...tour, tour_days: days });
    setIsNew(false);
    setExpandedDay(1);
  };

  const handleDelete = async (tour: Tour) => {
    if (!confirm(`Delete "${tour.name}"? This cannot be undone.`)) return;
    await supabase.from('tours').delete().eq('id', tour.id);
    setTours(tours.filter((t) => t.id !== tour.id));
  };

  const handleToggleActive = async (tour: Tour) => {
    const { data } = await supabase.from('tours').update({ is_active: !tour.is_active }).eq('id', tour.id).select().single();
    if (data) setTours(tours.map((t) => (t.id === tour.id ? { ...t, is_active: !t.is_active } : t)));
  };

  const handleSave = async () => {
    if (!editingTour) return;
    setSaving(true);

    const slug = editingTour.slug || editingTour.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const tourData = {
      slug, name: editingTour.name, destination: editingTour.destination, country: editingTour.country,
      duration: editingTour.duration, price: editingTour.price, rating: editingTour.rating,
      reviews: editingTour.reviews, image: editingTour.image, highlights: editingTour.highlights,
      included: editingTour.included, best_time: editingTour.best_time, is_active: editingTour.is_active,
      sort_order: editingTour.sort_order,
    };

    let tourId = editingTour.id;

    if (isNew) {
      const { data, error } = await supabase.from('tours').insert(tourData).select().single();
      if (error) { alert('Error creating tour: ' + error.message); setSaving(false); return; }
      tourId = data.id;
    } else {
      const { error } = await supabase.from('tours').update(tourData).eq('id', tourId);
      if (error) { alert('Error updating tour: ' + error.message); setSaving(false); return; }
      await supabase.from('tour_days').delete().eq('tour_id', tourId);
    }

    if (editingTour.tour_days && editingTour.tour_days.length > 0) {
      const daysData = editingTour.tour_days.map((day, index) => ({
        tour_id: tourId, day_number: index + 1, title: day.title, description: day.description,
        activities: day.activities, meals: day.meals, accommodation: day.accommodation,
      }));
      const { error: daysError } = await supabase.from('tour_days').insert(daysData);
      if (daysError) { alert('Error saving itinerary: ' + daysError.message); setSaving(false); return; }
    }

    setEditingTour(null);
    setIsNew(false);
    setSaving(false);
    loadTours();
  };

  const updateField = (field: string, value: unknown) => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, [field]: value });
  };

  const updateDayField = (dayIndex: number, field: string, value: unknown) => {
    if (!editingTour || !editingTour.tour_days) return;
    const days = [...editingTour.tour_days];
    days[dayIndex] = { ...days[dayIndex], [field]: value };
    setEditingTour({ ...editingTour, tour_days: days });
  };

  const addDay = () => {
    if (!editingTour || !editingTour.tour_days) return;
    const nextDay = editingTour.tour_days.length + 1;
    setEditingTour({ ...editingTour, tour_days: [...editingTour.tour_days, { ...emptyDay, day_number: nextDay }], duration: `${nextDay} Days` });
    setExpandedDay(nextDay);
  };

  const removeDay = (index: number) => {
    if (!editingTour || !editingTour.tour_days) return;
    const days = editingTour.tour_days.filter((_, i) => i !== index);
    const renumbered = days.map((d, i) => ({ ...d, day_number: i + 1 }));
    setEditingTour({ ...editingTour, tour_days: renumbered, duration: `${renumbered.length} Days` });
  };

  // --- EDITOR VIEW ---
  if (editingTour) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{isNew ? 'New Tour' : 'Edit Tour'}</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => { setEditingTour(null); setIsNew(false); }} className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Tour'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Information */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tour Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tour Name</label>
                  <input value={editingTour.name} onChange={(e) => updateField('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. Bali Paradise Escape" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Destination</label>
                  <input value={editingTour.destination} onChange={(e) => updateField('destination', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Country</label>
                  <input value={editingTour.country} onChange={(e) => updateField('country', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duration</label>
                  <input value={editingTour.duration} onChange={(e) => updateField('duration', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" placeholder="e.g. 7 Days" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price (INR)</label>
                  <input type="number" value={editingTour.price} onChange={(e) => updateField('price', parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                  <input value={editingTour.image} onChange={(e) => updateField('image', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Best Time to Visit</label>
                  <input value={editingTour.best_time} onChange={(e) => updateField('best_time', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Highlights (comma-separated)</label>
                  <input value={arr2str(editingTour.highlights)} onChange={(e) => updateField('highlights', str2arr(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Included (comma-separated)</label>
                  <input value={arr2str(editingTour.included)} onChange={(e) => updateField('included', str2arr(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Day-by-Day Itinerary</h2>
                <button onClick={addDay} className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 font-medium rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors">
                  <Plus className="w-4 h-4" /> Add Day
                </button>
              </div>
              <div className="space-y-3">
                {editingTour.tour_days?.map((day, dayIndex) => (
                  <div key={dayIndex} className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden">
                    <button onClick={() => setExpandedDay(expandedDay === day.day_number ? null : day.day_number)} className="w-full flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                      <GripVertical className="w-5 h-5 text-slate-400" />
                      <span className="font-bold text-slate-900 dark:text-white">Day {day.day_number}</span>
                      <span className="text-slate-600 dark:text-slate-300">{day.title || '(Untitled)'}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); removeDay(dayIndex); }} className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {expandedDay === day.day_number ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </div>
                    </button>
                    {expandedDay === day.day_number && (
                      <div className="p-4 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                            <input value={day.title} onChange={(e) => updateDayField(dayIndex, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Accommodation</label>
                            <input value={day.accommodation} onChange={(e) => updateDayField(dayIndex, 'accommodation', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                          <textarea value={day.description} onChange={(e) => updateDayField(dayIndex, 'description', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm resize-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Activities (comma-separated)</label>
                          <input value={arr2str(day.activities)} onChange={(e) => updateDayField(dayIndex, 'activities', str2arr(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meals (comma-separated)</label>
                          <input value={arr2str(day.meals)} onChange={(e) => updateDayField(dayIndex, 'meals', str2arr(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Preview</h2>
              {editingTour.image && <img src={editingTour.image} alt={editingTour.name} className="w-full h-40 object-cover rounded-xl mb-4" />}
              <h3 className="font-bold text-slate-900 dark:text-white">{editingTour.name || 'Tour Name'}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{editingTour.destination || 'Destination'}, {editingTour.country || 'Country'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">₹{editingTour.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{editingTour.rating}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Status</h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={editingTour.is_active} onChange={(e) => updateField('is_active', e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active (visible on site)</span>
              </label>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
                <input type="number" value={editingTour.sort_order} onChange={(e) => updateField('sort_order', parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating</label>
                  <input type="number" step="0.1" min="0" max="5" value={editingTour.rating} onChange={(e) => updateField('rating', parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reviews</label>
                  <input type="number" value={editingTour.reviews} onChange={(e) => updateField('reviews', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Tours Management</h1>
        <button onClick={handleNew} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4" /> Add Tour
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">Loading tours...</div>
      ) : tours.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <MapPin className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">No tours yet. Create your first tour!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Tour</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Destination</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Price</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr key={tour.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={tour.image} alt={tour.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{tour.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{tour.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{tour.destination}, {tour.country}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">₹{tour.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        tour.is_active ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {tour.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {tour.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleToggleActive(tour)} className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors" title={tour.is_active ? 'Deactivate' : 'Activate'}>
                          {tour.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button onClick={() => handleEdit(tour)} className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(tour)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
