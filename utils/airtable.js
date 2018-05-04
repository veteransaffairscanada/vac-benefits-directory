import fetch from "isomorphic-unfetch";

const key = "keySzaXvONeLwsBm4"; // Read access only API key

const fetchTableFromAirtable = async table => {
  let url =
    "https://api.airtable.com/v0/appIjjOxIa2utbHGH/" +
    table +
    "?maxRecords=100&view=Grid%20view";
  let resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  });
  let json = await resp.json();
  return json.records.map(item => {
    return item.fields;
  });
};

export const hydrateFromAirtable = async loadDataStore => {
  loadDataStore({
    benefitTypes: await fetchTableFromAirtable("benefit_types")
  });
  loadDataStore({ patronTypes: await fetchTableFromAirtable("patron_types") });
  loadDataStore({ benefits: await fetchTableFromAirtable("benefits") });
  loadDataStore({ corporaEn: await fetchTableFromAirtable("corpora_en") });
  loadDataStore({ corporaFr: await fetchTableFromAirtable("corpora_fr") });
};
