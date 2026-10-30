import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, Users, CalendarDays, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="min-h-[70vh] max-w-3xl mx-auto px-6 py-16">
      <div className="rounded-2xl border border-slate-100 shadow-sm p-8 bg-white">
        <h1 className="font-display text-2xl font-bold text-ink mb-1">
          Welcome, {user?.name || 'there'} 👋
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          This is a placeholder dashboard — features arrive in later milestones.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
          >
            <User size={16} /> View Profile
          </Link>
          <Link
            to="/alumni"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:border-brand-300 hover:text-brand-700 transition-colors"
          >
            <Users size={16} /> Browse Directory
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:border-brand-300 hover:text-brand-700 transition-colors"
          >
            <CalendarDays size={16} /> Browse Events
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:border-brand-300 hover:text-brand-700 transition-colors"
            >
              <LayoutDashboard size={16} /> Admin Panel
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:border-red-300 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </div>
    </div>
  );
}
