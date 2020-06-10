import moment from "moment";
import { logger } from "../../loggers/winston";

export const calculateResults = async (job, result) => {
  // Number of records modified in MongoDB
  let upserted = [];
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

// For each field, check that format is valid from parsed data. If not, return null for field instead.
export const cleanDateTime = (meta, data) => {
  let fieldsToCheck = Object.keys(meta.formats);
  let cleaned = data.map((datum) => {
    fieldsToCheck.forEach((field) => {
      let valueFromPage = datum[field];
      let isValidFormat = moment(valueFromPage, meta.formats[field]).isValid();
      if (!isValidFormat) {
        datum[field] = null;
      } else {
        let value = moment(valueFromPage, meta.formats[field]).toISOString(); /// Convert to date string for storage in MongoDB
        datum[field] = value;
      }
    });
    return datum;
  });
  return cleaned;
};

export const insertData = (model, data) =>
  data.map(async (datum) =>
    model.updateOne({ title: datum.title }, datum, {
      upsert: true,
      new: true,
      runValidators: true,
    })
  );
