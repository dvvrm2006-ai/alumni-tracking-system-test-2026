import { MapPin, Briefcase } from 'lucide-react';

export default function ProfileHeader({ profile }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 px-8">
      <img
        src={profile.profilePhoto}
        alt={profile.name}
        className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
      />
      <div className="text-center sm:text-left pb-2">
        <h1 className="font-display text-2xl font-bold text-ink">{profile.name}</h1>
        {(profile.jobTitle || profile.currentCompany) && (
          <p className="text-slate-600 flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-sm">
            <Briefcase size={14} />
            {profile.jobTitle}
            {profile.jobTitle && profile.currentCompany && ' at '}
            {profile.currentCompany}
          </p>
        )}
        {profile.location && (
          <p className="text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-sm">
            <MapPin size={14} /> {profile.location}
          </p>
        )}
      </div>
    </div>
  );
}
