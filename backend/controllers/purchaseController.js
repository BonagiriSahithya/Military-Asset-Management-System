const Purchase = require('../models/Purchase');

// Create a new purchase
exports.createPurchase = async (req, res) => {
  try {
    const { base, equipmentType, quantity, date } = req.body;
    const purchase = new Purchase({
      base,
      equipmentType,
      quantity,
      date,
      createdBy: req.user._id,
    });
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    console.error('Create Purchase error:', error);
    res.status(500).json({ message: 'Server error creating purchase' });
  }
};

// Get all purchases with optional filters
exports.getPurchases = async (req, res) => {
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

    // Role-based filtering
    if (req.user.role === 'Base Commander') {
      filters.base = req.user.base; // Base commander only sees their base
    }

    const purchases = await Purchase.find(filters).sort({ date: -1 });
    res.json(purchases);
  } catch (error) {
    console.error('Get Purchases error:', error);
    res.status(500).json({ message: 'Server error fetching purchases' });
  }
};

