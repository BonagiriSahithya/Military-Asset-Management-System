const Transfer = require('../models/Transfer');

exports.createTransfer = async (req, res) => {
  try {
    const { fromBase, toBase, equipmentType, quantity, date } = req.body;
    const transfer = new Transfer({
      fromBase,
      toBase,
      equipmentType,
      quantity,
      date,
      createdBy: req.user._id,
    });
    await transfer.save();
    res.status(201).json(transfer);
  } catch (error) {
    console.error('Create Transfer error:', error);
    res.status(500).json({ message: 'Server error creating transfer' });
  }
};

exports.getTransfers = async (req, res) => {
  try {
    const { base, equipmentType, startDate, endDate } = req.query;
    let filters = {};
    if (base) {
      // Transfers where base is either fromBase or toBase
      filters.$or = [{ fromBase: base }, { toBase: base }];
    }
    if (equipmentType) filters.equipmentType = equipmentType;
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }

    // Role-based filtering
    if (req.user.role === 'Base Commander') {
      filters.$or = [{ fromBase: req.user.base }, { toBase: req.user.base }];
    }

    const transfers = await Transfer.find(filters).sort({ date: -1 });
    res.json(transfers);
  } catch (error) {
    console.error('Get Transfers error:', error);
    res.status(500).json({ message: 'Server error fetching transfers' });
  }
};


