import { logger } from "../../loggers/winston";

export const calculateResults = async (job, result) => {
  let numberModified = result.reduce((agg, x) => {
    agg = agg + x.nModified;
    return agg;
  }, 0);
  let numberUpserted = result.reduce((agg, x) => {
    let hasUpsert = x.upserted;
    if (hasUpsert) {
      let numberUpserted = x.upserted.length;
      agg = agg + numberUpserted;
    }
    return agg;
  }, 0);
  logger.info(`${job} added ${numberUpserted} and modified ${numberModified}`);
};

export const insertData = (model, data) =>
  data.map(async (datum) =>
    model.updateOne({ title: datum.title }, datum, {
      upsert: true,
      new: true,
      runValidators: true,
    })
  );
