import { GraduationCap } from 'lucide-react';

export default function AboutSection({ profile }) {
  return (
    <div className="space-y-6">
      {profile.bio && (
        <div>
          <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">About</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{profile.bio}</p>
        </div>
      )}

      {(profile.collegeName || profile.branch || profile.graduationYear) && (
        <div>
          <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Education</h3>
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <GraduationCap size={16} className="text-brand-500 mt-0.5 shrink-0" />
            <span>
              {profile.collegeName}
              {profile.branch && ` — ${profile.branch}`}
              {profile.graduationYear && ` (${profile.graduationYear})`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
