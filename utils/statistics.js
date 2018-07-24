import benefitsFixture from "../__tests__/fixtures/benefits";

export const get = loadDataStore => {
  loadDataStore({
    benefits: benefitsFixture
  });
};
