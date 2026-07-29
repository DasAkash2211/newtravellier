import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Plus, Pencil, Trash2, X, Save, Eye, EyeOff, Newspaper,
  Upload, Loader2, Tag, Calendar,
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

const emptyUpdate: Omit<TravelUpdate, 'id' | 'created_at'> = {
  title: '', slug: '', excerpt: '', content: '',
  image_url: '', category: 'News', author: '',
  published: false, sort_order: 0,
};

const categories = ['News', 'Offer', 'Advisory', 'Event'];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function AdminTravelUpdates() {
  const [updates, setUpdates] = useState<TravelUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<TravelUpdate> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('travel_updates').select('*').order('sort_order');
    setUpdates((data as TravelUpdate[]) || []);
    setLoading(false);
  };

  const openNew = () => { setEditing({ ...emptyUpdate }); setIsNew(true); };
  const openEdit = (u: TravelUpdate) => { setEditing({ ...u }); setIsNew(false); };
  const closeEdit = () => { setEditing(null); setIsNew(false); setUploadError(null); };

  const handleUpload = async (file: File) => {
    if (!editing) return;
    setUploading(true);
    setUploadError(null);
    try {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('travel-updates')
        .upload(path, file, { cacheControl: '3600', upsert: false });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from('travel-updates').getPublicUrl(path);
      setEditing((prev) => ({ ...prev, image_url: pub.publicUrl }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.title) { alert('Title is required'); return; }
    setSaving(true);
    const slug = editing.slug || slugify(editing.title);
    const payload = {
      title: editing.title,
      slug,
      excerpt: editing.excerpt ?? '',
      content: editing.content ?? '',
      image_url: editing.image_url ?? '',
      category: editing.category ?? 'News',
      author: editing.author ?? '',
      published: editing.published ?? false,
      sort_order: editing.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    };
    if (isNew) {
      await supabase.from('travel_updates').insert([payload]);
    } else {
      const { id, ...rest } = editing as TravelUpdate;
      const { id: _unused, created_at: _ca, ...updateRest } = rest;
      await supabase.from('travel_updates').update({ ...updateRest, ...payload }).eq('id', id);
    }
    await load();
    closeEdit();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this travel update?')) return;
    await supabase.from('travel_updates').delete().eq('id', id);
    setUpdates((prev) => prev.filter((u) => u.id !== id));
  };

  const togglePublished = async (u: TravelUpdate) => {
    await supabase.from('travel_updates').update({ published: !u.published }).eq('id', u.id);
    setUpdates((prev) => prev.map((x) => (x.id === u.id ? { ...x, published: !x.published } : x)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Travel Updates</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage news, offers, advisories, and event announcements shown on the public Travel Updates page.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Update
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {updates.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No travel updates yet</p>
            <p className="text-sm mt-1">Add your first update to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Update</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Category</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Date</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {updates.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-700">
                          {u.image_url ? (
                            <img src={u.image_url} alt={u.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Newspaper className="w-4 h-4 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white text-sm">{u.title}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[200px]">{u.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs rounded-full">
                        <Tag className="w-3 h-3" />
                        {u.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 hidden md:table-cell">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(u.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublished(u)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          u.published
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {u.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {u.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => remove(u.id)}
                          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl my-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isNew ? 'Add Travel Update' : 'Edit Travel Update'}
              </h2>
              <button onClick={closeEdit} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. New Direct Flights to Bali"
                  value={editing.title ?? ''}
                  onChange={(e) => setEditing((prev) => ({ ...prev, title: e.target.value, slug: prev?.slug || slugify(e.target.value) }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={editing.category ?? 'News'}
                    onChange={(e) => setEditing((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Author</label>
                  <input
                    type="text"
                    placeholder="e.g. Travellier Team"
                    value={editing.author ?? ''}
                    onChange={(e) => setEditing((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  placeholder="auto-generated from title"
                  value={editing.slug ?? ''}
                  onChange={(e) => setEditing((prev) => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Excerpt (short summary)</label>
                <textarea
                  rows={2}
                  placeholder="One or two sentence summary shown in cards..."
                  value={editing.excerpt ?? ''}
                  onChange={(e) => setEditing((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content (full body)</label>
                <textarea
                  rows={6}
                  placeholder="Full update content. Use blank lines to separate paragraphs."
                  value={editing.content ?? ''}
                  onChange={(e) => setEditing((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-y"
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cover Image</label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-semibold rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors cursor-pointer">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUpload(f);
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="or paste an image URL"
                    value={editing.image_url ?? ''}
                    onChange={(e) => setEditing((prev) => ({ ...prev, image_url: e.target.value }))}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                {uploadError && (
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{uploadError}</p>
                )}
                {editing.image_url && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 h-40">
                    <img src={editing.image_url} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={editing.sort_order ?? 0}
                    onChange={(e) => setEditing((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    value={editing.published ? 'true' : 'false'}
                    onChange={(e) => setEditing((prev) => ({ ...prev, published: e.target.value === 'true' }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="false">Draft</option>
                    <option value="true">Published</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={closeEdit}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isNew ? 'Create' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
