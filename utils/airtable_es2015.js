"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hydrateFromAirtable = undefined;

var _isomorphicUnfetch = require("isomorphic-unfetch");

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var key = "keySzaXvONeLwsBm4"; // Read access only API key

var fetchTableFromAirtable = async function fetchTableFromAirtable(table) {
  var url =
    "https://api.airtable.com/v0/appIjjOxIa2utbHGH/" +
    table +
    "?maxRecords=100&view=Grid%20view";
  var resp = await (0, _isomorphicUnfetch2.default)(url, {
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
  dataStore.benefitTypes = await fetchTableFromAirtable("benefit_types");
  dataStore.patronTypes = await fetchTableFromAirtable("patron_types");
  dataStore.benefits = await fetchTableFromAirtable("benefits");
  dataStore.corporaEn = await fetchTableFromAirtable("corpora_en");
  dataStore.corporaFr = await fetchTableFromAirtable("corpora_fr");
  dataStore.timestamp = await Date.now();
  return dataStore;
});
