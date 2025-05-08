const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sections: [
    {
      name: { type: String, required: true },
      questions: [
        {
          id: { type: String, required: true },
          type: { type: String, enum: ['MCQ', 'NAT'], required: true },
          text: { type: String, required: true },
          options: [{ type: String }], // For MCQ
          section: { type: Number, required: true }, // Section index
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Test', testSchema);