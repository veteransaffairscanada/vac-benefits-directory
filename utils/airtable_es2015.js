require("isomorphic-fetch");

exports.hydrateFromAirtable = exports.writeFeedback = undefined;

var readKey = "keySzaXvONeLwsBm4"; // Read access only API key
var writeKey = process.env.AIRTABLE_WRITE_KEY;

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
  dataStore.benefits = await fetchTableFromAirtable("benefits");
  dataStore.eligibilityPaths = await fetchTableFromAirtable("eligibilityPaths");
  dataStore.needs = await fetchTableFromAirtable("needs");
  dataStore.examples = await fetchTableFromAirtable("examples");
  dataStore.text = await fetchTableFromAirtable("text");
  dataStore.areaOffices = await fetchTableFromAirtable("areaOffices");
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
