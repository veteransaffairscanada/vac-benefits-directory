import { createSelector } from "reselect";
import { getFilteredBenefits, getProfileFilters } from "../selectors/benefits";

const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getNeedsFilter = state => state.selectedNeeds;
const getSearchStringFilter = state => state.searchString;
const getFromFavourites = (state, props, params) => params.fromFavourites;
const getFavoriteBenefits = (state, props) => props.favouriteBenefits;
const getBenefits = state => state.benefits;

export const getSelectionParams = (
  profileFilters,
  selectedNeeds,
  searchString,
  currentLanguage
) => {
  let values = {
    lng: currentLanguage,
    selectedNeeds: Object.keys(selectedNeeds).join(),
    searchString: searchString
  };
  Object.assign(values, profileFilters);
  let params = [];
  Object.keys(values).forEach(key => {
    if (values[key] !== "") {
      params.push(key + "=" + values[key]);
    }
  });
  return params.join("&");
};

export const getFavouritesUrl = createSelector(
  [
    getProfileFilters,
    getNeedsFilter,
    getSearchStringFilter,
    getCurrentLanguage
  ],
  (profileFilters, selectedNeeds, searchString, currentLanguage) => {
    const params = getSelectionParams(
      profileFilters,
      selectedNeeds,
      searchString,
      currentLanguage
    );
    return "/favourites?" + params;
  }
);

export const getGuidedExperienceUrl = createSelector(
  [
    getProfileFilters,
    getNeedsFilter,
    getSearchStringFilter,
    getCurrentLanguage
  ],
  (profileFilters, selectedNeeds, searchString, currentLanguage) => {
    const params = getSelectionParams(
      profileFilters,
      selectedNeeds,
      searchString,
      currentLanguage
    );
    return "/?" + params;
  }
);

export const getSummaryUrl = createSelector(
  [getProfileFilters, getNeedsFilter, getCurrentLanguage],
  (profileFilters, selectedNeeds, currentLanguage) => {
    const params = getSelectionParams(
      profileFilters,
      selectedNeeds,
      "",
      currentLanguage
    );
    return "/summary?" + params;
  }
);

export const getPrintUrl = createSelector(
  [
    getFilteredBenefits,
    getProfileFilters,
    getNeedsFilter,
    getCurrentLanguage,
    getFromFavourites,
    getFavoriteBenefits,
    getBenefits
  ],
  (
    filteredBenefits,
    profileFilters,
    selectedNeeds,
    currentLanguage,
    fromFavourites,
    favouriteBenefits,
    benefits
  ) => {
    let filteredBenefitsIDs;
    if (fromFavourites !== undefined) {
      filteredBenefitsIDs = benefits
        .filter(b => favouriteBenefits.indexOf(b.id) > -1)
        .map(b => b.id);
    } else {
      filteredBenefitsIDs = filteredBenefits.map(b => b.id);
    }
    let values = {
      lng: currentLanguage,
      benefits: filteredBenefitsIDs.join(","),
      selectedNeeds: Object.keys(selectedNeeds).join(),
      fromFavourites: fromFavourites !== undefined ? fromFavourites : ""
    };
    Object.assign(values, profileFilters);
    let params = [];
    Object.keys(values).forEach(key => {
      if (values[key] !== "") {
        params.push(key + "=" + values[key]);
      }
    });
    return "/print?" + params.join("&");
  }
);

export const getMapUrl = createSelector(
  [
    getProfileFilters,
    getNeedsFilter,
    getSearchStringFilter,
    getCurrentLanguage
  ],
  (profileFilters, selectedNeeds, searchString, currentLanguage) => {
    const params = getSelectionParams(
      profileFilters,
      selectedNeeds,
      searchString,
      currentLanguage
    );
    return "/map?" + params;
  }
);
