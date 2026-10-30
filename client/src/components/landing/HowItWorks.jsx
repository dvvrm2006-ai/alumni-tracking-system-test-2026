import { motion } from 'framer-motion';
import { UserPlus, Link2, TrendingUp } from 'lucide-react';

const steps = [
  { icon: UserPlus, title: 'Register', desc: 'Create a verified profile in under two minutes.' },
  { icon: Link2, title: 'Connect', desc: 'Find mentors, batchmates, and opportunities that match you.' },
  { icon: TrendingUp, title: 'Grow', desc: 'Turn connections into referrals, guidance, and real career moves.' },
];

export default function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-28">
      <div className="text-center max-w-lg mx-auto mb-20">
        <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">Process</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3">How it works</h2>
      </div>

      <div className="relative grid md:grid-cols-3 gap-16 md:gap-10">
        {/* Signature element: animated connector line traced through the sequence */}
        <svg
          className="hidden md:block absolute top-8 left-0 w-full h-2 -z-0"
          viewBox="0 0 100 4"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="16" y1="2" x2="84" y2="2"
            stroke="#3b5bfd"
            strokeWidth="0.6"
            strokeDasharray="1.5 2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </svg>

        {steps.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative z-10 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-brand-100 shadow-md shadow-brand-100/50 flex items-center justify-center mb-5">
              <Icon className="text-brand-600" size={26} />
            </div>
            <h3 className="font-display font-semibold text-lg text-ink mb-2">{title}</h3>
            <p className="text-sm text-slate-500 max-w-[220px] mx-auto leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
