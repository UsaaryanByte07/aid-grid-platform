import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'medical_supplies',
      'blood_donation',
      'food_aid',
      'shelter',
      'clothing',
      'education',
      'disaster_relief',
      'other'
    ]
  },
  urgency: {
    type: String,
    required: [true, 'Please select urgency level'],
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'fulfilled', 'closed'],
    default: 'open'
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide an address'],
      maxlength: [200, 'Address cannot exceed 200 characters']
    },
    city: {
      type: String,
      required: [true, 'Please provide a city'],
      maxlength: [50, 'City cannot exceed 50 characters']
    },
    state: {
      type: String,
      required: [true, 'Please provide a state'],
      maxlength: [50, 'State cannot exceed 50 characters']
    },
    coordinates: {
      latitude: {
        type: Number,
        min: -90,
        max: 90
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180
      }
    }
  },
  targetAmount: {
    type: Number,
    min: [0, 'Target amount cannot be negative']
  },
  raisedAmount: {
    type: Number,
    default: 0,
    min: [0, 'Raised amount cannot be negative']
  },
  beneficiaries: {
    type: Number,
    min: [1, 'Number of beneficiaries must be at least 1'],
    default: 1
  },
  deadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Deadline must be in the future'
    }
  },
  images: [{
    type: String // URLs to uploaded images
  }],
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  tags: [{
    type: String,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  verifiedAt: {
    type: Date,
    default: null
  },
  donors: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number,
      min: 0
    },
    donatedAt: {
      type: Date,
      default: Date.now
    },
    message: {
      type: String,
      maxlength: [200, 'Donation message cannot exceed 200 characters']
    }
  }],
  updates: [{
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Update title cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: true,
      maxlength: [500, 'Update content cannot exceed 500 characters']
    },
    images: [{
      type: String
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
requestSchema.index({ category: 1 });
requestSchema.index({ urgency: 1 });
requestSchema.index({ status: 1 });
requestSchema.index({ requester: 1 });
requestSchema.index({ 'location.city': 1 });
requestSchema.index({ 'location.state': 1 });
requestSchema.index({ createdAt: -1 });
requestSchema.index({ deadline: 1 });

// Virtual for completion percentage
requestSchema.virtual('completionPercentage').get(function() {
  if (!this.targetAmount || this.targetAmount === 0) return 0;
  return Math.min(Math.round((this.raisedAmount / this.targetAmount) * 100), 100);
});

// Virtual for time remaining
requestSchema.virtual('timeRemaining').get(function() {
  if (!this.deadline) return null;
  const now = new Date();
  const timeLeft = this.deadline - now;
  return timeLeft > 0 ? timeLeft : 0;
});

// Ensure virtuals are included in JSON
requestSchema.set('toJSON', { virtuals: true });
requestSchema.set('toObject', { virtuals: true });

const Request = mongoose.model('Request', requestSchema);

export default Request;