import { benefitsFixture } from "../__tests__/fixtures/benefits";
import benefitTypesFixture from "../__tests__/fixtures/benefit_types";
import patronTypesFixture from "../__tests__/fixtures/patron_types";
import {
  corporaEnFixture,
  corporaFrFixture
} from "../__tests__/fixtures/corpora";

export const hydrateFromFixtures = loadDataStore => {
  loadDataStore({
    benefitTypes: benefitTypesFixture,
    patronTypes: patronTypesFixture,
    benefits: benefitsFixture,
    corporaEn: corporaEnFixture,
    corporaFr: corporaFrFixture
  });
};
