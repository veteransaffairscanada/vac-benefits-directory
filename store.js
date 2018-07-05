import lunr from "lunr";
import { createStore } from "redux";

const initialState = {
  areaOffices: [],
  benefits: [],
  eligibilityPaths: [],
  enIdx: {},
  examples: [],
  favouriteBenefits: [],
  frIdx: {},
  needs: [],
  patronType: "",
  searchString: "",
  selectedNeeds: {},
  serviceType: "",
  statusAndVitals: "",
  translations: []
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  let benefits;
  let enIdx;
  let frIdx;

  switch (action.type) {
    case "INDEX_BENEFITS":
      benefits = state.benefits;
      enIdx = lunr(function() {
        this.pipeline.remove(lunr.stemmer);
        this.pipeline.remove(lunr.stopWordFilter);
        this.ref("id");
        this.field("vacNameEn");
        this.field("oneLineDescriptionEn");
        benefits.forEach(function(doc) {
          this.add(doc);
        }, this);
      });

      frIdx = lunr(function() {
        this.pipeline.remove(lunr.stemmer);
        this.pipeline.remove(lunr.stopWordFilter);
        this.ref("id");
        this.field("vacNameFr");
        this.field("oneLineDescriptionFr");
        benefits.forEach(function(doc) {
          this.add(doc);
        }, this);
      });

      return Object.assign({}, state, {
        enIdx: JSON.stringify(enIdx),
        frIdx: JSON.stringify(frIdx)
      });
    case "LOAD_DATA":
      return Object.assign({}, state, {
        storeHydrated: action.data.storeHydrated || state.storeHydrated,
        benefits: action.data.benefits || state.benefits,
        eligibilityPaths:
          action.data.eligibilityPaths || state.eligibilityPaths,
        needs: action.data.needs || state.needs,
        examples: action.data.examples || state.examples,
        favouriteBenefits:
          action.data.favouriteBenefits || state.favouriteBenefits,
        translations: action.data.translations || state.translations,
        areaOffices: action.data.areaOffices || state.areaOffices
      });
    case "SET_PATRON_TYPE":
      return Object.assign({}, state, {
        patronType: action.data
      });
    case "SET_SEARCH_STRING":
      return Object.assign({}, state, {
        searchString: action.data
      });
    case "SET_SELECTED_NEEDS":
      return Object.assign({}, state, {
        selectedNeeds: action.data
      });
    case "SET_SERVICE_TYPE":
      return Object.assign({}, state, {
        serviceType: action.data
      });
    case "SET_STATUS_TYPE":
      return Object.assign({}, state, {
        statusAndVitals: action.data
      });
    default:
      return state;
  }
};

export const initStore = (state = initialState) => {
  return createStore(reducer, state);
};
