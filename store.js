import lunr from "lunr";
import stemmerSupport from "lunr-languages/lunr.stemmer.support.js";
import fr from "lunr-languages/lunr.fr.js";
import { createStore } from "redux";
import airtableConstants from "./utils/airtable_constants";

stemmerSupport(lunr);
fr(lunr);

const initialState = {
  enIdx: {},
  favouriteBenefits: [],
  frIdx: {},
  patronType: "",
  searchString: "",
  selectedNeeds: {},
  serviceType: "",
  statusAndVitals: "",
  serviceHealthIssue: "",
  closestAreaOffice: {},
  selectedAreaOffice: {},
  userLocation: { lat: 49, lng: -104 },
  pageWidth: 1000,
  mapView: { lat: 49, lng: -104, zoom: 1 }
};
airtableConstants.tableNames.forEach(tableName => {
  initialState[tableName] = [];
});

// REDUCERS
export const reducer = (state = initialState, action) => {
  let benefits;
  let enIdx;
  let frIdx;
  let newState;

  switch (action.type) {
    case "INDEX_BENEFITS":
      benefits = state.benefits;
      enIdx = lunr(function() {
        this.ref("id");
        this.field("vacNameEn");
        this.field("oneLineDescriptionEn");
        benefits.forEach(function(doc) {
          this.add(doc);
        }, this);
      });

      frIdx = lunr(function() {
        this.ref("id");
        this.use(lunr.fr);
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

    case "LOAD_GITHUBDATA":
      return Object.assign({}, state, {
        githubData: action.data
      });

    case "LOAD_DATA":
      newState = {
        storeHydrated: action.data.storeHydrated || state.storeHydrated,
        favouriteBenefits:
          action.data.favouriteBenefits || state.favouriteBenefits,
        timestamp: action.data.timestamp || state.timestamp
      };
      airtableConstants.tableNames.forEach(tableName => {
        newState[tableName] = action.data[tableName] || state[tableName];
      });
      return Object.assign({}, state, newState);

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
    case "SET_HEALTH_ISSUE":
      return Object.assign({}, state, {
        serviceHealthIssue: action.data
      });
    case "SET_CLOSEST_OFFICE":
      return Object.assign({}, state, {
        closestAreaOffice: action.data
      });
    case "SET_SELECTED_OFFICE":
      return Object.assign({}, state, {
        selectedAreaOffice: action.data
      });
    case "SET_USER_LOCATION":
      return Object.assign({}, state, {
        userLocation: action.data
      });
    case "SET_MAP_VIEW":
      return Object.assign({}, state, {
        mapView: action.data
      });
    case "SET_PAGEWIDTH":
      return Object.assign({}, state, { pageWidth: action.data });
    default:
      return state;
  }
};

export const initStore = (state = initialState) => {
  return createStore(reducer, state);
};
