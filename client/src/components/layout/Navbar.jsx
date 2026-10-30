import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <GraduationCap className="text-brand-500" size={24} />
          AlumniConnect
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm text-gray-600 hover:text-brand-600">Login</Link>
          <Link to="/register" className="text-sm bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600">
            Register
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <Link to="/login" className="text-sm text-gray-600">Login</Link>
          <Link to="/register" className="text-sm text-brand-600 font-medium">Register</Link>
        </div>
      )}
    </header>
  );
}
