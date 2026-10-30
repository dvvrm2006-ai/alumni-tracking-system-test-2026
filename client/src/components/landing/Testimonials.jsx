import { Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rahul Verma', role: 'Placement Cell Head', text: 'Cut our alumni outreach effort in half. Everything finally lives in one place.' },
  { name: 'Ananya Iyer', role: 'Alumni, 2021 Batch', text: 'Got my current job through a referral I found on this platform.' },
  { name: 'Karan Patel', role: 'Alumni, 2018 Batch', text: 'The mentorship matching actually works — paired with someone in my exact field.' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 py-28">
      <div className="max-w-xl mb-14">
        <span className="text-xs font-semibold tracking-widest text-brand-600 uppercase">Feedback</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3">What people are saying</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7 flex flex-col">
            <Quote className="text-brand-200 mb-4" size={28} />
            <p className="text-slate-700 text-sm leading-relaxed flex-1">{t.text}</p>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="font-semibold text-sm text-ink">{t.name}</div>
              <div className="text-xs text-slate-500">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
