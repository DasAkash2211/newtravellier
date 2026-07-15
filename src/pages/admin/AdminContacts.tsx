import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Trash2, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  destination: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => { loadContacts(); }, []);

  const loadContacts = async () => {
    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (!error && data) setContacts(data as Contact[]);
    setLoading(false);
  };

  const markAsRead = async (contact: Contact) => {
    const { data } = await supabase.from('contact_submissions').update({ is_read: true }).eq('id', contact.id).select().single();
    if (data) {
      setContacts(contacts.map((c) => (c.id === contact.id ? { ...c, is_read: true } : c)));
      if (selectedContact?.id === contact.id) setSelectedContact({ ...selectedContact, is_read: true });
    }
  };

  const markAsUnread = async (contact: Contact) => {
    const { data } = await supabase.from('contact_submissions').update({ is_read: false }).eq('id', contact.id).select().single();
    if (data) {
      setContacts(contacts.map((c) => (c.id === contact.id ? { ...c, is_read: false } : c)));
      if (selectedContact?.id === contact.id) setSelectedContact({ ...selectedContact, is_read: false });
    }
  };

  const handleDelete = async (contact: Contact) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contact_submissions').delete().eq('id', contact.id);
    setContacts(contacts.filter((c) => c.id !== contact.id));
    if (selectedContact?.id === contact.id) setSelectedContact(null);
  };

  const unreadCount = contacts.filter((c) => !c.is_read).length;
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (loading) return <div className="text-center py-12 text-slate-500">Loading...</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Contact Messages</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <Mail className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">No messages yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => { setSelectedContact(contact); if (!contact.is_read) markAsRead(contact); }}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedContact?.id === contact.id
                    ? 'bg-sky-50 dark:bg-sky-900/30 border-2 border-sky-500'
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-sky-300'
                } ${!contact.is_read ? 'ring-2 ring-sky-400/30' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-medium text-sm ${!contact.is_read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{contact.name}</p>
                  {!contact.is_read && <span className="w-2 h-2 bg-sky-500 rounded-full" />}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{contact.email}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-1">{contact.message}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{formatDate(contact.created_at)}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedContact.name}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{selectedContact.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedContact.is_read ? (
                      <button onClick={() => markAsUnread(selectedContact)} className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg" title="Mark as unread">
                        <EyeOff className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => markAsRead(selectedContact)} className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg" title="Mark as read">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(selectedContact)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {selectedContact.destination && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Interested in: </span>
                    <span className="text-sm text-sky-600 dark:text-sky-400">{selectedContact.destination}</span>
                  </div>
                )}
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">Received {formatDate(selectedContact.created_at)}</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 border border-slate-100 dark:border-slate-700 text-center">
                <Eye className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
