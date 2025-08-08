const { Expenditure } = require('../models');

exports.createExpenditure = async (req, res) => {
  try {
    const record = await Expenditure.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getExpenditures = async (req, res) => {
  try {
    const all = await Expenditure.findAll();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
