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
    set: (time) => {
      let momentified = moment(time);
      if (momentified.isValid()) {
        let hours = momentified.hours();
        if (hours < 6) {
          // If the time is between 12 and 6am, it should be flipped to pm
          time = momentified.add(12, "hours").toISOString();
        }
      }
      return time;
    },
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

houseCommitteeSchema.pre("save", function (next) {
  this.wasNew = this.isNew; // Pass down newness to post-save for logging
  if (!this.isNew) {
    // If it's not new, then log the updates here.
    let modifiedPaths = this.modifiedPaths();
    if (modifiedPaths.length > 0) {
      modifiedPaths.forEach((path) => {
        logger.info(`${this.id} ${path} ––> ${JSON.stringify(this[path])}`);
      });
    }
  }
  next();
});

houseCommitteeSchema.post("save", function (val) {
  if (this.wasNew) {
    logger.info(`Document saved with id ${val._id}`);
  }
});

// Convert dates + times upon fetch
houseCommitteeSchema
  .path("date")
  .get((v) => (moment(v).isValid() ? moment(v).format("LL") : null));
houseCommitteeSchema
  .path("time")
  .get((v) => (moment(v).isValid() ? moment(v).format("LT") : null));

// Make model and export
const houseCommittee = mongoose.model("houseCommittee", houseCommitteeSchema);
export { houseCommittee };
