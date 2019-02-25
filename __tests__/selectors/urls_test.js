import lunr from "lunr";
import questionsFixture from "../fixtures/questions";
import {
  getFavouritesUrl,
  getPrintUrl,
  getSummaryUrl
} from "../../selectors/urls";

describe("getFavouritesUrl", () => {
  let props;
  let state;

  beforeEach(() => {
    props = {
      t: () => "en"
    };
    state = {
      questions: questionsFixture,
      selectedNeeds: {},
      patronType: "",
      searchString: "",
      serviceType: "",
      serviceHealthIssue: "",
      statusAndVitals: ""
    };
  });

  it("adds the language variable by default", () => {
    expect(getFavouritesUrl(state, props)).toEqual("/favourites?lng=en");
  });

  it("adds selectedNeeds keys to the URL", () => {
    state.selectedNeeds = { a: 1, b: 2 };
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&selectedNeeds=a,b"
    );
  });

  it("adds patronType string to the URL", () => {
    state.patronType = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&patronType=foo"
    );
  });

  it("adds searchString string to the URL", () => {
    state.searchString = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&searchString=foo"
    );
  });

  it("adds serviceType string to the URL", () => {
    state.serviceType = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&serviceType=foo"
    );
  });

  it("adds serviceHealthIssue string to the URL", () => {
    state.serviceHealthIssue = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&serviceHealthIssue=foo"
    );
  });

  it("adds statusAndVitals string to the URL", () => {
    state.statusAndVitals = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&statusAndVitals=foo"
    );
  });
});

describe("getPrintUrl", () => {
  let params;
  let props;
  let state;

  beforeEach(() => {
    params = {};
    props = {
      favouriteBenefits: [
        {
          id: "0",
          childBenefits: [],
          availableIndependently: "Requires Gateway Benefit"
        }
      ],
      t: () => "en"
    };
    state = {
      questions: questionsFixture,
      selectedNeeds: {},
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
          nameFr: "Fr Need 1",
          benefits: ["1"]
        },
        {
          id: "2",
          nameEn: "Need 2",
          nameFr: "Fr Need 2",
          benefits: ["2"]
        }
      ],
      patronType: "",
      searchString: "",
      serviceType: "",
      serviceHealthIssue: "",
      statusAndVitals: "",
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
      benefitEligibility: [
        {
          id: "0",
          benefit: ["0"],
          patronType: ["p1"]
        },
        {
          id: "1",
          benefit: ["2"],
          patronType: ["p1"]
        },
        {
          id: "2",
          benefit: ["4"],
          patronType: ["p1"]
        },
        {
          id: "3",
          benefit: ["2"],
          patronType: ["p2"]
        },
        {
          id: "4",
          benefit: ["1"],
          patronType: ["p3"]
        },
        {
          id: "5",
          benefit: ["3"],
          patronType: ["p3"]
        },
        {
          id: "6",
          benefit: ["4"],
          patronType: ["p3"]
        }
      ],
      multipleChoiceOptions: [
        {
          variable_name: "p1",
          linked_question: "patronType",
          id: "patronType: p1"
        },
        {
          variable_name: "p2",
          linked_question: "patronType",
          id: "patronType: p2"
        },
        {
          variable_name: "p3",
          linked_question: "patronType",
          id: "patronType: p3"
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
      })
    };
  });

  it("adds the language, and benefits variables by default", () => {
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&benefits=0,1,2,3,4"
    );
  });

  it("adds selectedNeeds keys to the URL", () => {
    state.selectedNeeds = [{ id: "0" }];
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&benefits=0&selectedNeeds=0"
    );
  });

  it("adds patronType string to the URL", () => {
    state.patronType = "foo";
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&patronType=foo"
    );
  });

  it("adds serviceType string to the URL", () => {
    state.serviceType = "foo";
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&benefits=0,1,2,3,4&serviceType=foo"
    );
  });

  it("adds serviceHealthIssue string to the URL", () => {
    state.serviceHealthIssue = "foo";
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&benefits=0,1,2,3,4&serviceHealthIssue=foo"
    );
  });

  it("adds statusAndVitals string to the URL", () => {
    state.statusAndVitals = "foo";
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&benefits=0,1,2,3,4&statusAndVitals=foo"
    );
  });

  it("adds fromFavourites string to the URL", () => {
    params["fromFavourites"] = true;
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&fromFavourites=true"
    );
  });
});

describe("getSummaryUrl", () => {
  let props;
  let state;

  beforeEach(() => {
    props = {
      t: () => "en"
    };
    state = {
      questions: questionsFixture,
      selectedNeeds: {},
      patronType: "",
      searchString: "",
      serviceType: "",
      serviceHealthIssue: "",
      statusAndVitals: ""
    };
  });

  it("adds the language variable by default", () => {
    expect(getSummaryUrl(state, props)).toEqual("/summary?lng=en");
  });

  it("adds selectedNeeds keys to the URL", () => {
    state.selectedNeeds = { a: 1, b: 2 };
    expect(getSummaryUrl(state, props)).toEqual(
      "/summary?lng=en&selectedNeeds=a,b"
    );
  });

  it("adds patronType string to the URL", () => {
    state.patronType = "foo";
    expect(getSummaryUrl(state, props)).toEqual(
      "/summary?lng=en&patronType=foo"
    );
  });

  it("doesn't add searchString string to the URL", () => {
    state.searchString = "foo";
    expect(getSummaryUrl(state, props)).toEqual("/summary?lng=en");
  });
});
