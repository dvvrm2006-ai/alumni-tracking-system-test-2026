import { useForm } from 'react-hook-form';

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all text-sm';

export default function EventForm({ defaultValues, onSubmit, submitLabel = 'Create Event' }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-5">
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-medium text-slate-700">Title</label>
        <input className={inputClass} {...register('title', { required: true })} placeholder="Event title" />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-medium text-slate-700">Description</label>
        <textarea className={`${inputClass} resize-none`} rows={3} {...register('description')} placeholder="What is this event about?" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Category</label>
        <input className={inputClass} {...register('category')} placeholder="e.g. Workshop" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Event Type</label>
        <select className={inputClass} {...register('eventType')}>
          <option value="Offline">Offline</option>
          <option value="Online">Online</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Event Date</label>
        <input type="date" className={inputClass} {...register('eventDate', { required: true })} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Registration Deadline</label>
        <input type="date" className={inputClass} {...register('registrationDeadline')} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Start Time</label>
        <input type="time" className={inputClass} {...register('startTime')} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">End Time</label>
        <input type="time" className={inputClass} {...register('endTime')} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Venue</label>
        <input className={inputClass} {...register('venue')} placeholder="Room / link" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Organizer</label>
        <input className={inputClass} {...register('organizer')} placeholder="Organizer name" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Max Participants</label>
        <input type="number" min="1" className={inputClass} {...register('maximumParticipants', { valueAsNumber: true })} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Image URL</label>
        <input className={inputClass} {...register('image')} placeholder="https://..." />
      </div>

      <div className="sm:col-span-2 mt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
