import { getFilteredBenefitsB } from "../../selectors/benefits_B";

describe("getFilteredBenefits", () => {
  let props;
  let state;

  beforeEach(() => {
    props = {
      t: () => "en"
    };
    state = {
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
        version: "2.3.0",
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
        version: "2.3.0",
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
      needs: [],
      selectedNeeds: {},
      patronType: "",
      searchString: "",
      serviceType: "",
      statusAndVitals: ""
    };
  });

  it("displays all benefits if nothing selected", () => {
    let returnValue = getFilteredBenefitsB(state, props).map(b => b.id);
    returnValue.sort();
    expect(returnValue).toEqual(["0", "1", "2", "3", "4"]);
  });

  it("displays benefits 0, 2, 4 if patronType p1", () => {
    state.patronType = "p1";
    expect(getFilteredBenefitsB(state, props).map(b => b.id)).toEqual([
      "0",
      "2",
      "4"
    ]);
  });

  it("runs a lunr search on the english index if searchString is set an english is used", () => {
    state.searchString = "Fiz";
    expect(getFilteredBenefitsB(state, props).map(b => b.id)).toEqual(["1"]);
  });

  it("runs a lunr search on the french index if searchString is set an french is used", () => {
    props.t = () => "fr";
    state.searchString = "Fiz";
    expect(getFilteredBenefitsB(state, props).map(b => b.id)).toEqual(["1"]);
  });
});
