import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Bespoke Leisure Groups', href: '/bespoke-leisure-groups' },
  { name: 'Ready to Join Groups', href: '/ready-to-join-groups' },
  { name: 'Customized Holidays', href: '/customized-holidays' },
  { name: 'MICE', href: '/mice' },
  { name: 'Speciality Groups', href: '/speciality-groups' },
  { name: 'India Inbound', href: '/india-inbound' },
  { name: 'Flights', href: '/flights' },
  { name: 'Visa Assist', href: '/visa-assist' },
  { name: 'Insurance', href: '/insurance' },
  { name: 'Forex', href: '/forex' },
];

const initialTravelForm = { firstName: '', lastName: '', mobile: '', email: '' };

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [travelForm, setTravelForm] = useState(initialTravelForm);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFormOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFormOpen]);

  useEffect(() => {
    if (!isFormOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsFormOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFormOpen]);

  const isHomePage = location.pathname === '/';
  const logoSrc = isScrolled || !isHomePage
    ? (isDark ? '/logo-white.png' : '/logo-blue.png')
    : '/logo-white.png';

  const handleTravelFormChange = (field) => (e) => {
    setTravelForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleTravelFormSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to the actual lead-capture backend (e.g. a Supabase
    // table or API route) — right now it just logs, resets, and closes.
    console.log('Want to Travel submission:', travelForm);
    setTravelForm(initialTravelForm);
    setIsFormOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <img
                src={logoSrc}
                alt="Travellier"
                className="h-10 w-auto transition-all duration-300"
              />
            </Link>

            <div className="hidden md:flex flex-1 min-w-0 mx-6">
              <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                {navLinks.map((link) =>
                  link.href.startsWith('/#') || link.href === '/' ? (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`relative flex-shrink-0 text-sm font-medium transition-colors duration-300 group ${
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
                      className={`relative flex-shrink-0 text-sm font-medium transition-colors duration-300 group ${
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
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
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
                onClick={() => setIsFormOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Want to Travel
              </button>

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
          className={`md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0 overflow-hidden'
          }`}
        >
          <div className="px-4 py-4 space-y-2 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
            {navLinks.map((link) =>
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
                setIsFormOpen(true);
              }}
              className="block w-full px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center rounded-lg"
            >
              Want to Travel
            </button>
          </div>
        </div>
      </nav>

      {/* Want to Travel modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          />
          <div
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="want-to-travel-heading"
          >
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="want-to-travel-heading" className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Want to Travel?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Share your details and our team will reach out.
            </p>

            <form onSubmit={handleTravelFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    value={travelForm.firstName}
                    onChange={handleTravelFormChange('firstName')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    value={travelForm.lastName}
                    onChange={handleTravelFormChange('lastName')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Mobile No
                </label>
                <input
                  type="tel"
                  name="mobile"
                  autoComplete="tel"
                  required
                  value={travelForm.mobile}
                  onChange={handleTravelFormChange('mobile')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={travelForm.email}
                  onChange={handleTravelFormChange('email')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
