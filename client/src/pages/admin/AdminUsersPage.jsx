import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchAdminUsers, updateUserStatus, deleteAdminUser } from '@/services/adminService';
import AdminLayout from '@/components/admin/AdminLayout';
import UsersTable from '@/components/admin/UsersTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function AdminUsersPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchAdminUsers().then(setUsers).catch(() => toast.error('Could not load users'));
  }, []);

  async function handleToggleStatus(user) {
    const nextStatus = user.accountStatus === 'suspended' ? 'active' : 'suspended';
    try {
      const updated = await updateUserStatus(user._id, nextStatus);
      setUsers((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
      toast.success(nextStatus === 'suspended' ? `${user.name} suspended` : `${user.name} reactivated`);
    } catch {
      toast.error('Could not update status');
    }
  }

  async function handleDelete(user) {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return;
    try {
      await deleteAdminUser(user._id);
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
      toast.success(`${user.name} deleted`);
    } catch {
      toast.error('Could not delete user');
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Users</h1>
      <p className="text-sm text-slate-500 mb-8">Manage every account on the platform.</p>

      {!users ? (
        <LoadingSpinner className="py-12" />
      ) : (
        <UsersTable users={users} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
      )}
    </AdminLayout>
  );
}
