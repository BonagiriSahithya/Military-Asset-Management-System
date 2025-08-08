const { Purchase } = require('../models');

exports.createPurchase = async (req, res) => {
  try {
    const record = await Purchase.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPurchases = async (req, res) => {
  const all = await Purchase.findAll();
  res.json(all);
};



