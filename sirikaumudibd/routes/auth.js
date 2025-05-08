const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { sendEmail } = require('../utils/sendEmail');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

router.post(
  '/register',
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'collegeIdCard', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { fullName, email, phone, collegeName, collegeIdNumber } = req.body;
      const { profilePicture, collegeIdCard } = req.files;

      if (!profilePicture || !collegeIdCard) {
        return res.status(400).json({ message: 'Both files are required' });
      }

      const profileSize = profilePicture[0].size / 1024;
      const idCardSize = collegeIdCard[0].size / 1024;
      if (profileSize < 50 || profileSize > 250) {
        return res.status(400).json({ message: 'Profile picture must be between 50KB and 250KB' });
      }
      if (idCardSize < 100 || idCardSize > 500) {
        return res.status(400).json({ message: 'College ID card must be between 100KB and 500KB' });
      }

      const password = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        fullName,
        email,
        phone,
        collegeName,
        collegeIdNumber,
        password: hashedPassword,
        profilePicture: profilePicture[0].path,
        collegeIdCard: collegeIdCard[0].path,
      });

      await user.save();
      await sendEmail(email, 'Your Exam Portal Password', `Your password is: ${password}`);

      res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        collegeName: user.collegeName,
        collegeIdNumber: user.collegeIdNumber,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;