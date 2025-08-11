const Purchase = require('../models/Purchase');
const Transfer = require('../models/Transfer');
const Assignment = require('../models/Assignment');
const Expenditure = require('../models/Expenditure');

exports.getDashboardData = async (req, res) => {
  try {
    // You can add filters if you want; for now, fetch all data aggregates

    const openingPurchases = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);
    const openingTransfersIn = await Transfer.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);
    const openingTransfersOut = await Transfer.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);
    const openingAssignments = await Assignment.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);
    const openingExpenditures = await Expenditure.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    const getTotal = (arr) => (arr.length > 0 ? arr[0].total : 0);

    const openingBalance = getTotal(openingPurchases) + getTotal(openingTransfersIn) - getTotal(openingTransfersOut);
    const assigned = getTotal(openingAssignments);
    const expended = getTotal(openingExpenditures);
    const netMovement = openingBalance - assigned - expended;

    res.json({
      openingBalance,
      closingBalance: openingBalance, // for simplicity same as opening
      netMovement,
      assigned,
      expended,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard metrics' });
  }
};
