import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const sections = [
  {
    title: '1. Booking & Confirmation',
    body: 'A booking is confirmed only upon receipt of the applicable advance payment and submission of required documents. Confirmation is subject to availability at the time of processing.',
  },
  {
    title: '2. Pricing',
    body: 'Tour prices are quoted based on prevailing rates for accommodation, airfare, currency exchange and taxes at the time of booking, and are subject to revision in case of significant fluctuations before departure, as communicated in advance.',
  },
  {
    title: '3. Documents & Eligibility',
    body: 'Guests are responsible for ensuring valid travel documents (passport, visa, ID proof) are in order. The Travellier assists with visa filing but does not guarantee approval, as this is solely at the discretion of the respective Consulate/Embassy.',
  },
  {
    title: '4. Changes to Itinerary',
    body: 'While every effort is made to operate the tour as per the published itinerary, sequence of sightseeing, hotels or flight timings may be altered due to circumstances beyond our control (weather, local conditions, supplier changes, etc.).',
  },
  {
    title: '5. Cancellations & Refunds',
    body: (
      <>
        Cancellation charges and refund timelines are governed by our{' '}
        <Link to="/cancellation-policy" className="text-sky-500 hover:underline">
          Cancellation Policy
        </Link>{' '}
        and{' '}
        <Link to="/refund-policy" className="text-sky-500 hover:underline">
          Refund Policy
        </Link>
        .
      </>
    ),
  },
  {
    title: '6. Liability',
    body: 'The Travellier acts as an agent for hotels, airlines, transport operators and other service providers, and is not liable for any loss, injury, delay or damage arising from the acts or omissions of such third parties.',
  },
  {
    title: '7. Travel Insurance',
    body: 'Guests are strongly advised to carry adequate travel insurance. For applicable international group tours, insurance is included in the package price as specified in the itinerary.',
  },
  {
    title: '8. Governing Law',
    body: 'These terms are governed by the laws of India, and any disputes are subject to the exclusive jurisdiction of the courts at the registered office location of Travellier Hospitality Private Limited.',
  },
];

export default function TermsAndConditions() {
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Please read these terms carefully before booking a tour with us.
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
