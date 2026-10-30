import { Ban, CheckCircle2, Trash2 } from 'lucide-react';

export default function UsersTable({ users, onToggleStatus, onDelete }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left px-5 py-3 font-medium">Profile</th>
            <th className="text-left px-5 py-3 font-medium">Name</th>
            <th className="text-left px-5 py-3 font-medium">Email</th>
            <th className="text-left px-5 py-3 font-medium">Role</th>
            <th className="text-left px-5 py-3 font-medium">Status</th>
            <th className="text-left px-5 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-slate-50/60">
              <td className="px-5 py-3">
                <img loading="lazy" src={u.profilePhoto} alt={u.name} className="w-9 h-9 rounded-lg object-cover bg-slate-100" />
              </td>
              <td className="px-5 py-3 font-medium text-ink">{u.name}</td>
              <td className="px-5 py-3 text-slate-500">{u.email}</td>
              <td className="px-5 py-3 text-slate-500 capitalize">{u.role}</td>
              <td className="px-5 py-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    u.accountStatus === 'suspended' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
                  }`}
                >
                  {u.accountStatus}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleStatus(u)}
                    title={u.accountStatus === 'suspended' ? 'Reactivate' : 'Suspend'}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-300 hover:text-brand-600 transition-colors"
                  >
                    {u.accountStatus === 'suspended' ? <CheckCircle2 size={14} /> : <Ban size={14} />}
                  </button>
                  <button
                    onClick={() => onDelete(u)}
                    title="Delete"
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
