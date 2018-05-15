import fetch from "isomorphic-unfetch";

const key = "keySzaXvONeLwsBm4"; // Read access only API key

const fetchTableFromAirtable = async (table, cache) => {
  let result = cache.get(table);
  if (typeof result !== "undefined") {
    return result;
  }
  let url =
    "https://api.airtable.com/v0/appijjoxia2utbhgh/" +
    table +
    "?maxrecords=100&view=grid%20view";
  let resp = await fetch(url, {
    headers: {
      authorization: `bearer ${key}`
    }
  });
  let json = await resp.json();
  return json.records.map(item => {
    return item.fields;
  });
};

export const hydrateFromAirtable = async (loadDataStore, cache) => {
  loadDataStore({
    benefitTypes: await fetchTableFromAirtable("benefit_types", cache)
  });
  loadDataStore({
    patronTypes: await fetchTableFromAirtable("patron_types", cache)
  });
  loadDataStore({ benefits: await fetchTableFromAirtable("benefits", cache) });
  loadDataStore({
    corporaEn: await fetchTableFromAirtable("corpora_en", cache)
  });
  loadDataStore({
    corporaFr: await fetchTableFromAirtable("corpora_fr", cache)
  });
};
