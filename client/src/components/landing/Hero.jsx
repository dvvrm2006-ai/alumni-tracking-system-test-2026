import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-[32rem] h-[32rem] bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute top-10 right-0 w-[28rem] h-[28rem] bg-violet-400/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e2e8f0_1px,transparent_0)] [background-size:28px_28px] opacity-40" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 pt-24 pb-28 grid md:grid-cols-2 gap-16 items-center"
      >
        <div>
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full mb-6 font-sans"
          >
            <Sparkles size={14} /> Built for institutions, loved by alumni
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-ink"
          >
            One home for every
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
              graduate you've ever had
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-lg text-slate-500 max-w-md leading-relaxed">
            Directory, mentorship, events, and job referrals — replacing scattered
            spreadsheets with one platform your alumni actually want to open.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ink text-white font-medium shadow-lg shadow-ink/10 hover:bg-brand-600 transition-colors"
            >
              Get Started <ArrowRight size={17} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-brand-300 hover:text-brand-700 transition-colors"
            >
              <PlayCircle size={17} /> Learn More
            </a>
          </motion.div>
        </div>

        {/* Placeholder illustration */}
        <motion.div
          variants={item}
          className="relative aspect-square rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200 flex items-center justify-center"
        >
          <div className="absolute inset-6 rounded-[1.5rem] bg-gradient-to-br from-brand-50 to-violet-50 border border-brand-100" />
          <div className="relative grid grid-cols-2 gap-4 p-8">
            {['from-brand-400 to-brand-600', 'from-violet-400 to-violet-600', 'from-sky-400 to-brand-500', 'from-fuchsia-400 to-violet-500'].map(
              (grad, i) => (
                <div
                  key={i}
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${grad} shadow-lg`}
                  style={{ transform: `translateY(${i % 2 === 0 ? '0px' : '18px'})` }}
                />
              )
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
