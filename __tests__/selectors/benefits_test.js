import {
  getProfileFilters,
  eligibilityMatch,
  getFilteredBenefitsWithoutSearch,
  getFilteredNextSteps,
  getFilteredBenefits
} from "../../selectors/benefits";
import enIdx from "../fixtures/lunr_index_english";
import frIdx from "../fixtures/lunr_index_french";
import fs from "fs";
const data = JSON.parse(fs.readFileSync("data/data.json"));

describe("Benefits Selectors", () => {
  let props;
  let state;

  beforeEach(() => {
    props = {
      t: () => "en"
    };
    state = {
      questions: data.questions,
      benefits: data.benefits,
      benefitEligibility: data.benefitEligibility,
      multipleChoiceOptions: data.multipleChoiceOptions,
      enIdx: enIdx,
      frIdx: frIdx,
      needs: data.needs,
      selectedNeeds: {},
      patronType: "",
      statusAndVitals: "",
      serviceHealthIssue: "",
      searchString: "",
      serviceType: "",
      benefitExamples: data.benefitExamples,
      nextSteps: data.nextSteps
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
      expect(returnValue.statusAndVitals).toEqual("");
      expect(returnValue.serviceHealthIssue).toEqual("");
    });
  });

  describe("eligibilityMatch", () => {
    it("matches if nothing selected", () => {
      const profileFilters = {
        patronType: "",
        serviceType: ""
      };
      const actual = eligibilityMatch(
        state.benefits[0],
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(true);
    });

    it("matches if selections match", () => {
      const profileFilters = {
        patronType: ["veteran"],
        serviceType: ["CAF"]
      };
      const actual = eligibilityMatch(
        state.benefitEligibility[3],
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(true);
    });

    it("doesn't match if selections don't match", () => {
      const profileFilters = {
        patronType: ["family"],
        serviceType: ["CAF"]
      };
      const actual = eligibilityMatch(
        state.benefitEligibility[3],
        profileFilters,
        state.multipleChoiceOptions
      );
      expect(actual).toEqual(false);
    });
  });

  describe("getFilteredBenefitsWithoutSearch", () => {
    it("displays all benefits if nothing selected", () => {
      let allBenefitNames = new Set(
        getFilteredBenefitsWithoutSearch(state, props).map(b => b.id)
      );
      expect(allBenefitNames).toEqual(
        new Set(state.benefitEligibility.map(x => x.benefit[0]))
      );
    });

    it("returns an empty array if there are no benefits", () => {
      state.benefits = [];
      let returnValue = getFilteredBenefitsWithoutSearch(state, props);
      expect(returnValue).toEqual([]);
    });

    it("displays appropriate benefits if patronType is organization", () => {
      state.patronType = "organization";
      const orgId = state.multipleChoiceOptions.filter(
        x => x.variable_name === "organization"
      )[0].id;
      const relevant_benefits = state.benefitEligibility.filter(x => {
        return x.patronType.indexOf(orgId) > -1;
      });
      expect(
        getFilteredBenefitsWithoutSearch(state, props).map(x => x.id)
      ).toEqual(relevant_benefits.map(x => x.benefit[0]));
    });

    it("returns benefits based on selectedNeeds", () => {
      const selectedNeed = state.needs.filter(
        x => x.nameEn === "Emergency funds"
      )[0];
      state.selectedNeeds = { [selectedNeed.id]: selectedNeed.id };
      let returnValue = getFilteredBenefitsWithoutSearch(state, props).map(
        x => x.id
      );
      expect(new Set(returnValue)).toEqual(new Set(selectedNeed.benefits));
    });
  });

  describe("getFilteredBenefits", () => {
    it("displays all benefits if nothing selected", () => {
      let allBenefitNames = new Set(
        getFilteredBenefits(state, props).map(b => b.id)
      );
      expect(allBenefitNames).toEqual(
        new Set(state.benefitEligibility.map(x => x.benefit[0]))
      );
    });

    it("returns an empty array if there are no benefits", () => {
      state.benefits = [];
      let returnValue = getFilteredBenefits(state, props);
      expect(returnValue).toEqual([]);
    });

    it("displays appropriate benefits if patronType is organization", () => {
      state.patronType = "organization";
      const orgId = state.multipleChoiceOptions.filter(
        x => x.variable_name === "organization"
      )[0].id;
      const relevant_benefits = state.benefitEligibility.filter(x => {
        return x.patronType.indexOf(orgId) > -1;
      });
      expect(getFilteredBenefits(state, props).map(x => x.id)).toEqual(
        relevant_benefits.map(x => x.benefit[0])
      );
    });

    it("returns benefits based on selectedNeeds", () => {
      const selectedNeed = state.needs.filter(
        x => x.nameEn === "Emergency funds"
      )[0];
      state.selectedNeeds = { [selectedNeed.id]: selectedNeed.id };
      let returnValue = getFilteredBenefits(state, props).map(x => x.id);
      expect(new Set(returnValue)).toEqual(new Set(selectedNeed.benefits));
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
        "Disability benefits"
      ]);
    });
  });

  describe("getFilteredNextSteps", () => {
    it("displays next steps with no eligibility requirements if no eligibility paths are selected", () => {
      const nextSteps = state.nextSteps.filter(x => {
        let noEligibility = true;
        [
          "patronType",
          "serviceType",
          "serviceHealthIssue",
          "statusAndVitals"
        ].forEach(y => {
          if (Object.keys(x).indexOf(y) > -1 && x[y].length > 0) {
            noEligibility = false;
          }
        });
        return noEligibility;
      });
      expect(getFilteredNextSteps(state, props)).toEqual(nextSteps);
    });

    it("displays expected next steps if the patronType is servingMember", () => {
      state.patronType = "servingMember";
      const id = state.multipleChoiceOptions.filter(
        x => x.variable_name === "servingMember"
      )[0].id;
      const nextSteps = state.nextSteps
        .filter(x => {
          if (
            Object.keys(x).indexOf("patronType") > -1 &&
            x.patronType.indexOf(id) > -1
          ) {
            return true;
          }
          return false;
        })
        .map(x => x.bullet_name);

      nextSteps.forEach(x => {
        expect(
          getFilteredNextSteps(state, props).map(y => y.bullet_name)
        ).toContain(x);
      });
    });

    it("displays expected next steps if the patronType is servingMember", () => {
      state.serviceHealthIssue = "hasServiceHealthIssue";
      const id = state.multipleChoiceOptions.filter(
        x => x.variable_name === "hasServiceHealthIssue"
      )[0].id;
      const nextSteps = state.nextSteps
        .filter(x => {
          if (
            Object.keys(x).indexOf("serviceHealthIssue") > -1 &&
            x.serviceHealthIssue.indexOf(id) > -1
          ) {
            return true;
          }
          return false;
        })
        .map(x => x.bullet_name);

      nextSteps.forEach(x => {
        expect(
          getFilteredNextSteps(state, props).map(y => y.bullet_name)
        ).toContain(x);
      });
    });
  });
});
