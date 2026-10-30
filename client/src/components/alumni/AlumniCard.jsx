import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, UserPlus } from 'lucide-react';
import ProfilePreview from '@/components/alumni/ProfilePreview';
import SkillsSection from '@/components/profile/SkillsSection';

function AlumniCard({ alumnus }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-100 transition-shadow p-6 flex flex-col gap-4"
    >
      <ProfilePreview
        photo={alumnus.profilePhoto}
        name={alumnus.name}
        jobTitle={alumnus.jobTitle}
        currentCompany={alumnus.currentCompany}
      />

      <div className="text-xs text-slate-500 space-y-1.5">
        {(alumnus.branch || alumnus.graduationYear) && (
          <div className="flex items-center gap-1.5">
            <GraduationCap size={13} className="text-brand-500 shrink-0" />
            {alumnus.branch}
            {alumnus.branch && alumnus.graduationYear && ' · '}
            {alumnus.graduationYear}
          </div>
        )}
        {alumnus.location && (
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-brand-500 shrink-0" /> {alumnus.location}
          </div>
        )}
      </div>

      {alumnus.skills?.length > 0 && <SkillsSection skills={alumnus.skills.slice(0, 3)} />}

      <div className="flex gap-2 mt-auto pt-2">
        <Link
          to={`/alumni/${alumnus._id}`}
          className="flex-1 text-center px-4 py-2 rounded-lg bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 transition-colors"
        >
          View Profile
        </Link>
        <button
          disabled
          title="Coming soon"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-400 text-xs font-medium cursor-not-allowed"
        >
          <UserPlus size={13} /> Connect
        </button>
      </div>
    </motion.div>
  );
}

export default memo(AlumniCard);
