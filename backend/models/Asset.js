const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  equipmentType: { type: String, required: true },
  base: { type: String, required: true },
  quantity: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Asset", assetSchema);
