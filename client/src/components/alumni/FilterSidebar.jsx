import { SlidersHorizontal } from 'lucide-react';

const fields = [
  { key: 'company', label: 'Company', placeholder: 'e.g. Google' },
  { key: 'branch', label: 'Branch', placeholder: 'e.g. CSE' },
  { key: 'graduationYear', label: 'Graduation Year', placeholder: 'e.g. 2022' },
  { key: 'location', label: 'Location', placeholder: 'e.g. Bengaluru' },
  { key: 'skills', label: 'Skills', placeholder: 'e.g. React, Node.js' },
  { key: 'experience', label: 'Min. Experience (years)', placeholder: 'e.g. 2' },
];

export default function FilterSidebar({ filters, onChange, onClear }) {
  function handleField(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <aside className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 h-fit">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-ink flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-brand-500" /> Filters
        </h3>
        <button onClick={onClear} className="text-xs text-slate-400 hover:text-brand-600">
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">{label}</label>
            <input
              value={filters[key] || ''}
              onChange={(e) => handleField(key, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
