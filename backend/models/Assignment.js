const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  personnelName: { type: String, required: true },
  base: { type: String, required: true },
  equipmentType: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
