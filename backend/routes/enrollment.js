const express = require('express');
const router = express.Router();

const Enrollment = require('../models/Enrollment');
const authMiddleware = require('../middleware/authMiddleware');


// ✅ ENROLL TRAINING
router.post('/', authMiddleware, async (req, res) => {

  try {

    const enrollment = new Enrollment({
      employeeId: req.user.id,
      trainingId: req.body.trainingId
    });

    await enrollment.save();

    res.json({
      message: "Enrollment successful"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// ✅ GET MY ENROLLMENTS
router.get('/my', authMiddleware, async (req, res) => {

  try {

    const enrollments = await Enrollment.find({
      employeeId: req.user.id
    }).populate('trainingId');

    res.json(enrollments);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


module.exports = router;