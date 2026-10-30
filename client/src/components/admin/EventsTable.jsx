import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye } from 'lucide-react';

export default function EventsTable({ events, onDelete, onViewRegistrations }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left px-5 py-3 font-medium">Title</th>
            <th className="text-left px-5 py-3 font-medium">Date</th>
            <th className="text-left px-5 py-3 font-medium">Type</th>
            <th className="text-left px-5 py-3 font-medium">Registrations</th>
            <th className="text-left px-5 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {events.map((e) => (
            <tr key={e._id} className="hover:bg-slate-50/60">
              <td className="px-5 py-3 font-medium text-ink">{e.title}</td>
              <td className="px-5 py-3 text-slate-500">{new Date(e.eventDate).toLocaleDateString('en-IN')}</td>
              <td className="px-5 py-3 text-slate-500">{e.eventType}</td>
              <td className="px-5 py-3 text-slate-500">{e.registeredUsers?.length || 0} / {e.maximumParticipants}</td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewRegistrations(e)}
                    title="View Registrations"
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-300 hover:text-brand-600 transition-colors"
                  >
                    <Eye size={14} />
                  </button>
                  <Link
                    to={`/events/create?id=${e._id}`}
                    title="Edit"
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-300 hover:text-brand-600 transition-colors"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => onDelete(e)}
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
