const airTable = require("../utils/airtable_es2015");
const fs = require("fs");

Promise.resolve(airTable.hydrateFromAirtable()).then(data => {
  const json = JSON.stringify(data, null, 2);
  const fileName = process.argv[2];
  fs.writeFile(fileName, json, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Tables:");
      Object.keys(data)
        .filter(key => key !== "errors" && key !== "timestamp")
        .forEach(key => {
          console.log(`  ${key} (${data[key].length})`);
        });
      console.log(`Data written to ${fileName}`);
    }
  });
});
