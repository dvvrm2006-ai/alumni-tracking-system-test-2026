import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchProfile, saveProfile } from '@/services/profileService';
import ProfilePhotoUploader from '@/components/profile/ProfilePhotoUploader';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    fetchProfile()
      .then((profile) => {
        setPhoto(profile.profilePhoto);
        setName(profile.name);
        reset({
          phone: profile.phone || '',
          currentCompany: profile.currentCompany || '',
          jobTitle: profile.jobTitle || '',
          experience: profile.experience || '',
          location: profile.location || '',
          bio: profile.bio || '',
          skills: (profile.skills || []).join(', '),
          linkedinUrl: profile.linkedinUrl || '',
          githubUrl: profile.githubUrl || '',
          portfolioUrl: profile.portfolioUrl || '',
        });
      })
      .finally(() => setLoading(false));
  }, [reset]);

  async function onSubmit(formValues) {
    setSubmitError('');
    try {
      await saveProfile({
        ...formValues,
        profilePhoto: photo,
        skills: formValues.skills
          ? formValues.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      });
      navigate('/profile');
      toast.success('Profile updated');
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to save changes. Please try again.');
    }
  }

  if (loading) {
    return <div className="min-h-[70vh] flex items-center justify-center text-slate-400 text-sm">Loading...</div>;
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all text-sm';

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-8">
        <h1 className="font-display text-2xl font-bold text-ink mb-1">Edit Profile</h1>
        <p className="text-sm text-slate-500 mb-8">Update your public alumni profile.</p>

        <div className="flex justify-center mb-8">
          <ProfilePhotoUploader currentPhoto={photo} name={name} onPhotoChange={setPhoto} />
        </div>

        {submitError && (
          <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Phone</label>
            <input className={inputClass} {...register('phone')} placeholder="+91 98765 43210" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Current Company</label>
            <input className={inputClass} {...register('currentCompany')} placeholder="Company name" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Job Title</label>
            <input className={inputClass} {...register('jobTitle')} placeholder="e.g. Software Engineer" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Experience</label>
            <input className={inputClass} {...register('experience')} placeholder="e.g. 2 years" />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Location</label>
            <input className={inputClass} {...register('location')} placeholder="City, Country" />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Bio</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              maxLength={500}
              {...register('bio', { maxLength: 500 })}
              placeholder="A short introduction about yourself"
            />
            {errors.bio && <span className="text-xs text-red-500">Bio must be 500 characters or fewer</span>}
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Skills (comma separated)</label>
            <input className={inputClass} {...register('skills')} placeholder="React, Node.js, MongoDB" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">LinkedIn URL</label>
            <input className={inputClass} {...register('linkedinUrl')} placeholder="https://linkedin.com/in/..." />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">GitHub URL</label>
            <input className={inputClass} {...register('githubUrl')} placeholder="https://github.com/..." />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">Portfolio URL</label>
            <input className={inputClass} {...register('portfolioUrl')} placeholder="https://yourdomain.com" />
          </div>

          <div className="sm:col-span-2 flex gap-3 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 disabled:opacity-60 transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:border-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
