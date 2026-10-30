import { Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <LockKeyhole className="text-slate-300 mb-4" size={40} />
      <h1 className="font-display text-5xl font-extrabold text-brand-500 mb-2">401</h1>
      <p className="text-gray-600 mb-6">You need to be logged in to view this page.</p>
      <Link to="/login" className="px-6 py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors">
        Log In
      </Link>
    </div>
  );
}
