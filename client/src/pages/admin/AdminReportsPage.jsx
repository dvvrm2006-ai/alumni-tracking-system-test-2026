import { useEffect, useState } from 'react';
import { fetchDashboardStats } from '@/services/adminService';
import AdminLayout from '@/components/admin/AdminLayout';
import ProgressStat from '@/components/admin/ProgressStat';

export default function AdminReportsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardStats().then(setStats);
  }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Reports</h1>
      <p className="text-sm text-slate-500 mb-8">A quick read on platform engagement.</p>

      {!stats ? (
        <p className="text-sm text-slate-400">Loading report data...</p>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-8 space-y-6 max-w-xl">
          <ProgressStat label="Alumni share of total users" value={stats.totalAlumni} total={stats.totalUsers} />
          <ProgressStat label="Events happening soon" value={stats.upcomingEvents} total={stats.totalEvents} />
          <ProgressStat
            label="Average registrations per event"
            value={stats.registeredUsers}
            total={stats.totalEvents * 10 || 1}
          />
        </div>
      )}
    </AdminLayout>
  );
}
