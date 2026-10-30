export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
      <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
        <Icon className="text-brand-600" size={19} />
      </div>
      <div className="font-display text-2xl font-bold text-ink">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}
