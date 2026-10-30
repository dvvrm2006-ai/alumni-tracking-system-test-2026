import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, trim: true, default: '' },
    category: { type: String, trim: true, default: 'General' },
    eventType: { type: String, enum: ['Online', 'Offline'], default: 'Offline' },
    eventDate: { type: Date, required: [true, 'Event date is required'] },
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
    venue: { type: String, trim: true, default: '' },
    organizer: { type: String, trim: true, default: '' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' },
    registrationDeadline: { type: Date, default: null },
    maximumParticipants: { type: Number, default: 100 },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true } }
);

eventSchema.virtual('remainingSeats').get(function () {
  return Math.max(this.maximumParticipants - this.registeredUsers.length, 0);
});

export default mongoose.model('Event', eventSchema);
