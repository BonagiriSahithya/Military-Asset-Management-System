const Expenditure = require('../models/Expenditure');

exports.createExpenditure = async (req, res) => {
  try {
    const { base, equipmentType, quantity, date } = req.body;
    const expenditure = new Expenditure({
      base,
      equipmentType,
      quantity,
      date,
      createdBy: req.user._id,
    });
    await expenditure.save();
    res.status(201).json(expenditure);
  } catch (error) {
    console.error('Create Expenditure error:', error);
    res.status(500).json({ message: 'Server error creating expenditure' });
  }
};

exports.getExpenditures = async (req, res) => {
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

    const expenditures = await Expenditure.find(filters).sort({ date: -1 });
    res.json(expenditures);
  } catch (error) {
    console.error('Get Expenditures error:', error);
    res.status(500).json({ message: 'Server error fetching expenditures' });
  }
};

