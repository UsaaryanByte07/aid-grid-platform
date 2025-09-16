import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowedUpdates = [
      'name', 'location', 'phone', 'age', 'medicalHistory',
      'bloodGroup', 'hospitalName', 'licenseNumber'
    ];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Validate blood group updates for donors
    if (req.user.type === 'donor' && updates.bloodGroup) {
      const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      if (!validBloodGroups.includes(updates.bloodGroup)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid blood group'
        });
      }
    }

    // Prevent hospital users from updating donor-specific fields
    if (req.user.type === 'hospital') {
      delete updates.bloodGroup;
    }

    // Prevent donor users from updating hospital-specific fields
    if (req.user.type === 'donor') {
      delete updates.hospitalName;
      delete updates.licenseNumber;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
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