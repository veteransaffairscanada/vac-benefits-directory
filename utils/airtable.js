import fetch from "isomorphic-unfetch";

export const fetchFromAirtable = async updateBenefitTypes => {
  const key = "keySzaXvONeLwsBm4";
  const url =
    "https://api.airtable.com/v0/appIjjOxIa2utbHGH/benefit_types?maxRecords=100&view=Grid%20view";

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  });

  const json = await resp.json();

  const munged = json.records.map(item => {
    return item.fields;
  });

  updateBenefitTypes(munged);

  console.log(munged);
};
