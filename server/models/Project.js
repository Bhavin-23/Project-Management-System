const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    due_date: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
