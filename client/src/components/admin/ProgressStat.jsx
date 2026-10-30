export default function ProgressStat({ label, value, total }) {
  const pct = total > 0 ? Math.min(Math.round((value / total) * 100), 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-ink">{value} / {total} ({pct}%)</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
