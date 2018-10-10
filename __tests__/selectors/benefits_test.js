import lunr from "lunr";
import {
  getProfileFilters,
  getFilteredBenefitsWithoutSearch,
  getFilteredBenefits
} from "../../selectors/benefits";
import questionsFixture from "../fixtures/questions";

describe("Benefits Selectors", () => {
  let props;
  let state;

  beforeEach(() => {
    props = {
      t: () => "en"
    };
    state = {
      questions: questionsFixture,
      benefits: [
        {
          id: "0",
          childBenefits: [],
          availableIndependently: "Requires Gateway Benefit"
        },
        {
          id: "1",
          childBenefits: [],
          availableIndependently: "Independent"
        },
        {
          id: "2",
          childBenefits: ["0", "1", "4"],
          availableIndependently: "Independent"
        },
        {
          id: "3",
          childBenefits: ["4"],
          availableIndependently: "Independent"
        },
        {
          id: "4",
          childBenefits: [],
          availableIndependently: "Requires Gateway Benefit"
        }
      ],
      eligibilityPaths: [
        {
          patronType: "p1",
          serviceType: "na",
          statusAndVitals: "na",
          benefits: ["0", "2", "4"]
        },
        {
          patronType: "p2",
          serviceType: "na",
          statusAndVitals: "na",
          benefits: ["2"]
        },
        {
          patronType: "p3",
          serviceType: "na",
          statusAndVitals: "na",
          benefits: ["1", "3", "4"]
        }
      ],
      enIdx: JSON.stringify({
        version: lunr.version,
        fields: ["vacNameEn", "oneLineDescriptionEn"],
        fieldVectors: [
          ["vacNameEn/1", [0, 0.288]],
          ["oneLineDescriptionEn/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameEn: {}, oneLineDescriptionEn: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameEn: { "1": {} }, oneLineDescriptionEn: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      frIdx: JSON.stringify({
        version: lunr.version,
        fields: ["vacNameFr", "oneLineDescriptionFr"],
        fieldVectors: [
          ["vacNameFr/1", [0, 0.288]],
          ["oneLineDescriptionFr/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameFr: {}, oneLineDescriptionFr: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameFr: { "1": {} }, oneLineDescriptionFr: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      needs: [
        {
          id: "0",
          nameEn: "Need 0",
          nameFr: "Fr Need 0",
          benefits: ["0"]
        },
        {
          id: "1",
          nameEn: "Need 1",
          nameFr: "Fr Need 1"
        },
        {
          id: "2",
          nameEn: "Need 2",
          nameFr: "Fr Need 2"
        }
      ],
      selectedNeeds: {},
      patronType: "",
      searchString: "",
      serviceType: "",
      statusAndVitals: ""
    };
  });

  describe("getProfileFilters", () => {
    it("returns an object with the selected profile values", () => {
      state.patronType = "p";
      state.serviceType = "st";
      state.statusAndVitals = "sv";
      let returnValue = getProfileFilters(state, props);
      expect(Object.keys(returnValue).sort()).toEqual(
        [
          "patronType",
          "serviceType",
          "statusAndVitals",
          "serviceHealthIssue"
        ].sort()
      );
      expect(returnValue.patronType).toEqual("p");
      expect(returnValue.serviceType).toEqual("st");
      expect(returnValue.statusAndVitals).toEqual("sv");
      expect(returnValue.serviceHealthIssue).toEqual(undefined);
    });
  });

  describe("getFilteredBenefitsWithoutSearch", () => {
    it("displays all benefits if nothing selected", () => {
      let returnValue = getFilteredBenefitsWithoutSearch(state, props).map(
        b => b.id
      );
      returnValue.sort();
      expect(returnValue).toEqual(["0", "1", "2", "3", "4"]);
    });

    it("returns an empty array if there are no benefits", () => {
      state.benefits = [];
      let returnValue = getFilteredBenefitsWithoutSearch(state, props);
      expect(returnValue).toEqual([]);
    });

    it("displays benefits 0, 2, 4 if patronType p1", () => {
      state.patronType = "p1";
      expect(
        getFilteredBenefitsWithoutSearch(state, props).map(b => b.id)
      ).toEqual(["0", "2", "4"]);
    });

    it("returns benefits based on selectedNeeds", () => {
      state.selectedNeeds = { "0": "0", "1": "1", "2": "2" };
      let returnValue = getFilteredBenefitsWithoutSearch(state, props);
      expect(returnValue).toEqual([
        {
          availableIndependently: "Requires Gateway Benefit",
          childBenefits: [],
          id: "0"
        }
      ]);
    });
  });

  describe("getFilteredBenefits", () => {
    it("displays all benefits if nothing selected", () => {
      let returnValue = getFilteredBenefits(state, props).map(b => b.id);
      returnValue.sort();
      expect(returnValue).toEqual(["0", "1", "2", "3", "4"]);
    });

    it("returns an empty array if there are no benefits", () => {
      state.benefits = [];
      let returnValue = getFilteredBenefits(state, props);
      expect(returnValue).toEqual([]);
    });

    it("displays benefits 0, 2, 4 if patronType p1", () => {
      state.patronType = "p1";
      expect(getFilteredBenefits(state, props).map(b => b.id)).toEqual([
        "0",
        "2",
        "4"
      ]);
    });

    it("returns benefits based on selectedNeeds", () => {
      state.selectedNeeds = { "0": "0", "1": "1", "2": "2" };
      let returnValue = getFilteredBenefits(state, props);
      expect(returnValue).toEqual([
        {
          availableIndependently: "Requires Gateway Benefit",
          childBenefits: [],
          id: "0"
        }
      ]);
    });

    it("runs a lunr search on the english index if searchString is set an english is used", () => {
      state.searchString = "Fiz";
      expect(getFilteredBenefits(state, props).map(b => b.id)).toEqual(["1"]);
    });

    it("runs a lunr search on the french index if searchString is set an french is used", () => {
      props.t = () => "fr";
      state.searchString = "Fiz";
      expect(getFilteredBenefits(state, props).map(b => b.id)).toEqual(["1"]);
    });
  });
});
