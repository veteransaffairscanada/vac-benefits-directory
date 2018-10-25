require("isomorphic-fetch");

const Logger = require("./logger").default;

exports.hydrateFromAirtable = exports.writeFeedback = undefined;

var airtableConstants = require("./hardcoded_strings");
var readKey = process.env.AIRTABLE_READ_KEY;
var writeKey = process.env.AIRTABLE_WRITE_KEY;
var baseKey = process.env.AIRTABLE_BASE_KEY || "appoFDwVvNMRSaO6o";

var replaceId = function replaceId(
  sheet,
  sheetColumnName,
  linkedSheet,
  linkedColumnName,
  linkedIdColumnName = "id"
) {
  sheet.forEach(row => {
    if (row[sheetColumnName]) {
      row[sheetColumnName] = row[sheetColumnName].map(id => {
        var records = linkedSheet.filter(row => row[linkedIdColumnName] === id);
        if (records.length === 1) {
          return records[0][linkedColumnName];
        } else {
          return undefined;
        }
      });
    }
  });
};

var fetchTableFromAirtable = async function fetchTableFromAirtable(table) {
  var offset = undefined;
  var jsonRecords = [];
  try {
    do {
      var url = `https://api.airtable.com/v0/${baseKey}/${table}?view=Grid%20view`;
      if (offset) {
        url = url + "&offset=" + offset;
      }
      var resp = await fetch(url, {
        headers: {
          Authorization: "Bearer " + readKey
        }
      });
      var json = await resp.json();
      jsonRecords = jsonRecords.concat(json.records);
      offset = json.offset;
    } while (offset);
  } catch (e) {
    Logger.error(e, {
      contentType: "application/json",
      source: "/utils/airtable_es2015.js"
    });
  }

  return jsonRecords.map(function(item) {
    return item.fields;
  });
};

var hydrateFromAirtable = (exports.hydrateFromAirtable = async function hydrateFromAirtable() {
  let dataStore = {};
  airtableConstants.tableNames.forEach(function(tableName) {
    dataStore[tableName] = [];
  });

  let promises = airtableConstants.tableNames.map(async function(tableName) {
    dataStore[tableName] = await fetchTableFromAirtable(tableName);
  });
  await Promise.all(promises);
  dataStore["errors"] = [];
  airtableConstants.tableNames.forEach(function(tableName) {
    var array = dataStore[tableName].map(x => Object.keys(x).length);
    var number_of_fields = Math.max(...array);
    dataStore[tableName] = dataStore[tableName].filter((x, i) => {
      var fraction_of_cols_filled =
        (Object.keys(x).length * 1) / number_of_fields;
      if (fraction_of_cols_filled < 0.5) {
        dataStore["errors"].push(
          "missingValues." + tableName + ".row=" + (i + 1).toString()
        );
        return false;
      } else {
        return true;
      }
    });
  });

  // replace ids in linked records
  replaceId(
    dataStore.questionDisplayLogic,
    "question",
    dataStore.questions,
    "variable_name"
  );
  replaceId(
    dataStore.questionDisplayLogic,
    "has value",
    dataStore.multipleChoiceOptions,
    "variable_name"
  );
  replaceId(
    dataStore.questionDisplayLogic,
    "exclude options",
    dataStore.multipleChoiceOptions,
    "variable_name"
  );
  replaceId(
    dataStore.questionDisplayLogic,
    "exclude questions",
    dataStore.questions,
    "variable_name"
  );
  replaceId(
    dataStore.multipleChoiceOptions,
    "linked_question",
    dataStore.questions,
    "variable_name"
  );
  replaceId(
    dataStore.questionClearLogic,
    "Question",
    dataStore.questions,
    "variable_name"
  );
  replaceId(
    dataStore.questionClearLogic,
    "Response",
    dataStore.multipleChoiceOptions,
    "variable_name"
  );
  replaceId(
    dataStore.questionClearLogic,
    "Previous Response",
    dataStore.multipleChoiceOptions,
    "variable_name"
  );
  replaceId(
    dataStore.questionClearLogic,
    "Clear Questions",
    dataStore.questions,
    "variable_name"
  );

  dataStore.timestamp = await Date.now();
  return dataStore;
});

var writeFeedback = (exports.writeFeedback = async function writeFeedback(
  payload
) {
  var url = "https://api.airtable.com/v0/appoFDwVvNMRSaO6o/feedback";
  var resp = await fetch(url, {
    body: JSON.stringify({ fields: payload }),
    cache: "no-cache",
    headers: {
      Authorization: "Bearer " + writeKey,
      "content-type": "application/json"
    },
    method: "POST"
  });
  return await resp.json();
});
