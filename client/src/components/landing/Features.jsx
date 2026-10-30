import { motion } from 'framer-motion';
import { Users, Briefcase, Handshake, Calendar, Share2, Compass } from 'lucide-react';

const features = [
  { icon: Users, title: 'Alumni Directory', desc: 'Searchable, verified profiles of every graduate across every batch.' },
  { icon: Briefcase, title: 'Job Portal', desc: 'Alumni post openings and refer students directly, no middleman.' },
  { icon: Handshake, title: 'Mentorship', desc: 'Match students with alumni mentors by domain and interest.' },
  { icon: Calendar, title: 'Events', desc: 'Organize reunions, webinars, and meetups with built-in RSVPs.' },
  { icon: Share2, title: 'Networking', desc: 'Discover alumni by company, city, or industry in one search.' },
  { icon: Compass, title: 'Career Guidance', desc: 'Structured guidance sessions from alumni working in your target field.' },
];

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-28">
      <div className="max-w-xl mb-14">
        <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">Platform</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3">
          Everything your network needs, nothing it doesn't
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group p-7 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-slate-200/60 hover:border-brand-100 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-500 transition-colors duration-300">
              <Icon className="text-brand-600 group-hover:text-white transition-colors duration-300" size={22} />
            </div>
            <h3 className="font-display font-semibold text-lg text-ink mb-1.5">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
