import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isWantToTravelOpen, setIsWantToTravelOpen] = useState(false);
  const [wantToTravelForm, setWantToTravelForm] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
  });
  const [wantToTravelStatus, setWantToTravelStatus] = useState('idle'); // idle | submitting | success | error
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock background scroll while the "Want to Travel" modal is open
  useEffect(() => {
    if (isWantToTravelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWantToTravelOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/#tours' },
    { name: 'Destinations', href: '/#destinations' },
    { name: 'Travel Updates', href: '/updates' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  const serviceLinks = [
    { name: 'Bespoke Leisure Groups', href: '/services/bespoke-leisure-groups' },
    { name: 'Ready to Join Groups', href: '/services/ready-to-join-groups' },
    { name: 'Customized Holidays', href: '/services/customized-holidays' },
    { name: 'Speciality Groups', href: '/services/speciality-groups' },
    { name: 'India Inbound', href: '/services/india-inbound' },
    { name: 'Flights', href: '/services/flights' },
    { name: 'Visa Assist', href: '/services/visa-assist' },
    { name: 'Insurance', href: '/services/insurance' },
    { name: 'Forex', href: '/services/forex' },
  ];

  const isHomePage = location.pathname === '/';

  const closeWantToTravel = () => {
    setIsWantToTravelOpen(false);
    setWantToTravelStatus('idle');
    setWantToTravelForm({ firstName: '', lastName: '', mobile: '', email: '' });
  };

  const handleWantToTravelChange = (e) => {
    const { name, value } = e.target;
    setWantToTravelForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWantToTravelSubmit = async (e) => {
    e.preventDefault();
    setWantToTravelStatus('submitting');
    try {
      // TODO: wire this up to the actual lead-capture endpoint.
      // await fetch('/api/leads/want-to-travel', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(wantToTravelForm),
      // });
      setWantToTravelStatus('success');
    } catch (err) {
      setWantToTravelStatus('error');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center group"
          >
            <img
              src={isDark || (!isScrolled && isHomePage) ? '/logo-white.png' : '/logo-blue.png'}
              alt="Travellier"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) =>
              link.href.startsWith('/#') || link.href === '/' ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${
                    isScrolled || !isHomePage
                      ? 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${
                    isScrolled || !isHomePage
                      ? 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}

            {/* Services dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-300 group ${
                  isScrolled || !isHomePage
                    ? 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-200 origin-top ${
                  isServicesOpen
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="py-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="block px-5 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(3).map((link) =>
              link.href.startsWith('/#') || link.href === '/' ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${
                    isScrolled || !isHomePage
                      ? 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${
                    isScrolled || !isHomePage
                      ? 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsWantToTravelOpen(true)}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800'
                  : 'border-white/60 text-white hover:bg-white/10'
              }`}
            >
              Want to Travel
            </button>

            <Link
              to="/#tours"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Now
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isScrolled || !isHomePage
                  ? 'text-slate-600 dark:text-slate-300'
                  : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[36rem] overflow-y-auto' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
          {navLinks.slice(0, 3).map((link) =>
            link.href.startsWith('/#') || link.href === '/' ? (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            )
          )}

          {/* Services accordion */}
          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isMobileServicesOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="pl-4 py-1 space-y-1">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileServicesOpen(false);
                    }}
                    className="block px-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(3).map((link) =>
            link.href.startsWith('/#') || link.href === '/' ? (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            )
          )}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsWantToTravelOpen(true);
            }}
            className="block w-full px-4 py-3 border border-sky-500 text-sky-600 dark:text-sky-400 text-center rounded-lg"
          >
            Want to Travel
          </button>

          <Link
            to="/#tours"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center rounded-lg"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* "Want to Travel" modal */}
      {isWantToTravelOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="want-to-travel-title"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeWantToTravel}
          />

          {/* modal card */}
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8">
            <button
              onClick={closeWantToTravel}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {wantToTravelStatus === 'success' ? (
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  Thank you!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  We've received your details. Our travel team will reach out to you shortly.
                </p>
                <button
                  onClick={closeWantToTravel}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl transition-all duration-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3
                  id="want-to-travel-title"
                  className="text-xl font-semibold text-slate-800 dark:text-white mb-1"
                >
                  Want to Travel?
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Share your details and we'll get in touch to plan your trip.
                </p>

                <form onSubmit={handleWantToTravelSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="wtt-first-name"
                        className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                      >
                        First Name
                      </label>
                      <input
                        id="wtt-first-name"
                        name="firstName"
                        type="text"
                        required
                        value={wantToTravelForm.firstName}
                        onChange={handleWantToTravelChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="wtt-last-name"
                        className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                      >
                        Last Name
                      </label>
                      <input
                        id="wtt-last-name"
                        name="lastName"
                        type="text"
                        required
                        value={wantToTravelForm.lastName}
                        onChange={handleWantToTravelChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="wtt-mobile"
                      className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                    >
                      Mobile No.
                    </label>
                    <input
                      id="wtt-mobile"
                      name="mobile"
                      type="tel"
                      required
                      value={wantToTravelForm.mobile}
                      onChange={handleWantToTravelChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="wtt-email"
                      className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="wtt-email"
                      name="email"
                      type="email"
                      required
                      value={wantToTravelForm.email}
                      onChange={handleWantToTravelChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  {wantToTravelStatus === 'error' && (
                    <p className="text-sm text-red-500">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={wantToTravelStatus === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {wantToTravelStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
