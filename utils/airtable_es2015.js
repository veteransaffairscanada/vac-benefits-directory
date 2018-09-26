require("isomorphic-fetch");

exports.hydrateFromAirtable = exports.writeFeedback = undefined;

var airtableConstants = require("./airtable_constants");
var readKey = process.env.AIRTABLE_READ_KEY;
var writeKey = process.env.AIRTABLE_WRITE_KEY;

var replaceId = function replaceId(
  database,
  dataBaseLinkColumnName,
  linkedDatabase,
  linkedReplaceColumnName,
  linkedIdColumnName = "id"
) {
  database.forEach(row => {
    if (row[dataBaseLinkColumnName]) {
      row[dataBaseLinkColumnName] = row[dataBaseLinkColumnName].map(id => {
        var records = database.filter(row => row[linkedIdColumnName] === id);
        if (records.length === 1) {
          return records[0][linkedReplaceColumnName];
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
  do {
    var url =
      "https://api.airtable.com/v0/appoFDwVvNMRSaO6o/" +
      table +
      "?view=Grid%20view";
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
    dataStore.questions,
    "multiple_choice_options",
    dataStore.multipleChoiceOptions,
    "variable_name"
  );
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
