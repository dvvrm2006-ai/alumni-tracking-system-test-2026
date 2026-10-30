import { X } from 'lucide-react';

export default function RegistrationsModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[70vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
          <h3 className="font-display font-semibold text-ink">Registrations — {event.title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {event.registeredUsers?.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No registrations yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {event.registeredUsers.map((u) => (
                <li key={u._id} className="flex items-center gap-3 py-3">
                  <img loading="lazy" src={u.profilePhoto} alt={u.name} className="w-9 h-9 rounded-lg object-cover bg-slate-100" />
                  <div>
                    <div className="text-sm font-medium text-ink">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
