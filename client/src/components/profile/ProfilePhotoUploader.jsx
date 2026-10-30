import { useState } from 'react';
import { Camera } from 'lucide-react';

/**
 * NOTE ON IMAGE STORAGE:
 * Cloudinary isn't configured yet, so `uploadPhoto()` below just returns a
 * placeholder identicon URL instead of actually persisting the file anywhere.
 * The preview shown to the user IS the real selected image (via a local
 * object URL) so the UX feels real, but only a placeholder URL is what
 * actually gets saved to the backend for now.
 *
 * To wire up Cloudinary later: replace the body of `uploadPhoto()` with an
 * actual upload call (e.g. POST the file to a Cloudinary unsigned upload
 * preset) and return the resulting `secure_url`. Nothing else in this
 * component, or in EditProfilePage, needs to change.
 */
async function uploadPhoto(file, seedName) {
  // TODO(Cloudinary): swap this placeholder for a real upload call.
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seedName || 'User')}`;
}

export default function ProfilePhotoUploader({ currentPhoto, name, onPhotoChange }) {
  const [preview, setPreview] = useState(currentPhoto);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // instant local preview of the real image
    setUploading(true);
    try {
      const placeholderUrl = await uploadPhoto(file, name);
      onPhotoChange(placeholderUrl); // what actually gets sent to the backend
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <img
          src={preview}
          alt="Profile"
          className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
        />
        <label className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-brand-600 transition-colors">
          <Camera size={15} />
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      {uploading && <span className="text-xs text-slate-400">Uploading...</span>}
    </div>
  );
}
