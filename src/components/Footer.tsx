import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
  destinations: [
    'Bali, Indonesia',
    'Swiss Alps',
    'Japan',
    'Maldives',
    'Iceland',
    'Egypt',
  ],
  company: [
    'About Us',
    'Our Team',
    'Careers',
    'Press',
    'Partners',
    'Blog',
  ],
  support: [
    'Help Center',
    'FAQs',
    'Contact Us',
    'Travel Insurance',
    'Terms & Conditions',
    'Privacy Policy',
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <img
                src="/logo-white.png"
                alt="Travellier"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Crafting unforgettable journeys since 2009. We connect travelers with extraordinary destinations across the globe.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, index) => (
                
                  key={index}
                  href={social.href}
                  className="p-2.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link}>
                  <a href="#tours" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#about" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) =>
                link === 'FAQs' ? (
                  <li key={link}>
                    <Link
                      to="/faq"
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ) : (
                  <li key={link}>
                    <a href="#contact" className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              {new Date().getFullYear()} Travellier. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <img
                src="https://img.icons8.com/color/48/visa.png"
                alt="Visa"
                className="h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://img.icons8.com/color/48/mastercard-logo.png"
                alt="Mastercard"
                className="h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://img.icons8.com/color/48/paypal.png"
                alt="PayPal"
                className="h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
