import moment from "moment";
import { logger } from "../../loggers/winston";

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
  data.map(async (datum) => {
    let doc = await model.findOne({ link: datum.link });
    if (!doc) {
      let newDoc = new model({ ...datum });
      /// Logging is handled in mongoose 'post' save hook
      return await newDoc.save();
    } else {
      let updated = await model.updateOne({ link: datum.link }, datum, {
        new: true,
        runValidators: true,
        upsert: false,
      });
      if (updated.nModified > 0) {
        logger.info(`Document modified with id ${doc.id}`);
      }
      return updated;
    }
  });
