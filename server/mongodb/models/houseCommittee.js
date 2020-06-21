import mongoose, { Schema } from "mongoose";
import { logger } from "../../loggers/winston";
import moment from "moment";

let houseCommitteeSchema = new Schema({
  committee: {
    type: String,
    required: [true, "A valid house committee is required."],
    enum: [
      "hasc",
      "hfac",
      "hvac",
      "hhsc",
      "hagc",
      "hapc",
      "hbuc",
      "help",
      "nrgy",
      "fisv",
      "admn",
      "ntty",
      "ovst",
      "scnc",
      "smbs",
      "trns",
      "wymn",
      "clmt",
    ],
  },
  title: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    required: false,
  },
  time: {
    type: Date,
    require: false,
  },
  date: {
    type: Date,
    require: false,
  },
  text: {
    type: String,
    require: false,
  },
});

// Convert dates + times
houseCommitteeSchema
  .path("date")
  .get((v) => (moment(v).isValid() ? moment(v).format("LL") : null));
houseCommitteeSchema
  .path("time")
  .get((v) => (moment(v).isValid() ? moment(v).format("LT") : null));

houseCommitteeSchema.post("updateOne", async (val) => {
  if (val.nModified > 0) {
    logger.info(`Modification made to record`);
  }
  if (val.upserted) {
    logger.info(`New document upserted:`);
    logger.info(val);
  }
});

// Make model and export
const houseCommittee = mongoose.model("houseCommittee", houseCommitteeSchema);
export { houseCommittee };
