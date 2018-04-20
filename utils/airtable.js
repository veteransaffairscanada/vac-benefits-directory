import fetch from "isomorphic-unfetch";

export const fetchFromAirtable = async loadDataStore => {
  const key = "keySzaXvONeLwsBm4"; // Read access only API key

  let url =
    "https://api.airtable.com/v0/appIjjOxIa2utbHGH/benefit_types?maxRecords=100&view=Grid%20view";
  let resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  });
  let json = await resp.json();
  const benefitTypes = json.records.map(item => {
    return item.fields;
  });

  url =
    "https://api.airtable.com/v0/appIjjOxIa2utbHGH/patron_types?maxRecords=100&view=Grid%20view";
  resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  });
  json = await resp.json();
  const patronTypes = json.records.map(item => {
    return item.fields;
  });

  url =
    "https://api.airtable.com/v0/appIjjOxIa2utbHGH/benefits?maxRecords=100&view=Grid%20view";
  resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  });
  json = await resp.json();
  const benefits = json.records.map(item => {
    return item.fields;
  });

  const newStore = {
    storeHydrated: true,
    benefitTypes: benefitTypes,
    patronTypes: patronTypes,
    benefits: benefits
  };
  loadDataStore(newStore);

  console.log(newStore);
};
