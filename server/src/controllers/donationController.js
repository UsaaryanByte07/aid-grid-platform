import DonationRecord from '../models/DonationRecord.js';
import DonationRequest from '../models/DonationRequest.js';

export const getMyDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const donations = await DonationRecord.find({ donor: req.user._id })
      .populate('hospital', 'name hospitalName location')
      .populate('request', 'description urgency')
      .sort({ donationDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await DonationRecord.countDocuments({ donor: req.user._id });

    res.json({
      success: true,
      data: {
        donations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get my donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const recordDonation = async (req, res) => {
  try {
    const {
      hospitalId,
      requestId,
      bloodGroup,
      unitsRecorded,
      donationDate,
      location,
      notes,
      hemoglobinLevel,
      bloodPressure
    } = req.body;

    // Validate required fields
    if (!hospitalId || !bloodGroup || !unitsRecorded || !donationDate || !location) {
      return res.status(400).json({
        success: false,
        message: 'Hospital, blood group, units, donation date, and location are required'
      });
    }

    // Check if donor's blood group matches (donors can only record their own blood group)
    if (req.user.bloodGroup !== bloodGroup) {
      return res.status(400).json({
        success: false,
        message: 'Blood group does not match your profile'
      });
    }

    // Check for recent donations (donors should wait at least 56 days between donations)
    const recentDonation = await DonationRecord.findOne({
      donor: req.user._id,
      donationDate: {
        $gte: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000) // 56 days ago
      }
    });

    if (recentDonation) {
      return res.status(400).json({
        success: false,
        message: 'You must wait at least 56 days between donations'
      });
    }

    const donationRecord = new DonationRecord({
      donor: req.user._id,
      hospital: hospitalId,
      request: requestId || undefined,
      bloodGroup,
      unitsRecorded,
      donationDate: new Date(donationDate),
      location,
      notes,
      hemoglobinLevel,
      bloodPressure
    });

    await donationRecord.save();

    // If this donation was in response to a request, update the request
    if (requestId) {
      await DonationRequest.findByIdAndUpdate(requestId, {
        $inc: { unitsNeeded: -unitsRecorded }
      });
    }

    const populatedRecord = await DonationRecord.findById(donationRecord._id)
      .populate('hospital', 'name hospitalName location')
      .populate('request', 'description urgency');

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: { donation: populatedRecord }
    });
  } catch (error) {
    console.error('Record donation error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};