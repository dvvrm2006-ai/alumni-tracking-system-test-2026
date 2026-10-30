import { CalendarX } from 'lucide-react';

export default function EmptyEventState({ message = 'No events match your search.' }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <CalendarX className="text-slate-400" size={24} />
      </div>
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}
