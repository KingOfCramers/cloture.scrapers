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
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  witnesses: [
    {
      type: String,
    },
  ],
  type: {
    type: String,
    require: true,
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
  //if (val.upserted) {
  //let allUploads = val.upserted.map(async (x) => {
  //logger.info(`Upserted new document in ${committee}: ${x._id}`);
  //let upload = new newUpload({ type: committee, reference: x._id });
  //return await upload.save();
  //});
  //Promise.all(allUploads)
  //.then(() => logger.info(`${committee} is done uploading.`))
  //.catch((err) =>
  //logger.error(
  //`${committee} had problem updoading to newUpload collection: `,
  //err
  //)
  //);
  //}
});

// Make model and export
const houseCommittee = mongoose.model("houseCommittee", houseCommitteeSchema);
export { houseCommittee };
