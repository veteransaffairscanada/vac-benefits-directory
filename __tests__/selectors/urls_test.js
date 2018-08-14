import { getFavouritesUrl, getPrintUrl } from "../../selectors/urls";

describe("getFavouritesUrl", () => {
  let props;
  let state;

  beforeEach(() => {
    props = {
      t: () => "en"
    };
    state = {
      selectedNeeds: {},
      patronType: "",
      searchString: "",
      serviceType: "",
      serviceHealthIssue: "",
      sortBy: "relevance",
      statusAndVitals: ""
    };
  });

  it("adds the language and sortBy variables by default", () => {
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&sortBy=relevance"
    );
  });

  it("adds selectedNeeds keys to the URL", () => {
    state.selectedNeeds = { a: 1, b: 2 };
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&sortBy=relevance&selectedNeeds=a,b"
    );
  });

  it("adds patronType string to the URL", () => {
    state.patronType = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&sortBy=relevance&patronType=foo"
    );
  });

  it("adds searchString string to the URL", () => {
    state.searchString = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&sortBy=relevance&searchString=foo"
    );
  });

  it("adds serviceType string to the URL", () => {
    state.serviceType = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&sortBy=relevance&serviceType=foo"
    );
  });

  it("adds serviceHealthIssue string to the URL", () => {
    state.serviceHealthIssue = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&sortBy=relevance&serviceHealthIssue=foo"
    );
  });

  it("adds statusAndVitals string to the URL", () => {
    state.statusAndVitals = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?lng=en&sortBy=relevance&statusAndVitals=foo"
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
      sortBy: "relevance",
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
      closestAreaOffice: "",
      selectedAreaOffice: "",
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
      })
    };
  });

  it("adds the language, sortBy, and benefits variables by default", () => {
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&benefits=0,1,2,3,4"
    );
  });

  it("adds selectedNeeds keys to the URL", () => {
    state.selectedNeeds = [{ id: "0" }];
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&benefits=0&needs=0"
    );
  });

  it("adds patronType string to the URL", () => {
    state.patronType = "foo";
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&patronType=foo"
    );
  });

  it("adds serviceType string to the URL", () => {
    state.serviceType = "foo";
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&benefits=0,1,2,3,4&serviceType=foo"
    );
  });

  it("adds serviceHealthIssue string to the URL", () => {
    state.serviceHealthIssue = "foo";
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&serviceHealthIssue=foo"
    );
  });

  it("adds statusAndVitals string to the URL", () => {
    state.statusAndVitals = "foo";
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&benefits=0,1,2,3,4&statusAndVitals=foo"
    );
  });

  it("adds closestAOID string to the URL", () => {
    state.closestAreaOffice = { id: "foo" };
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&benefits=0,1,2,3,4&closestAOID=foo"
    );
  });

  it("adds selectedAOID string to the URL", () => {
    state.selectedAreaOffice = { id: "foo" };
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&benefits=0,1,2,3,4&selectedAOID=foo"
    );
  });

  it("adds fromFavourites string to the URL", () => {
    params["fromFavourites"] = true;
    expect(getPrintUrl(state, props, params)).toEqual(
      "/print?lng=en&sortBy=relevance&fromFavourites=true"
    );
  });
});
