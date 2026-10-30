export default function ProfileCard({ children }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-slate-200/60 overflow-hidden">
      <div className="h-28 bg-gradient-to-r from-brand-500 to-violet-500" />
      <div className="pb-8">{children}</div>
    </div>
  );
}
