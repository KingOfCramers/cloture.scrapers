import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    user: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, // Creates update/createdate fields
  }
);

const Task = mongoose.model("Task", taskSchema);
export { Task };
