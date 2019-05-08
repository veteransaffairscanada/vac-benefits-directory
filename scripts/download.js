const airTable = require("../utils/airtable_es2015");
const fs = require("fs");

Promise.resolve(airTable.hydrateFromAirtable()).then(data => {
  const json = JSON.stringify(data, null, 2);
  const fileName = process.argv[2];
  fs.writeFile(fileName, json, err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      // eslint-disable-next-line no-console
      console.log("Tables:");
      Object.keys(data)
        .filter(key => key !== "errors" && key !== "timestamp")
        .forEach(key => {
          // eslint-disable-next-line no-console
          console.log(`  ${key} (${data[key].length})`);
        });
      // eslint-disable-next-line no-console
      console.log(`Data written to ${fileName}`);
    }
  });
});
