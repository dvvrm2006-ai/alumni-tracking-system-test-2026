import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { fetchProfile } from '@/services/profileService';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AboutSection from '@/components/profile/AboutSection';
import SkillsSection from '@/components/profile/SkillsSection';
import SocialLinks from '@/components/profile/SocialLinks';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .catch(() => setError('Could not load your profile. Please try again.'));
  }, []);

  if (error) {
    return <div className="min-h-[70vh] flex items-center justify-center text-red-500 text-sm">{error}</div>;
  }

  if (!profile) {
    return <div className="min-h-[70vh] flex items-center justify-center text-slate-400 text-sm">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <ProfileCard>
          <ProfileHeader profile={profile} />

          <div className="px-8 mt-6 flex justify-end">
            <Link
              to="/profile/edit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
            >
              <Pencil size={15} /> Edit Profile
            </Link>
          </div>

          <div className="px-8 mt-8 space-y-8">
            <AboutSection profile={profile} />
            <SkillsSection skills={profile.skills} />
            <SocialLinks linkedinUrl={profile.linkedinUrl} githubUrl={profile.githubUrl} portfolioUrl={profile.portfolioUrl} />
          </div>
        </ProfileCard>
      </motion.div>
    </div>
  );
}
