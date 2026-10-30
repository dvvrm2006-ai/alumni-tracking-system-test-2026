import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminAlumniPage() {
  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Alumni</h1>
      <p className="text-sm text-slate-500 mb-8">
        Alumni records are managed through the main directory to avoid duplicating that data here.
      </p>

      <Link
        to="/alumni"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-100 shadow-sm text-sm font-medium text-brand-700 hover:border-brand-200 transition-colors"
      >
        Open Alumni Directory <ArrowUpRight size={15} />
      </Link>
    </AdminLayout>
  );
}
