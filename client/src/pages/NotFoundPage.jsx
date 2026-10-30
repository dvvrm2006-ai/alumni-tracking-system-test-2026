import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <Compass className="text-slate-300 mb-4" size={40} />
      <h1 className="font-display text-5xl font-extrabold text-brand-500 mb-2">404</h1>
      <p className="text-gray-600 mb-6">This page doesn't exist.</p>
      <Link to="/" className="px-6 py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
