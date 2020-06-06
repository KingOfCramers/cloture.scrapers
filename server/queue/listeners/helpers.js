import { logger } from "../../loggers/winston";

export const calculateResults = async (job, result) => {
  // Number of records modified in MongoDB
  let upserted = [];
  console.log(JSON.stringify(result));
  let numberModified = result.reduce((agg, x) => {
    agg = agg + x.nModified;
    return agg;
  }, 0);

  // Number of records that were added to MongoDB
  let numberUpserted = result.reduce((agg, x) => {
    let hasUpsert = x.upserted;
    if (hasUpsert) {
      let numberUpserted = x.upserted.length;
      x.upserted.map((y) => upserted.push(y._id));
      agg = agg + numberUpserted;
    }
    return agg;
  }, 0);

  // Print results
  if (numberUpserted > 0) {
    logger.info(`Added ${numberUpserted} records: ${upserted.toString()}`);
  }
  if (numberModified > 0) {
    logger.info(`Modified ${numberModified} records`);
  }
};

export const insertData = (model, data) =>
  data.map(async (datum) =>
    model.updateOne({ title: datum.title }, datum, {
      upsert: true,
      new: true,
      runValidators: true,
    })
  );
