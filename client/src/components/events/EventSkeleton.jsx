export default function EventSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden animate-pulse">
      <div className="w-full h-36 bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-3 bg-slate-100 rounded w-2/3" />
        <div className="h-3 bg-slate-100 rounded w-1/3" />
        <div className="h-8 bg-slate-100 rounded-lg mt-4" />
      </div>
    </div>
  );
}
