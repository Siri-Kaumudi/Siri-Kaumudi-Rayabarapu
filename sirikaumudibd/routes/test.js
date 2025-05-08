const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const auth = require('../middleware/auth');

// Sample data for testing
const sampleTests = [
  {
    name: 'Sample Test 1',
    sections: [
      {
        name: 'General Aptitude',
        questions: [
          {
            id: 'q1',
            type: 'MCQ',
            text: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            section: 0,
          },
          {
            id: 'q2',
            type: 'NAT',
            text: 'What is 3 * 4?',
            section: 0,
          },
        ],
      },
      {
        name: 'Technical',
        questions: [
          {
            id: 'q3',
            type: 'MCQ',
            text: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            section: 1,
          },
        ],
      },
    ],
  },
];

router.get('/courses', auth, async (req, res) => {
  try {
    const tests = await Test.find();
    if (tests.length === 0) {
      await Test.insertMany(sampleTests);
      res.json(sampleTests);
    } else {
      res.json(tests);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:testId', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/results', auth, async (req, res) => {
  try {
    // Placeholder for results
    const results = [
      { _id: '1', testName: 'Sample Test 1', score: 85, date: new Date() },
    ];
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;