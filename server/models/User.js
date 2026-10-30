import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false, // never return password by default in queries
  },
  role: {
    type: String,
    enum: ['student', 'alumni', 'admin'],
    default: 'student',
  },
  accountStatus: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // --- Profile fields (Milestone 4) ---
  profilePhoto: {
    type: String,
    default: 'https://api.dicebear.com/7.x/initials/svg?seed=User', // placeholder until Cloudinary is wired up
  },
  phone: { type: String, trim: true, default: '' },
  collegeName: { type: String, trim: true, default: '' },
  branch: { type: String, trim: true, default: '' },
  graduationYear: { type: Number, default: null },
  currentCompany: { type: String, trim: true, default: '' },
  jobTitle: { type: String, trim: true, default: '' },
  experience: { type: String, trim: true, default: '' },
  location: { type: String, trim: true, default: '' },
  bio: { type: String, trim: true, maxlength: 500, default: '' },
  skills: { type: [String], default: [] },
  linkedinUrl: { type: String, trim: true, default: '' },
  githubUrl: { type: String, trim: true, default: '' },
  portfolioUrl: { type: String, trim: true, default: '' },
});

// Hash password before saving, only if it was modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare plain-text password with the hashed one
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
