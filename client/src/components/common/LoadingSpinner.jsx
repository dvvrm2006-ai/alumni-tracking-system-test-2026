export default function LoadingSpinner({ size = 22, className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className="rounded-full border-2 border-slate-200 border-t-brand-500 animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
