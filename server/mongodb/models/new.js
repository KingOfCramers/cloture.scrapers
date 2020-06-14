import mongoose, { Schema } from "mongoose";
import { logger } from "../../loggers/winston";

let newUploadSchema = new Schema({
  type: {
    required: true,
    type: String,
  },
  reference: {
    required: true,
    type: Schema.Types.ObjectId,
  },
});

newUploadSchema.post("save", (val) => {
  logger.info(
    `New ${val.type} added to newUploads ${val._id} with reference ${val.reference}`
  );
});

export const newUpload = mongoose.model("newUpload", newUploadSchema);
