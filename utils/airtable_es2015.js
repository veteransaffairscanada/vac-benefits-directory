require("isomorphic-fetch");

exports.hydrateFromAirtable = undefined;

var key = "keySzaXvONeLwsBm4"; // Read access only API key

var fetchTableFromAirtable = async function fetchTableFromAirtable(table) {
  var url =
    "https://api.airtable.com/v0/appMwHSvcwyBhF5cN/" +
    table +
    "?maxRecords=100&view=Grid%20view";
  var resp = await fetch(url, {
    headers: {
      Authorization: "Bearer " + key
    }
  });
  var json = await resp.json();

  return json.records.map(function(item) {
    return item.fields;
  });
};

var hydrateFromAirtable = (exports.hydrateFromAirtable = async function hydrateFromAirtable() {
  let dataStore = {};
  dataStore.benefits = await fetchTableFromAirtable("benefits");
  dataStore.eligibility_paths = await fetchTableFromAirtable(
    "eligibility_paths"
  );
  dataStore.timestamp = await Date.now();
  return dataStore;
});
