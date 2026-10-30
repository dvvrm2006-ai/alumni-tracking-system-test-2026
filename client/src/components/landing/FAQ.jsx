import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Is this platform free for alumni?', a: 'Yes. Your institution covers the platform cost — alumni and students never pay to join or use core features.' },
  { q: 'How is my profile verified?', a: 'Your institution confirms your graduation record before your profile goes live, so every listed alumnus is real and verified.' },
  { q: 'Can I use this to hire from my alma mater?', a: 'Yes — post openings directly to the job portal and they\u2019ll be visible to verified alumni and final-year students.' },
  { q: 'Is my data shared outside the platform?', a: 'No. Your profile is visible only to your institution\u2019s verified network, not indexed publicly or sold to third parties.' },
];

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className="border-b border-slate-100 py-5">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="font-medium text-ink">{q}</span>
        <ChevronDown
          className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={18}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-500 leading-relaxed pt-3 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="max-w-3xl mx-auto px-6 py-28">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">FAQ</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3">Common questions</h2>
      </div>

      <div>
        {faqs.map((item, i) => (
          <FAQItem
            key={item.q}
            {...item}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
