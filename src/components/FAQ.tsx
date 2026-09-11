import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: 'General Enquiries',
    items: [
      {
        question: 'What is the legal company name of The Travellier?',
        answer: 'Travellier Hospitality Private Limited.',
      },
      {
        question: 'What is generally the size of a Group Tour?',
        answer:
          'Bespoke Leisure Groups: The minimum group size is 10 adult guests. Ready to Join Groups: The average group size is between 25 to 45 guests. Speciality Groups: The average group size is between 10 to 35 guests.',
      },
      {
        question: 'Who would be my co-travelers?',
        answer:
          'Bespoke Leisure Groups: You are free to select your co-travelers from your own circle — friends, family members, or colleagues of your choice. Ready to Join Groups: Your co-travelers can be any individual, of any profession, religion, region, or language — you will likely return with new additions to your friends list. Speciality Groups: Specially designed for Educational Excursion Groups, Community groups like Christians, Jain, LGBTQIA+, Muslims, Spiritual Groups, and Sports groups.',
      },
      {
        question: 'Will it be possible to extend my stay at a destination?',
        answer:
          'You can extend your stay provided you intimate us at the time of booking. Additional charges will apply. No extensions or alterations can be made once the tour is in progress.',
      },
      {
        question: 'What is the difference between Child, Infant, and Adult?',
        answer:
          'Infant: Below 2 years of age on the date of travel. Child: 2 years and above, and below 11 years. Adult: 11 years and above.',
      },
    ],
  },
  {
    title: 'Booking Procedure',
    items: [
      {
        question: 'How can I book a tour?',
        answer: 'You can book a The Travellier tour by visiting our office or remotely.',
      },
      {
        question: 'How many days prior to the tour should I do the booking?',
        answer:
          'The Travellier recommends booking your tour at least 9 months prior to the scheduled departure date. Most of our tours fill up approximately 5 months in advance.',
      },
      {
        question: 'What are the documents required to book a tour?',
        answer:
          'International Tour: Passport, PAN & Aadhaar. India Tour: Aadhaar / Voter ID Card & PAN.',
      },
    ],
  },
  {
    title: 'Pricing & Payment Procedure',
    items: [
      {
        question: 'What does the Tour Price include?',
        answer:
          'For Bespoke Leisure Groups & Ready to Join Groups, the tour price is generally inclusive of premium accommodation, meals, sightseeing, entrance fees, VISA processing fees, travel insurance, and professional Tour Manager services, as mentioned in your particular itinerary.',
      },
      {
        question: 'Why is the World Tour price quoted in Indian Rupees as well as in Foreign currency?',
        answer:
          'INR: Certain components such as air tickets, visa fees, documentation, and some administrative expenses are paid in Indian Rupees. Foreign Currency: Other components, including hotels or cruises, meals, local transport, sightseeing, entry fees, train or ferry tickets, guide, and tips are paid in the local or foreign currency of the destination. Quoting the tour price in two currencies helps present the cost structure more clearly and transparently.',
      },
      {
        question: 'What is TCS? How much TCS will apply on my tour?',
        answer:
          'TCS stands for Tax Collected at Source, a statutory requirement applicable on certain overseas tour payments, as prescribed by the Government of India. When applicable, TCS is collected at the time of payment and deposited with the authorities. Travellers may be able to claim credit for the TCS amount while filing their income tax returns, subject to prevailing tax rules.',
      },
      {
        question: 'What are the different payment modes for booking a tour?',
        answer:
          'You can pay by Bank transfer (NEFT/RTGS/IMPS), UPI of your choice, Debit card, Cheque or demand draft, or Credit card (a non-refundable convenience charge of 2.10% of the transaction amount applies).',
      },
    ],
  },
  {
    title: 'Documentation',
    items: [
      {
        question: 'What is a VISA and how should I obtain it?',
        answer:
          'VISA is short for Visitors Intending to Stay Abroad — permission granted by the embassy, high commission, or consulate of the country you wish to visit. For certain countries, a personal interview is also required. Our professionals will assist you in filing the VISA application, and the VISA facilitation fees are included in the group tour package price.',
      },
      {
        question: 'What is the possibility of getting a VISA?',
        answer:
          'Granting or non-granting of a VISA solely depends on the respective Consulate/Embassy. We only assist in filing the application — we neither assure nor guarantee a VISA to anyone, since it is beyond our control.',
      },
      {
        question: 'If my VISA is rejected and I need to cancel my travel plan, do I get a refund?',
        answer:
          'Yes, you can get a refund after deducting the VISA application fees and cancellation charges, if any, as per our Terms & Conditions.',
      },
      {
        question: 'Do I need Overseas Travel Insurance?',
        answer:
          'It is advisable to acquire adequate Overseas Travel Insurance for protection against damage, loss, accident, or injury on tour. For international group tours, the insurance is included in the tour price.',
      },
      {
        question: 'If I extend my holiday before or after the scheduled tour, what happens to my Visa/Insurance?',
        answer:
          'The Visa or Insurance included in the tour price covers only the tour duration. For your extended holiday, we will process your visa or insurance accordingly — you just need to pay the difference.',
      },
    ],
  },
  {
    title: 'During the Tour',
    items: [
      {
        question: 'How is the seating arrangement in the coach/bus/van/car decided?',
        answer:
          'Our professional Tour Manager alternates seating positions in the coach/bus/car every day, so every member of the group gets an equal seating experience.',
      },
      {
        question: 'Can we get a wheelchair on tour?',
        answer:
          'You must carry your own wheelchair if required — we do not provide a wheelchair or puller facility on tour. At the airport, a wheelchair can be booked in advance, subject to availability, and the airline may charge an additional amount.',
      },
      {
        question: 'Can we skip sightseeing on the group tour? Will we get a refund for skipped sightseeing?',
        answer:
          'Yes, you can skip sightseeing, but you will not be entitled to a refund since all services are pre-booked.',
      },
    ],
  },
  {
    title: 'Meals & Beverages',
    items: [
      {
        question: 'What type of meals are included on tour?',
        answer:
          'As per the tour itinerary, there is a pre-set menu with vegetarian and non-vegetarian options at the same restaurant(s).',
      },
      {
        question: 'Can I request a special meal?',
        answer:
          'Yes — special meals like Jain meals (no onion, garlic) or fasting meals are available subject to availability (under extreme circumstances, this may not always be possible). Options are limited, especially on international tours due to sector limitations. Baby meals can be arranged subject to prior intimation and availability; for in-between requirements, we recommend carrying sufficient baby food with you.',
      },
      {
        question: 'Can we carry liquor bottles and cigarettes on tour?',
        answer:
          'You can carry liquor bottles and cigarettes as per the respective airline and country policy; however, we enforce a strict "no smoking" and "no alcohol" policy in the coach or when with the group.',
      },
    ],
  },
  {
    title: 'Tour Manager',
    items: [
      {
        question: 'Does the Tour Manager assist us throughout the entire tour?',
        answer:
          'Yes, the Tour Manager will assist you throughout the tour, from India (specifically from the group departure airport).',
      },
      {
        question: 'In which language will the Tour Manager communicate with us on tour?',
        answer:
          'The Tour Manager will preferably communicate and give instructions in your local language, including Hindi and English.',
      },
    ],
  },
  {
    title: 'Before the Journey',
    items: [
      {
        question: 'Once we are on tour, how do our relatives get to know about our condition?',
        answer:
          'Your relatives may call the emergency contact number provided in the pre-departure information sheet. We also provide a copy of this sheet so it can be kept with your relatives, who can then contact you at the hotel directly.',
      },
      {
        question: 'When will we get to know the name of our Tour Manager?',
        answer:
          "The Tour Manager's name is usually shared along with the pre-departure information sheet, about 10 days prior to the group tour departure. Under unavoidable circumstances, the Tour Manager may change in the days leading up to the tour.",
      },
    ],
  },
  {
    title: 'Cancellation & Refunds',
    items: [
      {
        question: 'What is the cancellation policy for a group tour?',
        answer:
          'You can refer to the cancellation policy for a group tour mentioned in the Terms & Conditions section along with the Booking form.',
      },
      {
        question: 'How long does it take to process a refund?',
        answer:
          'Once approved, refunds are processed within 15 working days as per policy. In certain cases, depending on the waiver decision from suppliers, associates, airlines, or partners, processing can take 30 to 90 days.',
      },
      {
        question: 'What happens when The Travellier cancels a tour?',
        answer:
          'If the tour is cancelled by the Company, a full refund of the amount paid by the guest is processed within 30 working days of the cancellation. Refunds are processed via NEFT/RTGS and paid in Indian Rupees only, even if the original payment was made partly or fully in a foreign currency.',
      },
    ],
  },
];

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors">
      {/* Header */}
      <div className="bg-slate-900 dark:bg-slate-900 text-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-500/10 rounded-xl mb-5">
            <HelpCircle className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about booking, pricing, documentation, and life on tour with Travellier.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-10">
          {faqData.map((category, categoryIndex) => (
            <div key={category.title}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                {category.title}
              </h2>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const key = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={key}
                      className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900/40"
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="font-medium text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-sky-500 dark:text-sky-400' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-14 text-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-10 px-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Still have questions?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
            Our team is happy to help with anything not covered here.
          </p>
          <a
            href="/contact"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
