import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
  continents: [
    'Asia',
    'Europe',
    'Africa',
    'North America',
    'South America',
    'Australia & Oceania',
  ],
  company: [
    { label: 'Why Us', path: '/why-us' },
    { label: 'Our Team', path: '/our-team' },
    { label: 'Career', path: '/career' },
    { label: 'Contact Us', path: '/contact' },
  ],
  support: [
    { label: 'Travel News', path: '/travel-news' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
    { label: 'Cancellation Policy', path: '/cancellation-policy' },
    { label: 'Refund Policy', path: '/refund-policy' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Youtube, href: '#' },
  { icon: Linkedin, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img
                src="/logo-white.png"
                alt="Travellier"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm mb-5 max-w-sm">
              Crafting unforgettable journeys since 2009. We connect travelers with extraordinary destinations across the globe.
            </p>

            {/* Social Links merged here */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 bg-slate-800 rounded-lg hover:bg-sky-500 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Continents */}
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide uppercase text-slate-300">
              Continents
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.continents.map((link) => (
                <li key={link}>
                  <a href="#tours" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide uppercase text-slate-300">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide uppercase text-slate-300">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} Travellier. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <img
                src="https://img.icons8.com/color/48/visa.png"
                alt="Visa"
                className="h-6 opacity-50 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://img.icons8.com/color/48/mastercard-logo.png"
                alt="Mastercard"
                className="h-6 opacity-50 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://img.icons8.com/color/48/paypal.png"
                alt="PayPal"
                className="h-6 opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
