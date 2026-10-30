import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Settings</h1>
      <p className="text-sm text-slate-500 mb-8">Platform-level settings arrive in a later milestone.</p>

      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-8 text-sm text-slate-400">
        Nothing configurable here yet.
      </div>
    </AdminLayout>
  );
}
