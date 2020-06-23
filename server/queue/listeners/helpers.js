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

const validFormats = {
  date: [
    "MMM D, YYYY",
    "MM.DD.YY",
    "MMM D YYYY",
    "MMM D",
    "MMM DD YYYY",
    "MMMM DD, YYYY",
    "MMMM D, YYYY",
    "MM/DD/YYYY",
    "MM/DD/YY",
    "ddd, MM/DD/YYYY",
    "dddd, MMMM DD, YYYY",
    "dddd, MMMM D, YYYY",
  ],
  time: [
    "LT",
    "hh:mm A",
    "h:mm A",
    "hh:mm a",
    "h:mm a",
    "hh:mmA",
    "h:mmA",
    "hh:mma",
    "h:mma",
    "hh:mm",
  ],
};

export const cleanDateTime = (data) => {
  return data.map((datum) => {
    const { date, time } = datum;
    const validTime = validFormats.time.find((format) =>
      moment(time, format, true).isValid()
    );
    const validDate = validFormats.date.find((format) =>
      moment(date, format, true).isValid()
    );

    datum.time = validTime ? moment(time, validTime).toISOString() : null;
    datum.date = validDate ? moment(date, validDate).toISOString() : null;
    return datum;
  });
};

export const insertData = (model, data) =>
  data.map(async (datum) => {
    let doc = await model.findOne({ link: datum.link });
    if (!doc) {
      let newDoc = new model({ ...datum });
      return await newDoc.save();
    } else {
      return await model.updateOne({ link: datum.link }, datum, {
        new: true,
        runValidators: true,
        upsert: false,
      });
    }
  });
