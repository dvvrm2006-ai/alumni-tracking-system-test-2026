import { Linkedin, Github, Globe } from 'lucide-react';

export default function SocialLinks({ linkedinUrl, githubUrl, portfolioUrl }) {
  const links = [
    { href: linkedinUrl, icon: Linkedin, label: 'LinkedIn' },
    { href: githubUrl, icon: Github, label: 'GitHub' },
    { href: portfolioUrl, icon: Globe, label: 'Portfolio' },
  ].filter((link) => link.href);

  if (links.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">Links</h3>
      <div className="flex gap-2">
        {links.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-colors"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}
