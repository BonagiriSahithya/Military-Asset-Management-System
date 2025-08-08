const { Assignment } = require('../models');

exports.createAssignment = async (req, res) => {
  try {
    const record = await Assignment.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const all = await Assignment.findAll();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
