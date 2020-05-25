import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let houseCommitteeSchema = new Schema({
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
    type: String,
    require: true,
  },
  date: {
    type: String,
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

// Pagination plugin
houseCommitteeSchema.plugin(mongoosePaginate);

export const Hasc = mongoose.model("HASC", houseCommitteeSchema);
export const Hfac = mongoose.model("HFAC", houseCommitteeSchema);
export const Hvac = mongoose.model("HVAC", houseCommitteeSchema);
export const Hhsc = mongoose.model("HHSC", houseCommitteeSchema);
export const Hagc = mongoose.model("HAGC", houseCommitteeSchema);
export const Hapc = mongoose.model("HAPC", houseCommitteeSchema);
export const Hbuc = mongoose.model("HBUC", houseCommitteeSchema);
export const Help = mongoose.model("HELP", houseCommitteeSchema);
export const Nrgy = mongoose.model("NRGY", houseCommitteeSchema);
export const Fisv = mongoose.model("FISV", houseCommitteeSchema);
export const Admn = mongoose.model("ADMN", houseCommitteeSchema);
export const Ntty = mongoose.model("NTTY", houseCommitteeSchema);
export const Ovst = mongoose.model("OVST", houseCommitteeSchema);
export const Scnc = mongoose.model("SCNC", houseCommitteeSchema);
export const Smbs = mongoose.model("SMBS", houseCommitteeSchema);
export const Trns = mongoose.model("TRNS", houseCommitteeSchema);
export const Wymn = mongoose.model("WYMN", houseCommitteeSchema);
export const Clmt = mongoose.model("CLMT", houseCommitteeSchema);

export default [
  Hasc,
  Hfac,
  Hvac,
  Hhsc,
  Hagc,
  Hapc,
  Hbuc,
  Help,
  Nrgy,
  Fisv,
  Admn,
  Ntty,
  Ovst,
  Scnc,
  Smbs,
  Trns,
  Wymn,
  Clmt,
];
