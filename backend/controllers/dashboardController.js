const Purchase = require('../models/Purchase');
const Transfer = require('../models/Transfer');
const Assignment = require('../models/Assignment');
const Expenditure = require('../models/Expenditure');

exports.getDashboardData = async (req, res) => {
  try {
    // Base filtering for Base Commander
    let baseFilter = {};
    if (req.user.role === 'Base Commander') {
      baseFilter = { base: req.user.base };
    }

    // Sum purchases (filtered by base if Base Commander)
    const openingPurchases = await Purchase.aggregate([
      { $match: baseFilter },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    // Transfers In (toBase)
    const transfersInFilter = {};
    if (req.user.role === 'Base Commander') {
      transfersInFilter.toBase = req.user.base;
    }
    const openingTransfersIn = await Transfer.aggregate([
      { $match: transfersInFilter },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    // Transfers Out (fromBase)
    const transfersOutFilter = {};
    if (req.user.role === 'Base Commander') {
      transfersOutFilter.fromBase = req.user.base;
    }
    const openingTransfersOut = await Transfer.aggregate([
      { $match: transfersOutFilter },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    // Assignments
    const assignments = await Assignment.aggregate([
      { $match: baseFilter },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    // Expenditures
    const expenditures = await Expenditure.aggregate([
      { $match: baseFilter },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    const getTotal = (arr) => (arr.length > 0 ? arr[0].total : 0);

    const openingBalance = getTotal(openingPurchases) + getTotal(openingTransfersIn) - getTotal(openingTransfersOut);
    const assigned = getTotal(assignments);
    const expended = getTotal(expenditures);
    const netMovement = openingBalance - assigned - expended;

    res.json({
      openingBalance,
      closingBalance: openingBalance, // or calculate differently if needed
      netMovement,
      assigned,
      expended,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard metrics' });
  }
};
