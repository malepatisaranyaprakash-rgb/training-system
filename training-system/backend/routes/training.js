console.log("🔥 TRAINING FILE RUNNING");

const express = require('express');
const router = express.Router();

const Training = require('../models/Training');
const authMiddleware = require('../middleware/authMiddleware');


// CREATE TRAINING
router.post('/', authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== "TRAINER") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const training = new Training({
      title,
      description,
      trainerId: req.user.id
    });

    await training.save();

    res.json({
      message: "Training created",
      training
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});


// GET TRAININGS
router.get('/', authMiddleware, async (req, res) => {
  try {

    const trainings = await Training.find()
      .populate('trainerId', 'name email');

    res.json(trainings);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});


// DELETE TRAINING
router.delete('/:id', authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== "TRAINER") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    await Training.findByIdAndDelete(req.params.id);

    res.json({
      message: "Training deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

router.put('/:id', authMiddleware, async (req, res) => {

  try {

    const updated = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;