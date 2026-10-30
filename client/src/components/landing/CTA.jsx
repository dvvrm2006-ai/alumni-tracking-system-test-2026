import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-brand-900 px-10 py-20 text-center">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />

        <div className="relative">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Bring your alumni network into one place
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-9">
            Set up your institution's page in minutes and start onboarding graduates today.
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-ink font-semibold hover:bg-slate-100 transition-colors"
          >
            Create your account <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
