import lunr from "lunr";
import {
  getProfileFilters,
  pathToDict,
  eligibilityMatch,
  getFilteredBenefitsWithoutSearch,
  getFilteredBenefits
} from "../../selectors/benefits";
import questionsFixture from "../fixtures/questions";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import needsFixture from "../fixtures/needs";

describe("Benefits Selectors", () => {
  let props;
  let state;

  beforeEach(() => {
    props = {
      t: () => "en"
    };
    state = {
      questions: questionsFixture,
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      enIdx: JSON.stringify({
        version: lunr.version,
        fields: ["vacNameEn", "oneLineDescriptionEn"],
        fieldVectors: [
          ["vacNameEn/benefit_1", [0, 0.288]],
          ["oneLineDescriptionEn/benefit_1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            {
              _index: 1,
              vacNameEn: {},
              oneLineDescriptionEn: { benefit_1: {} }
            }
          ],
          [
            "fiz",
            {
              _index: 0,
              vacNameEn: { benefit_1: {} },
              oneLineDescriptionEn: {}
            }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      frIdx: JSON.stringify({
        version: lunr.version,
        fields: ["vacNameFr", "oneLineDescriptionFr"],
        fieldVectors: [
          ["vacNameFr/benefit_1", [0, 0.288]],
          ["oneLineDescriptionFr/benefit_1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            {
              _index: 1,
              vacNameFr: {},
              oneLineDescriptionFr: { benefit_1: {} }
            }
          ],
          [
            "fiz",
            {
              _index: 0,
              vacNameFr: { benefit_1: {} },
              oneLineDescriptionFr: {}
            }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      needs: needsFixture,
      selectedNeeds: {},
      patronType: "",
      searchString: "",
      serviceType: ""
    };
  });

  describe("getProfileFilters", () => {
    it("returns an object with the selected profile values", () => {
      state.patronType = "p2";
      state.serviceType = "s1";
      let returnValue = getProfileFilters(state, props);
      expect(Object.keys(returnValue).sort()).toEqual(
        [
          "patronType",
          "serviceType",
          "statusAndVitals",
          "serviceHealthIssue"
        ].sort()
      );
      expect(returnValue.patronType).toEqual("p2");
      expect(returnValue.serviceType).toEqual("s1");
      expect(returnValue.statusAndVitals).toEqual(undefined);
      expect(returnValue.serviceHealthIssue).toEqual(undefined);
    });
  });

  describe("pathToDict function", () => {
    it("works as expected", () => {
      const ep = {
        requirements: ["mco_p3", "mco_s1", "mco_p1"]
      };
      const actual = pathToDict(ep, state.multipleChoiceOptions);
      expect(actual).toEqual({
        patronType: ["p3", "p1"],
        serviceType: ["s1"]
      });
    });
  });

  describe("eligibilityMatch", () => {
    it("matches if nothing selected", () => {
      const ep = {
        requirements: ["mco_p3"]
      };
      const profileFilters = {
        patronType: "",
        serviceType: ""
      };
      const actual = eligibilityMatch(
        ep,
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(true);
    });

    it("matches if requirements undefined", () => {
      const ep = {
        requirements: undefined,
        patronType: "p3",
        serviceType: "na",
        statusAndVitals: "na",
        benefits: ["1", "3", "4"]
      };
      const profileFilters = {
        patronType: "p3",
        serviceType: "",
        statusAndVitals: ""
      };
      const actual = eligibilityMatch(
        ep,
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(true);
    });

    it("matches if requirements empty", () => {
      const ep = {
        requirements: [],
        patronType: "p3",
        serviceType: "na",
        statusAndVitals: "na",
        benefits: ["1", "3", "4"]
      };
      const profileFilters = {
        patronType: "p3",
        serviceType: "",
        statusAndVitals: ""
      };
      const actual = eligibilityMatch(
        ep,
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(true);
    });

    it("matches if selections match", () => {
      const ep = {
        requirements: ["mco_p3"]
      };
      const profileFilters = {
        patronType: "p3",
        serviceType: "",
        statusAndVitals: ""
      };
      const actual = eligibilityMatch(
        ep,
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(true);
    });

    it("doesn't match if selections don't match", () => {
      const ep = {
        requirements: ["mco_p3"]
      };
      const profileFilters = {
        patronType: "p2",
        serviceType: "",
        statusAndVitals: ""
      };
      const actual = eligibilityMatch(
        ep,
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(false);
    });

    it("matches if selection included in requirements along with others", () => {
      const ep = {
        requirements: ["mco_p3", "mco_p2"]
      };
      const profileFilters = {
        patronType: "p2",
        serviceType: "",
        statusAndVitals: ""
      };
      const actual = eligibilityMatch(
        ep,
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(true);
    });
  });

  describe("getFilteredBenefitsWithoutSearch", () => {
    it("displays all benefits if nothing selected", () => {
      let returnValue = getFilteredBenefitsWithoutSearch(state, props).map(
        b => b.id
      );
      returnValue.sort();
      expect(returnValue).toEqual([
        "benefit_0",
        "benefit_1",
        "benefit_2",
        "benefit_3"
      ]);
    });

    it("returns an empty array if there are no benefits", () => {
      state.benefits = [];
      let returnValue = getFilteredBenefitsWithoutSearch(state, props);
      expect(returnValue).toEqual([]);
    });

    it("displays benefits 0, 2 if patronType p1", () => {
      state.patronType = "p1";
      expect(
        getFilteredBenefitsWithoutSearch(state, props).map(b => b.id)
      ).toEqual(["benefit_0", "benefit_2"]);
    });

    it("returns benefits based on selectedNeeds", () => {
      state.selectedNeeds = { need_1: "need_1" };
      let returnValue = getFilteredBenefitsWithoutSearch(state, props);
      expect(returnValue).toEqual([benefitsFixture[3]]);
    });
  });

  describe("getFilteredBenefits", () => {
    it("displays all benefits if nothing selected", () => {
      let returnValue = getFilteredBenefits(state, props).map(b => b.id);
      returnValue.sort();
      expect(returnValue).toEqual([
        "benefit_0",
        "benefit_1",
        "benefit_2",
        "benefit_3"
      ]);
    });

    it("returns an empty array if there are no benefits", () => {
      state.benefits = [];
      let returnValue = getFilteredBenefits(state, props);
      expect(returnValue).toEqual([]);
    });

    it("displays benefits 0, 2 if patronType p1", () => {
      state.patronType = "p1";
      expect(getFilteredBenefits(state, props).map(b => b.id)).toEqual([
        "benefit_0",
        "benefit_2"
      ]);
    });

    it("returns benefits based on selectedNeeds", () => {
      state.selectedNeeds = { need_1: "need_1" };
      let returnValue = getFilteredBenefits(state, props);
      expect(returnValue).toEqual([benefitsFixture[3]]);
    });

    it("runs a lunr search on the english index if searchString is set an english is used", () => {
      state.searchString = "Fiz";
      expect(getFilteredBenefits(state, props).map(b => b.id)).toEqual([
        "benefit_1"
      ]);
    });

    it("runs a lunr search on the french index if searchString is set an french is used", () => {
      props.t = () => "fr";
      state.searchString = "Fiz";
      expect(getFilteredBenefits(state, props).map(b => b.id)).toEqual([
        "benefit_1"
      ]);
    });
  });
});
