const airTable = require("./airtable_es2015");

Promise.resolve(airTable.hydrateFromAirtable()).then(data => {
  const json = JSON.stringify(data, null, 4);
  const fileName = "data.json";
  var fs = require("fs");
  fs.writeFile(fileName, json, err => {
    console.log(err || `data written to ${fileName}`);
  });
});
