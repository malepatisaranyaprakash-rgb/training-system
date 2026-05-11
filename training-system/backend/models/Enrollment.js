const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  employeeId: String,
  trainingId: String
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);