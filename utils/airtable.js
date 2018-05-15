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

export const hydrateFromAirtable = async (loadDataStore, cache) => {
  console.log("+++ Cache hydrateFromAirtable:", cache);

  let benefit_types, patron_types, benefits, corpora_en, corpora_fr;

  if (0) {
    loadDataStore({
      benefitTypes: await fetchTableFromAirtable("benefit_types")
    });
    loadDataStore({
      patronTypes: await fetchTableFromAirtable("patron_types")
    });
    loadDataStore({ benefits: await fetchTableFromAirtable("benefits") });
    loadDataStore({ corporaEn: await fetchTableFromAirtable("corpora_en") });
    loadDataStore({ corporaFr: await fetchTableFromAirtable("corpora_fr") });
  } else {
    if (typeof cache.get("benefit_types") !== "undefined") {
      benefit_types = cache.get("benefit_types");
      patron_types = cache.get("patron_types");
      benefits = cache.get("benefits");
      corpora_en = cache.get("corpora_en");
      corpora_fr = cache.get("corpora_fr");
    } else {
      benefit_types = await fetchTableFromAirtable("benefit_types");
      patron_types = await fetchTableFromAirtable("patron_types");
      benefits = await fetchTableFromAirtable("benefits");
      corpora_en = await fetchTableFromAirtable("corpora_en");
      corpora_fr = await fetchTableFromAirtable("corpora_fr");

      cache.set("benefit_types", benefit_types);
      cache.set("patron_types", patron_types);
      cache.set("benefits", benefits);
      cache.set("corpora_en", corpora_en);
      cache.set("corpora_fr", corpora_fr);
    }

    console.log("benefit_types", benefit_types);
    console.log("patron_types", patron_types);
    console.log("benefits", benefits);
    console.log("corpora_en", corpora_en);
    console.log("corpora_fr", corpora_fr);

    loadDataStore({ benefitTypes: benefit_types });
    loadDataStore({ patronTypes: patron_types });
    loadDataStore({ benefits: benefits });
    loadDataStore({ corporaEn: corpora_en });
    loadDataStore({ corporaFr: corpora_fr });
  }
};
