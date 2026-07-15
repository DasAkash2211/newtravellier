import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2 } from 'lucide-react';

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => { loadSettings(); }, []);

  const loadSettings = async () => {
    const { data, error } = await supabase.from('site_settings').select('*').order('key');
    if (!error && data) setSettings(data as Setting[]);
    setLoading(false);
  };

  const addSetting = async () => {
    if (!newKey || !newValue) return;
    const { data, error } = await supabase.from('site_settings').insert({ key: newKey, value: newValue, description: newDesc }).select().single();
    if (!error && data) {
      setSettings([...settings, data as Setting]);
      setNewKey(''); setNewValue(''); setNewDesc('');
    }
  };

  const deleteSetting = async (id: string) => {
    if (!confirm('Delete this setting?')) return;
    await supabase.from('site_settings').delete().eq('id', id);
    setSettings(settings.filter((s) => s.id !== id));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    for (const setting of settings) {
      await supabase.from('site_settings').update({ value: setting.value }).eq('id', setting.id);
    }
    setSaving(false);
    alert('Settings saved successfully!');
  };

  const groupedSettings = settings.reduce<Record<string, Setting[]>>((acc, s) => {
    const prefix = s.key.split('_')[0];
    if (!acc[prefix]) acc[prefix] = [];
    acc[prefix].push(s);
    return acc;
  }, {});

  const groupLabels: Record<string, string> = {
    company: 'Company Info', destinations: 'Statistics', travelers: 'Statistics',
    years: 'Statistics', satisfaction: 'Statistics', phone: 'Contact Info',
    email: 'Contact Info', office: 'Contact Info', tagline: 'Hero Section',
  };

  if (loading) return <div className="text-center py-12 text-slate-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Site Settings</h1>
        <button onClick={handleSaveAll} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {Object.entries(groupedSettings).map(([prefix, items]) => (
          <div key={prefix} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              {groupLabels[prefix] || prefix.charAt(0).toUpperCase() + prefix.slice(1)}
            </h2>
            <div className="space-y-4">
              {items.map((setting) => (
                <div key={setting.id}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {setting.key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      value={setting.value}
                      onChange={(e) => setSettings(settings.map((s) => (s.id === setting.id ? { ...s, value: e.target.value } : s)))}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                    <button onClick={() => deleteSetting(setting.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {setting.description && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{setting.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add New Setting</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="Key (e.g. hero_subtitle)" className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
          <input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="Value" className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
          <div className="flex items-center gap-2">
            <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description (optional)" className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" />
            <button onClick={addSetting} disabled={!newKey || !newValue} className="p-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-50">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
