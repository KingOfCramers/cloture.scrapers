import moment from "moment";

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
    model.updateOne({ link: datum.link }, datum, {
      upsert: true,
      new: true,
      runValidators: true,
    })
  );
