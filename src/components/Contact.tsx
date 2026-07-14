import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase.from('site_settings').select('key, value');
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((s: { key: string; value: string }) => {
        map[s.key] = s.value;
      });
      setSettings(map);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.name,
      email: formData.email,
      destination: formData.destination,
      message: formData.message,
    });
    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', email: '', destination: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
    setSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: settings.phone || '+1 (555) 123-4567',
      subtext: 'Mon-Fri, 9am-6pm EST',
    },
    {
      icon: Mail,
      title: 'Email',
      value: settings.email || 'hello@travellier.com',
      subtext: 'We reply within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Office',
      value: settings.office_address || '123 Travel Lane, New York, NY 10001',
      subtext: 'Come visit us',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Plan Your Dream Trip
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Ready to start your adventure? Our travel experts are here to help you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
              {submitted && (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-center font-medium">
                  Thank you for your inquiry! We will get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Dream Destination
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="">Select a destination</option>
                    <option value="bali">Bali, Indonesia</option>
                    <option value="switzerland">Swiss Alps</option>
                    <option value="japan">Japan</option>
                    <option value="maldives">Maldives</option>
                    <option value="iceland">Iceland</option>
                    <option value="peru">Peru</option>
                    <option value="kenya">Kenya Safari</option>
                    <option value="egypt">Egypt</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your dream vacation..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                  <info.icon className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {info.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">{info.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{info.subtext}</p>
                </div>
              </div>
            ))}

            <div className="p-6 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="font-semibold text-lg">Support Hours</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sky-100">
                <div>
                  <p className="font-medium text-white">Monday - Friday</p>
                  <p>9:00 AM - 6:00 PM EST</p>
                </div>
                <div>
                  <p className="font-medium text-white">Weekend</p>
                  <p>10:00 AM - 4:00 PM EST</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
              <div className="p-3 bg-emerald-500 rounded-xl">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Need Instant Help?</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer hover:underline">
                  Start a live chat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
