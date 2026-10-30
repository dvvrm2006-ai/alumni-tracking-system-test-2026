import { useEffect, useState } from 'react';
import { Users, GraduationCap, CalendarDays, CalendarClock, UserCheck } from 'lucide-react';
import { fetchDashboardStats } from '@/services/adminService';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardStats().then(setStats);
  }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Dashboard</h1>
      <p className="text-sm text-slate-500 mb-8">Overview of your alumni network.</p>

      {!stats ? (
        <p className="text-sm text-slate-400">Loading stats...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard icon={Users} label="Total Users" value={stats.totalUsers} />
          <StatCard icon={GraduationCap} label="Total Alumni" value={stats.totalAlumni} />
          <StatCard icon={CalendarDays} label="Total Events" value={stats.totalEvents} />
          <StatCard icon={CalendarClock} label="Upcoming Events" value={stats.upcomingEvents} />
          <StatCard icon={UserCheck} label="Registered Users" value={stats.registeredUsers} />
        </div>
      )}
    </AdminLayout>
  );
}
