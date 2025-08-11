const Assignment = require('../models/Assignment');

exports.createAssignment = async (req, res) => {
  try {
    const { personnelName, base, equipmentType, quantity, date } = req.body;
    const assignment = new Assignment({
      personnelName,
      base,
      equipmentType,
      quantity,
      date,
      createdBy: req.user._id,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    console.error('Create Assignment error:', error);
    res.status(500).json({ message: 'Server error creating assignment' });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const { base, equipmentType, startDate, endDate } = req.query;
    let filters = {};
    if (base) filters.base = base;
    if (equipmentType) filters.equipmentType = equipmentType;
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }

    if (req.user.role === 'Base Commander') {
      filters.base = req.user.base;
    }

    const assignments = await Assignment.find(filters).sort({ date: -1 });
    res.json(assignments);
  } catch (error) {
    console.error('Get Assignments error:', error);
    res.status(500).json({ message: 'Server error fetching assignments' });
  }
};
