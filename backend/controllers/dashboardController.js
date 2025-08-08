const { Asset, Purchase, Transfer, Assignment, Expenditure } = require('../models');

exports.getDashboardData = async (req, res) => {
  try {
    // Fetch totals
    const [purchases, transfers, assignments, expenditures] = await Promise.all([
      Purchase.sum('quantity'),
      Transfer.sum('quantity'),
      Assignment.sum('quantity'),
      Expenditure.sum('quantity'),
    ]);

    const openingBalance = (purchases || 0);
    const netMovement = (transfers || 0);
    const assignedAssets = (assignments || 0);
    const expendedAssets = (expenditures || 0);

    const closingBalance = openingBalance + netMovement - assignedAssets - expendedAssets;

    res.json({
      openingBalance,
      closingBalance,
      netMovement,
      assignedAssets,
      expendedAssets,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
};
