import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff, Play, Video } from 'lucide-react';

interface VRVideo {
  id: string;
  title: string;
  country: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  tags: string[];
  duration: string;
  sort_order: number;
  active: boolean;
}

const empty: Omit<VRVideo, 'id'> = {
  title: '', country: '', description: '', video_url: '',
  thumbnail_url: '', tags: [], duration: '', sort_order: 0, active: true,
};

export default function AdminVRVideos() {
  const [videos, setVideos] = useState<VRVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<VRVideo> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('vr_videos').select('*').order('sort_order');
    setVideos(data ?? []);
    setLoading(false);
  };

  const openNew = () => { setEditing({ ...empty }); setIsNew(true); };
  const openEdit = (v: VRVideo) => { setEditing({ ...v }); setIsNew(false); };
  const closeEdit = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      await supabase.from('vr_videos').insert([editing]);
    } else {
      const { id, ...rest } = editing as VRVideo;
      await supabase.from('vr_videos').update(rest).eq('id', id);
    }
    await load();
    closeEdit();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this VR video?')) return;
    await supabase.from('vr_videos').delete().eq('id', id);
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const toggleActive = async (v: VRVideo) => {
    await supabase.from('vr_videos').update({ active: !v.active }).eq('id', v.id);
    setVideos((prev) => prev.map((x) => x.id === v.id ? { ...x, active: !x.active } : x));
  };

  const tagsStr = (tags: string[]) => tags.join(', ');
  const strTags = (s: string) => s.split(',').map((t) => t.trim()).filter(Boolean);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">VR Videos</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage immersive destination videos shown on the VR Experience page.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {videos.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Video className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No VR videos yet</p>
            <p className="text-sm mt-1">Add your first video to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Video</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Country</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Tags</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {videos.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-700">
                          {v.thumbnail_url ? (
                            <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="w-5 h-5 text-slate-400" />
                            </div>
                          )}
                          <button
                            onClick={() => setPreviewId(previewId === v.id ? null : v.id)}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
                          >
                            <Play className="w-4 h-4 text-white fill-white" />
                          </button>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white text-sm">{v.title}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[160px]">{v.video_url}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 hidden sm:table-cell">{v.country}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {v.tags.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs rounded-full">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(v)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          v.active
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {v.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {v.active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(v)}
                          className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => remove(v.id)}
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

      {/* Inline video preview */}
      {previewId && (
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
          {(() => {
            const v = videos.find((x) => x.id === previewId);
            if (!v) return null;
            return (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-medium">{v.title} — Preview</p>
                  <button onClick={() => setPreviewId(null)} className="text-white/50 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <video
                  src={v.video_url}
                  controls
                  autoPlay
                  className="w-full max-h-64 rounded-xl object-cover"
                />
              </div>
            );
          })()}
        </div>
      )}

      {/* Edit / Create Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl my-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isNew ? 'Add VR Video' : 'Edit VR Video'}
              </h2>
              <button onClick={closeEdit} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {[
                { label: 'Title', field: 'title', placeholder: 'e.g. Bali Rice Terraces' },
                { label: 'Country', field: 'country', placeholder: 'e.g. Indonesia' },
                { label: 'Video URL', field: 'video_url', placeholder: 'https://...mp4' },
                { label: 'Thumbnail URL', field: 'thumbnail_url', placeholder: 'https://...jpg' },
                { label: 'Duration', field: 'duration', placeholder: 'e.g. 3:42' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={(editing as Record<string, unknown>)[field] as string ?? ''}
                    onChange={(e) => setEditing((prev) => ({ ...prev, [field]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Short description of the destination..."
                  value={editing.description ?? ''}
                  onChange={(e) => setEditing((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Nature, Culture, Beaches"
                  value={tagsStr(editing.tags ?? [])}
                  onChange={(e) => setEditing((prev) => ({ ...prev, tags: strTags(e.target.value) }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Visible</label>
                  <select
                    value={editing.active ? 'true' : 'false'}
                    onChange={(e) => setEditing((prev) => ({ ...prev, active: e.target.value === 'true' }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="true">Active</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>
              </div>

              {/* Live thumbnail preview */}
              {editing.thumbnail_url && (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 h-36">
                  <img src={editing.thumbnail_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
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
