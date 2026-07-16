
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// One-day promo popup for the Ratha Yatra opening announcement.
// Shows only when a visitor's local date matches SHOW_DATE — safe to
// delete this file (and its usage in App.tsx) after the event.
const SHOW_DATE = '2026-07-16';
const DISMISSED_KEY = 'travellier-invitation-dismissed';

function getTodayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function InvitationPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const today = getTodayString();
    if (today !== SHOW_DATE) return;
    if (localStorage.getItem(DISMISSED_KEY) === today) return;
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(DISMISSED_KEY, getTodayString());
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-invite-fade"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ratha Yatra opening invitation"
    >
      <div
        className="relative max-w-sm w-full animate-invite-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 p-2 bg-white text-slate-900 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <img
          src="/invitation-ratha-yatra.jpg"
          alt="The Travellier — Opening on this Ratha Yatra, 16 July 2026. You are cordially invited."
          className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />
      </div>

      <style>{`
        @keyframes invite-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes invite-scale {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-invite-fade {
          animation: invite-fade 0.25s ease-out;
        }
        .animate-invite-scale {
          animation: invite-scale 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
