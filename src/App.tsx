import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import InvitationPopup from './components/InvitationPopup';
import Hero from './components/Hero';
import CatchyBanner from './components/CatchyBanner';
import CountryFlags from './components/CountryFlags';
import Tours from './components/Tours';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TourDetail from './pages/TourDetail';
import VRExperience from './pages/VRExperience';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTours from './pages/admin/AdminTours';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminContacts from './pages/admin/AdminContacts';
import AdminVRVideos from './pages/admin/AdminVRVideos';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminSettings from './pages/admin/AdminSettings';
import FAQ from './pages/FAQ';
import CancellationPolicy from './pages/CancellationPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

function HomePage() {
  return (
    <>
      <InvitationPopup />
      <Hero />
      <CatchyBanner />
      <CountryFlags />
      <Tours />
      <About />
      <Testimonials />
      <Newsletter />
      <Contact />
      <Footer />
    </>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navigation />
                    <HomePage />
                  </>
                }
              />
              <Route
                path="/tour/:id"
                element={
                  <>
                    <Navigation />
                    <TourDetail />
                  </>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/vr" element={<VRExperience />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="tours" element={<AdminTours />} />
                <Route path="vr-videos" element={<AdminVRVideos />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="newsletter" element={<AdminNewsletter />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
