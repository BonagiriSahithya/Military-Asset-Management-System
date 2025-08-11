const mongoose = require('mongoose');

const expenditureSchema = new mongoose.Schema({
  base: { type: String, required: true },
  equipmentType: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Expenditure', expenditureSchema);
