import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const sections = [
  {
    title: 'Standard Refund Timeline',
    body: 'Once a refund request is approved, the amount is processed within 15 working days. In certain cases \u2014 depending on the waiver decision required from suppliers, associates, airlines or partners \u2014 processing may take between 30 to 90 days.',
  },
  {
    title: 'Refund Mode & Currency',
    body: 'All refunds are processed via NEFT/RTGS and paid in Indian Rupees (INR) only, even if the original tour payment was made partly or fully in a foreign currency.',
  },
  {
    title: 'Refunds Due to VISA Rejection',
    body: 'If your travel plan is cancelled due to VISA rejection, a refund is issued after deducting the VISA application fees and any applicable cancellation charges as per our Cancellation Policy and Terms & Conditions.',
  },
  {
    title: 'Refunds When The Travellier Cancels a Tour',
    body: 'If a tour is cancelled by the Company, a full refund of the amount paid by the guest is processed within 30 working days of the cancellation date.',
  },
  {
    title: 'Non-Refundable Components',
    body: 'Certain components \u2014 including but not limited to visa facilitation fees, non-refundable convenience charges on credit card payments (2.10% of transaction amount), and supplier charges already incurred \u2014 are deducted before the refund amount is calculated.',
  },
];

export default function RefundPolicy() {
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            How and when refunds are processed for cancelled or amended bookings.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{s.title}</h2>
              <div className="h-1 w-10 bg-sky-500 rounded-full mb-3" />
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 text-sm text-slate-500 dark:text-slate-400">
            For refund terms specific to your package type (Bespoke Leisure, Ready to Join, or M.I.C.E),
            please refer to our{' '}
            <Link to="/cancellation-policy" className="text-sky-500 hover:underline">
              Cancellation Policy
            </Link>
            .
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
