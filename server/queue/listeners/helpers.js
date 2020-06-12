import moment from "moment";
import { logger } from "../../loggers/winston";

// Calculate the number of records that were
// modified or added to the database. And then
// print those results to the screen
export const calculateResults = async (job, result) => {
  let upserted = [];
  let numberModified = result.reduce((agg, x) => {
    agg = agg + x.nModified;
    return agg;
  }, 0);

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

export const stripWhiteSpace = (data) =>
  data.map((x) => {
    for (let key in x) {
      if (typeof x[key] === "string") {
        x[key] = x[key].trim();
      }
    }
    return x;
  });

// Check to see if date and time fields pulled from page
// match the valid values provided in each job (validFormats).
// If not, return null. Otherwise, return value with ISOString().
export const cleanDateTime = (meta, data) => {
  let fieldsToCheck = Object.keys(meta.validFormats);
  return data.map((datum) => {
    fieldsToCheck.forEach((field) => {
      let valueFromScraper = datum[field];
      let validFormat = meta.validFormats[field].find((format) =>
        moment(valueFromScraper, format, true).isValid()
      );
      if (!validFormat) {
        // If time doesn't match set to null
        datum[field] = null;
      } else {
        datum[field] = moment(valueFromScraper, validFormat);
      }
    });
    return datum;
  });
};

export const insertData = (model, data) =>
  data.map(async (datum) =>
    model.updateOne({ title: datum.title }, datum, {
      upsert: true,
      new: true,
      runValidators: true,
    })
  );
