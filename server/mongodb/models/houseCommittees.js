import mongoose, { Schema } from "mongoose";

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

  schema.post("updateOne", (val) => {
    console.log("Update One Hook:");
    console.log(committee);
    console.log(val);
  });

  return mongoose.model(committee, schema);
});

export default models;
