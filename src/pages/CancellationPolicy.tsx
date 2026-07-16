import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const tabs = [
  { key: 'international', label: 'International Group Packages' },
  { key: 'fit', label: 'FIT Packages' },
  { key: 'mice', label: 'M.I.C.E Packages' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

const content: Record<TabKey, { intro: string; rules: string[] }> = {
  international: {
    intro:
      'Cancellation charges for International Group Packages are calculated on the total tour cost and depend on how close to the departure date the cancellation is made.',
    rules: [
      '60 days or more before departure: registration/token amount forfeited.',
      '59 to 30 days before departure: 25% of tour cost forfeited.',
      '29 to 15 days before departure: 50% of tour cost forfeited.',
      '14 to 8 days before departure: 75% of tour cost forfeited.',
      '7 days or less before departure, or no-show: 100% of tour cost forfeited.',
      'Visa fees, insurance premiums and any non-refundable third-party costs already incurred are additionally deducted.',
    ],
  },
  fit: {
    intro:
      'Bespoke / FIT (Free Independent Traveler) packages are individually customized, so cancellation charges depend on the bookings already confirmed with hotels, airlines and local suppliers on your behalf.',
    rules: [
      'A minimum service/processing charge applies on every confirmed booking, regardless of cancellation timing.',
      'Hotel, airline and cruise cancellation charges are as per the respective supplier\u2019s policy, and are passed through to the guest.',
      'The remaining balance, after deducting supplier charges and our service fee, is refunded as per the standard refund timeline.',
    ],
  },
  mice: {
    intro:
      'M.I.C.E (Meetings, Incentives, Conferences & Exhibitions) packages typically involve venue, accommodation and vendor contracts booked well in advance, so cancellation terms are agreed at the time of contracting.',
    rules: [
      'Cancellation terms and charges are as specifically outlined in the signed proposal/agreement for each M.I.C.E event.',
      'Venue and vendor cancellation charges, where applicable as per their policies, are passed through to the client.',
      'Any advance paid toward venue or vendor blocking is non-refundable once the booking is confirmed with the supplier.',
    ],
  },
};

export default function CancellationPolicy() {
  const [active, setActive] = useState<TabKey>('international');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navigation />

      <section className="pt-32 pb-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cancellation Policy</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Please review the cancellation terms applicable to your package type below.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  active === tab.key
                    ? 'border-sky-500 text-sky-500'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {content[active].intro}
            </p>
            <ul className="space-y-3">
              {content[active].rules.map((rule, i) => (
                <li key={i} className="flex gap-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-slate-400 dark:text-slate-500 text-xs mt-6 text-center">
            Refunds, once approved, are processed within 15 working days under normal circumstances,
            and may take 30 to 90 days in certain cases depending on supplier/partner decisions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
