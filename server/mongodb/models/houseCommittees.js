import { logger } from "../../loggers/winston";
import mongoose, { Schema } from "mongoose";
import { newUpload } from "./new";

let committees = [
  "Hasc",
  "Hfac",
  "Hvac",
  "Hhsc",
  "Hagc",
  "Hapc",
  "Hbuc",
  "Help",
  "Nrgy",
  "Fisv",
  "Admn",
  "Ntty",
  "Ovst",
  "Scnc",
  "Smbs",
  "Trns",
  "Wymn",
  "Clmt",
];

let models = committees.map((committee) => {
  let schema = new Schema({
    title: {
      unique: true,
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: false,
    },
    time: {
      type: Date,
      require: false,
    },
    date: {
      type: Date,
      require: false,
    },
    type: {
      type: String,
      require: false,
    },
  });

  schema.post("updateOne", async (val) => {
    if (val.upserted) {
      let allUploads = val.upserted.map(async (x) => {
        logger.info(`Upserted new document in ${committee}: ${x._id}`);
        let upload = new newUpload({ type: committee, reference: x._id });
        return await upload.save();
      });
      Promise.all(allUploads)
        .then(() => logger.info(`${committee} is done uploading.`))
        .catch((err) =>
          logger.error(
            `${committee} had problem updoading to newUpload collection: `,
            err
          )
        );
    }
  });

  return mongoose.model(committee, schema);
});

export default models;
