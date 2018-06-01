require("isomorphic-fetch");

exports.hydrateFromAirtable = undefined;

var key = "keySzaXvONeLwsBm4"; // Read access only API key

var fetchTableFromAirtable = async function fetchTableFromAirtable(table) {
  var url =
    "https://api.airtable.com/v0/appoFDwVvNMRSaO6o/" +
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

var checkLinks = async function checklinks(benefits) {
  var brokenLinks = [];
  var responseEn, responseFr;
  for (let benefit of benefits) {
    responseEn = await fetch(benefit.benefitPageEn);
    responseFr = await fetch(benefit.benefitPageFr);
    if (responseEn.status !== 200) {
      brokenLinks.push(benefit.benefitPageEn);
    }
    if (responseFr.status !== 200) {
      brokenLinks.push(benefit.benefitPageFr);
    }
    console.log("type", typeof responseEn.body);
    if (responseEn.body.indexOf(benefit.benefitPageEn) === -1) {
      console.log(benefit.benefitPageEn, responseEn, "BAD URL");
    }
  }
  return brokenLinks;
};

var hydrateFromAirtable = (exports.hydrateFromAirtable = async function hydrateFromAirtable() {
  let dataStore = {};
  dataStore.benefits = await fetchTableFromAirtable("benefits");
  dataStore.eligibilityPaths = await fetchTableFromAirtable("eligibilityPaths");
  dataStore.needs = await fetchTableFromAirtable("needs");
  dataStore.examples = await fetchTableFromAirtable("examples");
  dataStore.timestamp = await Date.now();

  dataStore.brokenLinks = await checkLinks(dataStore.benefits.slice(1, 2));

  console.log(dataStore.brokenLinks);

  return dataStore;
});
