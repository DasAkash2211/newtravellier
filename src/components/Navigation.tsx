import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
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

          <div className="flex items-center gap-4">
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
          isMobileMenuOpen ? 'max-h-[32rem] overflow-y-auto' : 'max-h-0'
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

          <Link
            to="/#tours"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center rounded-lg"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
