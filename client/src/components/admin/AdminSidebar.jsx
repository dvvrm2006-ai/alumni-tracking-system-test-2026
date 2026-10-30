import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, CalendarDays, BarChart3, Settings } from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/alumni', label: 'Alumni', icon: GraduationCap },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-slate-100 bg-white/80 backdrop-blur-xl min-h-[calc(100vh-64px)] py-8 px-4">
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-500 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <Icon size={16} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
