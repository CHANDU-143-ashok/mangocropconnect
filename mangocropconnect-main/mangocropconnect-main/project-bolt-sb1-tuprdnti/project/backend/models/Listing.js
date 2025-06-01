import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  variety: {
    type: String,
    required: [true, 'Mango variety is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1 kg']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  harvestDate: {
    type: Date,
    required: [true, 'Harvest date is required']
  },
  sellerName: {
    type: String,
    required: [true, 'Seller name is required'],
    trim: true
  },
  sellerPhone: {
    type: String,
    required: [true, 'Seller phone number is required'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  description: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 5;
      },
      message: 'Maximum 5 images allowed per listing'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  featured: {
    type: Boolean,
    default: false
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  broker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  qualityGrade: {
    type: String,
    enum: ['A+', 'A', 'B', 'C']
  },
  farmingMethod: {
    type: String,
    enum: ['Organic', 'Traditional', 'Mixed']
  },
  priceRange: {
    min: {
      type: Number,
      min: [0, 'Minimum price cannot be negative']
    },
    max: {
      type: Number,
      min: [0, 'Maximum price cannot be negative']
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create virtual for listing age
listingSchema.virtual('listingAge').get(function() {
  const now = new Date();
  const createdAt = new Date(this.createdAt);
  const diffTime = Math.abs(now - createdAt);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Create virtual for days until harvest
listingSchema.virtual('daysUntilHarvest').get(function() {
  const now = new Date();
  const harvestDate = new Date(this.harvestDate);
  const diffTime = Math.abs(harvestDate - now);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Create index for faster searches
listingSchema.index({ variety: 'text', location: 'text', sellerName: 'text' });
listingSchema.index({ status: 1 });
listingSchema.index({ harvestDate: 1 });
listingSchema.index({ featured: 1 });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;