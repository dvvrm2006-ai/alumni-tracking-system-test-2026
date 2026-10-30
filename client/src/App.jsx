import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';
import PageTransition from '@/components/common/PageTransition';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import EditProfilePage from '@/pages/EditProfilePage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import ForbiddenPage from '@/pages/ForbiddenPage';
import NotFoundPage from '@/pages/NotFoundPage';

const AlumniDirectoryPage = lazy(() => import('@/pages/AlumniDirectoryPage'));
const AlumniProfileView = lazy(() => import('@/pages/AlumniProfileView'));
const EventsPage = lazy(() => import('@/pages/EventsPage'));
const EventDetails = lazy(() => import('@/pages/EventDetails'));
const CreateEvent = lazy(() => import('@/pages/CreateEvent'));
const MyEvents = lazy(() => import('@/pages/MyEvents'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('@/pages/admin/AdminUsersPage'));
const AdminAlumniPage = lazy(() => import('@/pages/admin/AdminAlumniPage'));
const AdminEventsPage = lazy(() => import('@/pages/admin/AdminEventsPage'));
const AdminReportsPage = lazy(() => import('@/pages/admin/AdminReportsPage'));
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage'));

function PageFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <LoadingSpinner size={28} />
    </div>
  );
}

function Lazy({ children }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition><DashboardPage /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTransition><ProfilePage /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <PageTransition><EditProfilePage /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni"
          element={
            <ProtectedRoute>
              <Lazy><PageTransition><AlumniDirectoryPage /></PageTransition></Lazy>
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni/:id"
          element={
            <ProtectedRoute>
              <Lazy><PageTransition><AlumniProfileView /></PageTransition></Lazy>
            </ProtectedRoute>
          }
        />

        {/* Events */}
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Lazy><PageTransition><EventsPage /></PageTransition></Lazy>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <Lazy><PageTransition><EventDetails /></PageTransition></Lazy>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <ProtectedRoute>
              <Lazy><PageTransition><CreateEvent /></PageTransition></Lazy>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/my-events"
          element={
            <ProtectedRoute>
              <Lazy><PageTransition><MyEvents /></PageTransition></Lazy>
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Lazy><PageTransition><AdminDashboardPage /></PageTransition></Lazy>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Lazy><PageTransition><AdminUsersPage /></PageTransition></Lazy>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/alumni"
          element={
            <AdminRoute>
              <Lazy><PageTransition><AdminAlumniPage /></PageTransition></Lazy>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <Lazy><PageTransition><AdminEventsPage /></PageTransition></Lazy>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <Lazy><PageTransition><AdminReportsPage /></PageTransition></Lazy>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <Lazy><PageTransition><AdminSettingsPage /></PageTransition></Lazy>
            </AdminRoute>
          }
        />

        <Route path="/401" element={<PageTransition><UnauthorizedPage /></PageTransition>} />
        <Route path="/403" element={<PageTransition><ForbiddenPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
