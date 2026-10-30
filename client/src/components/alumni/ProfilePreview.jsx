export default function ProfilePreview({ photo, name, jobTitle, currentCompany }) {
  return (
    <div className="flex items-center gap-3">
      <img loading="lazy" src={photo} alt={name} className="w-14 h-14 rounded-xl object-cover bg-slate-100" />
      <div>
        <h3 className="font-display font-semibold text-ink leading-snug">{name}</h3>
        {(jobTitle || currentCompany) && (
          <p className="text-xs text-slate-500 mt-0.5">
            {jobTitle}
            {jobTitle && currentCompany && ' at '}
            {currentCompany}
          </p>
        )}
      </div>
    </div>
  );
}
