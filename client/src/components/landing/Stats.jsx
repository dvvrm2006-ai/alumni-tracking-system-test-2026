import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { target: 5000, suffix: '+', label: 'Alumni' },
  { target: 250, suffix: '+', label: 'Companies' },
  { target: 1000, suffix: '+', label: 'Placements' },
  { target: 120, suffix: '+', label: 'Mentors' },
];

function StatCard({ target, suffix, label }) {
  const [ref, value] = useCountUp(target);

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-white border border-slate-100 shadow-sm px-6 py-8 text-center"
    >
      <div className="font-display text-4xl font-bold text-ink">
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
