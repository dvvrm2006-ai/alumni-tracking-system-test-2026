import { motion } from 'framer-motion';

const stories = [
  {
    name: 'Priya Sharma',
    company: 'Product Designer, Razorpay',
    story: 'Landed my role through an alumnus I found in the directory — one intro changed my whole trajectory.',
    photo: 'https://i.pravatar.cc/150?img=47',
  },
  {
    name: 'Arjun Mehta',
    company: 'SDE II, Flipkart',
    story: 'My mentor from the platform walked me through three mock interviews before my final round.',
    photo: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Sneha Reddy',
    company: 'Founder, Loop Health',
    story: 'Found my first two hires through alumni referrals posted right here on the job board.',
    photo: 'https://i.pravatar.cc/150?img=32',
  },
];

export default function SuccessStories() {
  return (
    <section className="bg-slate-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">Outcomes</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3">
            Alumni success stories
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7"
            >
              <p className="text-slate-600 text-sm leading-relaxed mb-6">"{s.story}"</p>
              <div className="flex items-center gap-3">
                <img loading="lazy" src={s.photo} alt={s.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-sm text-ink">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
