router.get('/my', authMiddleware, async (req, res) => {

  try {

    const enrollments = await Enrollment.find({
      employeeId: req.user.id
    }).populate('trainingId');

    res.json(enrollments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});