import mongoose, { Schema } from "mongoose";

let newUploadsSchema = new Schema({
  type: {
    type: String,
    require: false,
  },
});

newUploadsSchema.post("save", (val) => {
  console.log("New document added!");
  console.log(val);
});

export const newUploads = mongoose.model("newUploads", newUploadsSchema);
