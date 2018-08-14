import { getFavouritesUrl } from "../../selectors/urls";

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
      "/favourites?&lng=en&sortBy=relevance"
    );
  });

  it("adds selectedNeeds keys to the URL", () => {
    state.selectedNeeds = { a: 1, b: 2 };
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?&selectedNeeds=a,b&lng=en&sortBy=relevance"
    );
  });

  it("adds patronType string to the URL", () => {
    state.patronType = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?&patronType=foo&lng=en&sortBy=relevance"
    );
  });

  it("adds searchString string to the URL", () => {
    state.searchString = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?&searchString=foo&lng=en&sortBy=relevance"
    );
  });

  it("adds serviceType string to the URL", () => {
    state.serviceType = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?&serviceType=foo&lng=en&sortBy=relevance"
    );
  });

  it("adds serviceHealthIssue string to the URL", () => {
    state.serviceHealthIssue = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?&serviceHealthIssue=foo&lng=en&sortBy=relevance"
    );
  });

  it("adds statusAndVitals string to the URL", () => {
    state.statusAndVitals = "foo";
    expect(getFavouritesUrl(state, props)).toEqual(
      "/favourites?&statusAndVitals=foo&lng=en&sortBy=relevance"
    );
  });
});
