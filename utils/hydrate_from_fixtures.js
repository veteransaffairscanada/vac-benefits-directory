import benefitsFixture from "../__tests__/fixtures/benefits";

export const hydrateFromFixtures = loadDataStore => {
  loadDataStore({
    benefits: benefitsFixture
  });
};
