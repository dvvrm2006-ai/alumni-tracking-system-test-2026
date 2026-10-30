import { GraduationCap, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const quickLinks = ['Features', 'How it Works', 'Success Stories', 'FAQ'];

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 text-white font-display font-semibold text-lg mb-3">
            <GraduationCap className="text-brand-400" size={24} />
            AlumniConnect
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
            Connecting graduates, mentors, and institutions on one platform.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {quickLinks.map((item) => (
              <li key={item} className="hover:text-white transition-colors cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Mail size={14} /> hello@alumniconnect.app</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> New Delhi, India</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Connect</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-500 transition-colors">
              <Github size={16} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-500 transition-colors">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 text-sm text-slate-500 text-center">
        © {new Date().getFullYear()} AlumniConnect. Built for Smart India Hackathon.
      </div>
    </footer>
  );
}
