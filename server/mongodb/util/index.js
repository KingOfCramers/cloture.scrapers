import mongoose from "mongoose";
import modelList from "../models/houseCommittees";

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const pickModel = (name) =>
  modelList.find((x) => x.modelName.toLowerCase() === name.toLowerCase());
