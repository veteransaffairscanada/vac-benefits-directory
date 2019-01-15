import {
  getProfileFilters,
  pathToDict,
  eligibilityMatch,
  getFilteredBenefitsWithoutSearch,
  getFilteredNextSteps,
  getFilteredBenefits
} from "../../selectors/benefits";
import questionsFixture from "../fixtures/questions_complex";
import benefitsFixture from "../fixtures/benefits_complex";
import eligibilityPathsFixture from "../fixtures/eligibility_paths_complex";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options_complex";
import needsFixture from "../fixtures/needs_complex";
import enIdx from "../fixtures/lunr_index_english";
import frIdx from "../fixtures/lunr_index_french";
import nextStepsFixture from "../fixtures/nextSteps_complex";
import benefitExamplesFixture from "../fixtures/benefitExamples";

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
      enIdx: enIdx,
      frIdx: frIdx,
      needs: needsFixture,
      selectedNeeds: {},
      patronType: "",
      searchString: "",
      serviceType: "",
      benefitExamples: benefitExamplesFixture,
      nextSteps: nextStepsFixture
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
      const actual = pathToDict(
        state.eligibilityPaths[11],
        state.multipleChoiceOptions
      );
      expect(actual).toEqual({
        patronType: ["veteran", "servingMember"],
        serviceType: ["RCMP"],
        serviceHealthIssue: ["hasServiceHealthIssue"]
      });
    });
  });

  describe("eligibilityMatch", () => {
    it("matches if nothing selected", () => {
      const profileFilters = {
        patronType: "",
        serviceType: ""
      };
      const actual = eligibilityMatch(
        state.eligibilityPaths[0],
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
      const profileFilters = {
        patronType: "veteran",
        serviceType: "CAF",
        statusAndVitals: ""
      };
      const actual = eligibilityMatch(
        state.eligibilityPaths[2],
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(true);
    });

    it("doesn't match if selections don't match", () => {
      const profileFilters = {
        patronType: "family",
        serviceType: "CAF",
        statusAndVitals: ""
      };
      const actual = eligibilityMatch(
        state.eligibilityPaths[2],
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(false);
    });
  });

  describe("getFilteredBenefitsWithoutSearch", () => {
    it("displays all benefits if nothing selected", () => {
      let allBenefitNames = new Set(
        getFilteredBenefitsWithoutSearch(state, props).map(b => b.vacNameEn)
      );
      expect(allBenefitNames).toEqual(
        new Set(state.benefits.map(x => x.vacNameEn))
      );
    });

    it("returns an empty array if there are no benefits", () => {
      state.benefits = [];
      let returnValue = getFilteredBenefitsWithoutSearch(state, props);
      expect(returnValue).toEqual([]);
    });

    it("displays appropriate benefits if patronType is organization", () => {
      state.patronType = "organization";
      const nameEnList = [
        "Community Engagement Fund",
        "Community War Memorial Fund",
        "Grave Marker Maintenance",
        "Veteran and Family Well-Being Fund"
      ];
      const relevant_benefits = state.benefits.filter(x => {
        return nameEnList.indexOf(x.vacNameEn) > -1;
      });
      expect(
        getFilteredBenefitsWithoutSearch(state, props).map(x => x.vacNameEn)
      ).toEqual(relevant_benefits.map(x => x.vacNameEn));
    });

    it("returns benefits based on selectedNeeds", () => {
      const selectedNeed = state.needs.filter(
        x => x.nameEn === "Emergency funds"
      )[0];
      state.selectedNeeds = { [selectedNeed.id]: selectedNeed.id };
      let returnValue = getFilteredBenefitsWithoutSearch(state, props).map(
        x => x.vacNameEn
      );
      expect(returnValue).toEqual(["Veterans Emergency Fund"]);
    });
  });

  describe("getFilteredBenefits", () => {
    it("displays all benefits if nothing selected", () => {
      let allBenefitNames = new Set(
        getFilteredBenefits(state, props).map(b => b.vacNameEn)
      );
      expect(allBenefitNames).toEqual(
        new Set(state.benefits.map(x => x.vacNameEn))
      );
    });

    it("returns an empty array if there are no benefits", () => {
      state.benefits = [];
      let returnValue = getFilteredBenefits(state, props);
      expect(returnValue).toEqual([]);
    });

    it("displays appropriate benefits if patronType is organization", () => {
      state.patronType = "organization";
      const nameEnList = [
        "Community Engagement Fund",
        "Community War Memorial Fund",
        "Grave Marker Maintenance",
        "Veteran and Family Well-Being Fund"
      ];
      const relevant_benefits = state.benefits.filter(x => {
        return nameEnList.indexOf(x.vacNameEn) > -1;
      });
      expect(getFilteredBenefits(state, props).map(x => x.vacNameEn)).toEqual(
        relevant_benefits.map(x => x.vacNameEn)
      );
    });

    it("returns benefits based on selectedNeeds", () => {
      const selectedNeed = state.needs.filter(
        x => x.nameEn === "Emergency funds"
      )[0];
      state.selectedNeeds = { [selectedNeed.id]: selectedNeed.id };
      let returnValue = getFilteredBenefits(state, props).map(x => x.vacNameEn);
      expect(returnValue).toEqual(["Veterans Emergency Fund"]);
    });

    it("runs a lunr search on the english index if searchString is set an english is used", () => {
      state.searchString = "health";
      expect(getFilteredBenefits(state, props).length).not.toEqual(0);
    });

    it("runs a lunr search on the french index if searchString is set an french is used", () => {
      props.t = () => "fr";
      state.searchString = "avantage";
      expect(getFilteredBenefits(state, props).length).not.toEqual(0);
    });

    it("returns a list of results sorted according to their lunr score", () => {
      state.searchString = "benefit";
      const rankedScores = getFilteredBenefits(state, props).map(x => x.score);
      expect(
        rankedScores
          .concat()
          .sort()
          .reverse()
      ).toEqual(rankedScores);
    });

    it("returns a results if user searches see more content", () => {
      state.searchString = "inpatient";
      expect(getFilteredBenefits(state, props).map(x => x.vacNameEn)).toEqual([
        "Disability Benefits"
      ]);
    });
  });

  describe("getFilteredNextSteps", () => {
    it("displays all next steps if no eligibility paths are selected", () => {
      expect(getFilteredNextSteps(state, props).length).toEqual(
        nextStepsFixture.length
      );
    });

    it("displays expected next steps if the patronType is organization", () => {
      state.patronType = "organization";
      expect(getFilteredNextSteps(state, props).length).toEqual(3);
    });
  });
});
