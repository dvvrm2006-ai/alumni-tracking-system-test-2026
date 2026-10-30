export default function AlumniCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-slate-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-slate-100 rounded w-2/3" />
          <div className="h-3 bg-slate-100 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-3 bg-slate-100 rounded w-1/3" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-14 bg-slate-100 rounded-full" />
        <div className="h-6 w-14 bg-slate-100 rounded-full" />
      </div>
      <div className="mt-5 h-8 bg-slate-100 rounded-lg" />
    </div>
  );
}
