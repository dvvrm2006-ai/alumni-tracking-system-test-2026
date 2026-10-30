import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 px-8 py-10 max-w-6xl">{children}</div>
    </div>
  );
}
