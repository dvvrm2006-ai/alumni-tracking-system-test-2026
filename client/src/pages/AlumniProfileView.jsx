import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { fetchAlumniById } from '@/services/alumniService';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AboutSection from '@/components/profile/AboutSection';
import SkillsSection from '@/components/profile/SkillsSection';
import SocialLinks from '@/components/profile/SocialLinks';

export default function AlumniProfileView() {
  const { id } = useParams();
  const [alumnus, setAlumnus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setAlumnus(null);
    setError('');
    fetchAlumniById(id)
      .then(setAlumnus)
      .catch(() => setError('Could not load this profile. It may no longer exist.'));
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/alumni" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 mb-6 transition-colors">
        <ArrowLeft size={15} /> Back to Directory
      </Link>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!error && !alumnus && (
        <div className="text-center py-20 text-slate-400 text-sm">Loading profile...</div>
      )}

      {alumnus && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <ProfileCard>
            <ProfileHeader profile={alumnus} />

            <div className="px-8 mt-6 flex justify-end">
              <button
                disabled
                title="Coming soon"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium opacity-60 cursor-not-allowed"
              >
                <Mail size={15} /> Contact
              </button>
            </div>

            <div className="px-8 mt-8 space-y-8">
              <AboutSection profile={alumnus} />
              <SkillsSection skills={alumnus.skills} />
              <SocialLinks
                linkedinUrl={alumnus.linkedinUrl}
                githubUrl={alumnus.githubUrl}
                portfolioUrl={alumnus.portfolioUrl}
              />
            </div>
          </ProfileCard>
        </motion.div>
      )}
    </div>
  );
}
