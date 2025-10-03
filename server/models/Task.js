const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    due_date: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
