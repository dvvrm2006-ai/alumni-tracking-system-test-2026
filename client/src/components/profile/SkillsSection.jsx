export default function SkillsSection({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
