import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const faqData = [
  {
    category: 'General Enquiries',
    items: [
      {
        q: 'What is the legal company name of The Travellier?',
        a: 'Travellier Hospitality Private Limited.',
      },
      {
        q: 'What is generally the size of a Group Tour?',
        a: 'Bespoke Leisure Groups: minimum 10 adult guests. Ready to Join Groups: average 25 to 45 guests. Speciality Groups: average 10 to 35 guests.',
      },
      {
        q: 'Who would be my co-travelers?',
        a: 'Bespoke Leisure Groups: you choose your own circle of friends, family or colleagues. Ready to Join Groups: co-travelers can be anyone, of any profession, religion, region or language — you\u2019ll likely make new friends. Speciality Groups: designed for Educational Excursions and community groups such as Christians, Jain, LGBTQIA+, Muslims, Spiritual groups and Sports groups.',
      },
      {
        q: 'Will it be possible to extend my stay at a destination?',
        a: 'Yes, provided you inform us at the time of booking. Additional charges apply. No extensions or alterations can be made once the tour is in progress.',
      },
      {
        q: 'What is the difference between Child, Infant and Adult?',
        a: 'Infant: below 2 years on the date of travel. Child: 2 years and above, below 11 years. Adult: 11 years and above.',
      },
    ],
  },
  {
    category: 'Booking Procedure',
    items: [
      {
        q: 'How can I book a tour?',
        a: 'You can book a The Travellier tour by visiting our office or remotely.',
      },
      {
        q: 'How many days prior to the tour should I do the booking?',
        a: 'We recommend booking at least 9 months prior to the scheduled departure. Most tours fill up approximately 5 months in advance.',
      },
      {
        q: 'What are the documents required to book a tour?',
        a: 'International Tour: Passport, PAN & Aadhaar. India Tour: Aadhaar / Voter ID Card & PAN.',
      },
    ],
  },
  {
    category: 'Pricing & Payment Procedure',
    items: [
      {
        q: 'What does the Tour Price include?',
        a: 'For Bespoke Leisure Groups and Ready to Join Groups, the tour price generally includes premium accommodation, meals, sightseeing, entrance fees, VISA processing fees, travel insurance and professional Tour Manager services, as mentioned in your itinerary.',
      },
      {
        q: 'Why is the World Tour price quoted in Indian Rupees as well as Foreign currency?',
        a: 'INR covers components like air tickets, visa fees, documentation and administrative expenses. Foreign currency covers hotels, cruises, meals, local transport, sightseeing, entry fees, tickets, guides and tips. Quoting both helps present the cost structure transparently.',
      },
      {
        q: 'What is TCS? How much TCS will apply on my tour?',
        a: 'TCS (Tax Collected at Source) is a statutory requirement on certain overseas tour payments as prescribed by the Government of India. It is collected at the time of payment and deposited with the authorities. Travellers may be able to claim credit for it while filing income tax returns, subject to prevailing rules.',
      },
      {
        q: 'What are the different payment modes for booking a tour?',
        a: 'Bank transfer via NEFT/RTGS/IMPS, UPI, Debit card, Cheque or demand draft, or Credit card (a non-refundable convenience charge of 2.10% of the transaction amount applies).',
      },
    ],
  },
  {
    category: 'Documentations',
    items: [
      {
        q: 'What is VISA and how should I obtain it?',
        a: 'A VISA is permission granted by the embassy, high commission or consulate of the country you wish to visit; some countries require a personal interview. Our team assists with the application, and the facilitation fee is included in the group tour package price.',
      },
      {
        q: 'What is the possibility of getting a VISA?',
        a: 'Granting a VISA depends solely on the respective Consulate/Embassy. We assist with filing the application but cannot guarantee approval, as it is beyond our control.',
      },
      {
        q: 'If due to VISA rejection I need to cancel my travel plan, do I get a refund?',
        a: 'Yes, you can get a refund after deducting the VISA application fees and any applicable cancellation charges as per our Terms & Conditions.',
      },
      {
        q: 'Do I need Overseas Travel Insurance?',
        a: 'It is advisable to have adequate cover against damage, loss, accident or injury on tour. For international group tours, insurance is included in the tour price.',
      },
      {
        q: 'If I extend my holiday before or after the scheduled tour, what about my Visa/Insurance?',
        a: 'The Visa or Insurance included in the tour price covers only the tour duration. For an extended holiday, we will process it accordingly — you just pay the difference.',
      },
    ],
  },
  {
    category: 'During Tour',
    items: [
      {
        q: 'How is the seating arrangement in the coach/bus/van/car decided?',
        a: 'Our Tour Manager alternates seating positions daily so every group member gets equal seating satisfaction.',
      },
      {
        q: 'Can we get a wheelchair on tour?',
        a: 'You must carry your own wheelchair if required; we do not provide a wheelchair/puller facility on tour. Airport wheelchairs can be booked in advance subject to availability, and the airline may charge extra.',
      },
      {
        q: 'Can we skip sightseeing on the group tour? Will we get a refund?',
        a: 'Yes, you can skip sightseeing, but no refund applies since all services are pre-booked.',
      },
    ],
  },
  {
    category: 'Meals & Beverages',
    items: [
      {
        q: 'What type of meals are included on tour?',
        a: 'A pre-set menu with vegetarian/non-vegetarian options at the same restaurant, as per the itinerary.',
      },
      {
        q: 'Can I request a special meal?',
        a: 'Yes — Jain meal (no onion/garlic) or a fasting meal, subject to availability (options are limited on international tours). Baby meals can be arranged with prior notice and availability; we recommend carrying sufficient baby food as backup.',
      },
      {
        q: 'Can we carry liquor bottles and cigarettes on tour?',
        a: 'You may carry them as per the respective airline and country policy, but a strict "no smoking" and "no alcohol" policy is enforced in the coach or when with the group.',
      },
    ],
  },
  {
    category: 'Tour Manager',
    items: [
      {
        q: 'Does the Tour Manager assist us on the entire tour?',
        a: 'Yes, the Tour Manager assists you throughout the tour starting from the Group departure airport in India.',
      },
      {
        q: 'In which language will the Tour Manager communicate with us on tour?',
        a: 'The Tour Manager preferably communicates in your local languages, including Hindi and English.',
      },
    ],
  },
  {
    category: 'Before the Journey',
    items: [
      {
        q: 'Once we are on tour, how do our relatives get to know about our condition?',
        a: 'Relatives can call the emergency contact number in the pre-departure information sheet, or contact you directly at the hotel. We provide a copy of this sheet for your relatives to keep.',
      },
      {
        q: 'When will we get to know the name of our Tour Manager?',
        a: 'Usually shared along with the pre-departure information sheet, about 10 days prior to departure. Under unavoidable circumstances, the Tour Manager may change closer to the tour date.',
      },
    ],
  },
  {
    category: 'Cancellation & Refunds',
    items: [
      {
        q: 'What is the cancellation policy for a group tour?',
        a: 'Please refer to the cancellation policy in the Terms & Conditions section along with the Booking form.',
      },
      {
        q: 'How long does it take to process a refund?',
        a: 'Once approved, refunds are processed within 15 working days. In certain cases, it may take 30 to 90 days depending on waiver decisions from suppliers, associates, airlines or partners.',
      },
      {
        q: 'What happens when The Travellier cancels a tour?',
        a: 'A full refund is processed within 30 working days of cancellation, via NEFT/RTGS in Indian Rupees only — even if the original payment was made partly or fully in foreign currency.',
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-slate-900 dark:text-white">{q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-sky-500 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about booking, payments, documentation
            and traveling with The Travellier.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((section) => (
            <div key={section.category} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {section.category}
              </h2>
              <div className="h-1 w-12 bg-sky-500 rounded-full mb-6" />
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-6">
                {section.items.map((item) => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
