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

// Convert dates + times upon fetch
houseCommitteeSchema
  .path("date")
  .get((v) => (moment(v).isValid() ? moment(v).format("LL") : null));
houseCommitteeSchema
  .path("time")
  .get((v) => (moment(v).isValid() ? moment(v).format("LT") : null));

houseCommitteeSchema.pre("save", function (next) {
  //console.log(this);
  next();
});

houseCommitteeSchema.pre("updateOne", function (next) {
  //console.log(this._update);
  next();
});

houseCommitteeSchema.post("save", function (val) {
  console.log(`Document saved with id ${val._id}`);
});

houseCommitteeSchema.post("updateOne", async function (val) {
  if (val.nModified > 0) {
    const updatedDoc = await this.model.findOne(this.getQuery());
    logger.info(`Document updated with id ${updatedDoc.id}`);
  }
});
// Make model and export
const houseCommittee = mongoose.model("houseCommittee", houseCommitteeSchema);
export { houseCommittee };
