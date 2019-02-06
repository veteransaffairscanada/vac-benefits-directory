const airTable = require("../utils/airtable_es2015");
const fs = require("fs");

Promise.resolve(airTable.hydrateFromAirtable()).then(data => {
  const json = JSON.stringify(data, null, 4);
  const fileName = process.argv[2];
  fs.writeFile(fileName, json, err => {
    console.log(err || `data written to ${fileName}`);
  });
});
