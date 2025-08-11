const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  fromBase: { type: String, required: true },
  toBase: { type: String, required: true },
  equipmentType: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Transfer', transferSchema);
