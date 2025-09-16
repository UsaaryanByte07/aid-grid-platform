import mongoose from 'mongoose';

const donationRecordSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Donor is required']
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Hospital is required']
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonationRequest'
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  unitsRecorded: {
    type: Number,
    required: [true, 'Units recorded is required'],
    min: [1, 'At least 1 unit must be recorded'],
    max: [10, 'Cannot record more than 10 units per donation']
  },
  donationDate: {
    type: Date,
    required: [true, 'Donation date is required'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Donation date cannot be in the future'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  // Medical information
  hemoglobinLevel: {
    type: Number,
    min: [7, 'Hemoglobin level too low'],
    max: [20, 'Invalid hemoglobin level']
  },
  bloodPressure: {
    systolic: {
      type: Number,
      min: [90, 'Systolic pressure too low'],
      max: [200, 'Systolic pressure too high']
    },
    diastolic: {
      type: Number,
      min: [60, 'Diastolic pressure too low'],
      max: [120, 'Diastolic pressure too high']
    }
  },
  donorEligible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
donationRecordSchema.index({ donor: 1, donationDate: -1 });
donationRecordSchema.index({ hospital: 1, donationDate: -1 });
donationRecordSchema.index({ bloodGroup: 1, donationDate: -1 });

// Update donor's last donation date when a record is saved
donationRecordSchema.post('save', async function() {
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(this.donor, {
    lastDonation: this.donationDate
  });
});

const DonationRecord = mongoose.model('DonationRecord', donationRecordSchema);

export default DonationRecord;