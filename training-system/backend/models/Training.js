const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  title: String,
  description: String,
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Training', trainingSchema);