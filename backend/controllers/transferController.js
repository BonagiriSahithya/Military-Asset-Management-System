const { Transfer } = require('../models');

exports.createTransfer = async (req, res) => {
  try {
    // Validate required fields before create (optional but recommended)
    const { assetType, assetName, fromBaseId, toBaseId, quantity, transferDate } = req.body;

    if (!assetType || !assetName || !fromBaseId || !toBaseId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const record = await Transfer.create({
      assetType,
      assetName,
      fromBaseId,
      toBaseId,
      quantity,
      transferDate, // optional
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = async (req, res) => {
  try {
    const all = await Transfer.findAll();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

