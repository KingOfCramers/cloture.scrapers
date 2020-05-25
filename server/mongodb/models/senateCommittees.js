import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let senateCommitteeSchema = new Schema({
  type: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    required: false,
  },
  witnesses: [
    {
      type: String,
    },
  ],
});

// Pagination plugin
senateCommitteeSchema.plugin(mongoosePaginate);

export const Sfrc = mongoose.model("SFRC", senateCommitteeSchema);
export const Sasc = mongoose.model("SASC", senateCommitteeSchema);
export const Svac = mongoose.model("SVAC", senateCommitteeSchema);
export const Sagc = mongoose.model("SAGC", senateCommitteeSchema);
export const Sapc = mongoose.model("SAPC", senateCommitteeSchema);
export const Sbnk = mongoose.model("SBNK", senateCommitteeSchema);
export const Sbdg = mongoose.model("SBDG", senateCommitteeSchema);
export const Sstr = mongoose.model("SSTR", senateCommitteeSchema);
export const Snat = mongoose.model("SNAT", senateCommitteeSchema);
export const Senv = mongoose.model("SENV", senateCommitteeSchema);
export const Sfin = mongoose.model("SFIN", senateCommitteeSchema);
export const Shlp = mongoose.model("SHLP", senateCommitteeSchema);
export const Shsc = mongoose.model("SHSC", senateCommitteeSchema);
export const Sind = mongoose.model("SIND", senateCommitteeSchema);
export const Sjud = mongoose.model("SJUD", senateCommitteeSchema);
export const Srle = mongoose.model("SRLE", senateCommitteeSchema);
export const Seth = mongoose.model("SETH", senateCommitteeSchema);
export const Ssci = mongoose.model("SSCI", senateCommitteeSchema);
export const Ssbs = mongoose.model("SSBS", senateCommitteeSchema);
export const Svet = mongoose.model("SVET", senateCommitteeSchema);

export default [
  Sfrc,
  Sasc,
  Svac,
  Sagc,
  Sapc,
  Sbnk,
  Sbdg,
  Sstr,
  Snat,
  Senv,
  Sfin,
  Shlp,
  Shsc,
  Sind,
  Sjud,
  Srle,
  Seth,
  Ssci,
  Ssbs,
  Svet,
];
