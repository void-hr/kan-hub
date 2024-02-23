const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cateogry: {
        type: String,
        enum: ["BACKLOGS", "TODO", "IN PROGRESS", "DONE"],
        required: true,
      },
    priority: {
      type: String,
      enum: ["HIGH PRIORITY", "MEDIUM PRIORITY", "LOW PRIORITY"],
      required: true,
    },
    checklist: [
        {
            title: {
              type: String,
              required: true,
            },
            isChecked: {
              type: Boolean,
              default: false,
            },
          },
    ],
    dueDate: {
        type: Date,
    },
    refUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
  },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSchema);
module.exports = Task
