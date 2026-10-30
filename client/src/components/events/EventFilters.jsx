const timeframes = [
  { value: '', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
];

export default function EventFilters({ filters, onChange }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        value={filters.category || ''}
        onChange={(e) => set('category', e.target.value)}
        placeholder="Category"
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
      />

      <select
        value={filters.eventType || ''}
        onChange={(e) => set('eventType', e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
      >
        <option value="">All Types</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>

      <div className="flex rounded-lg border border-slate-200 overflow-hidden">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => set('timeframe', tf.value)}
            className={`px-3 py-2 text-sm transition-colors ${
              (filters.timeframe || '') === tf.value ? 'bg-brand-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>
    </div>
  );
}
