import mongoose from 'mongoose';

const brokerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  regions: {
    type: [String],
    required: [true, 'At least one operating region is required']
  },
  specialties: {
    type: [String]
  },
  experienceYears: {
    type: Number,
    min: [0, 'Experience years cannot be negative']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  subscriptionStart: {
    type: Date
  },
  subscriptionEnd: {
    type: Date
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Track listings handled by this broker
  listingsHandled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for average rating
brokerSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  
  const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
});

// Virtual field for subscription status
brokerSchema.virtual('subscriptionActive').get(function() {
  if (!this.subscriptionEnd) return false;
  return new Date() < new Date(this.subscriptionEnd);
});

// Index for faster searches
brokerSchema.index({ regions: 1 });
brokerSchema.index({ isVerified: 1, isPremium: 1 });

const Broker = mongoose.model('Broker', brokerSchema);

export default Broker;