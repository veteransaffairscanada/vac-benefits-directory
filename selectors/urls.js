import { createSelector } from "reselect";
import { getFilteredBenefits, getProfileFilters } from "../selectors/benefits";

const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getNeedsFilter = state => state.selectedNeeds;
const getSearchStringFilter = state => state.searchString;
const getClosestOffice = state => state.closestAreaOffice;
const getSelectedOffice = state => state.selectedAreaOffice;
const getFromFavourites = (state, props, params) => params.fromFavourites;
const getFavoriteBenefits = (state, props) => props.favouriteBenefits;
const getBenefits = state => state.benefits;
const getServiceHealthIssue = state => state.serviceHealthIssue;

export const getFavouritesUrl = createSelector(
  [
    getProfileFilters,
    getNeedsFilter,
    getSearchStringFilter,
    getCurrentLanguage
  ],
  (profileFilters, selectedNeeds, searchString, currentLanguage) => {
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
    return "/favourites?" + params.join("&");
  }
);

export const getHomeUrl = createSelector(
  [
    getProfileFilters,
    getNeedsFilter,
    getSearchStringFilter,
    getServiceHealthIssue,
    getCurrentLanguage
  ],
  (
    profileFilters,
    selectedNeeds,
    searchString,
    serviceHealthIssue,
    currentLanguage
  ) => {
    let values = {
      lng: currentLanguage,
      selectedNeeds: Object.keys(selectedNeeds).join(),
      serviceHealthIssue: serviceHealthIssue,
      searchString: searchString
    };
    Object.assign(values, profileFilters);
    let params = [];
    Object.keys(values).forEach(key => {
      if (values[key] !== "") {
        params.push(key + "=" + values[key]);
      }
    });
    return "/?" + params.join("&");
  }
);

export const getPrintUrl = createSelector(
  [
    getFilteredBenefits,
    getProfileFilters,
    getNeedsFilter,
    getCurrentLanguage,
    getClosestOffice,
    getSelectedOffice,
    getFromFavourites,
    getFavoriteBenefits,
    getBenefits
  ],
  (
    filteredBenefits,
    profileFilters,
    selectedNeeds,
    currentLanguage,
    closestAreaOffice,
    selectedAreaOffice,
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
      closestAOID:
        closestAreaOffice.id !== undefined ? closestAreaOffice.id : "",
      selectedAOID:
        selectedAreaOffice.id !== undefined ? selectedAreaOffice.id : "",
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
    getServiceHealthIssue,
    getCurrentLanguage
  ],
  (
    profileFilters,
    selectedNeeds,
    searchString,
    serviceHealthIssue,
    currentLanguage
  ) => {
    let values = {
      lng: currentLanguage,
      selectedNeeds: Object.keys(selectedNeeds).join(),
      serviceHealthIssue: serviceHealthIssue,
      searchString: searchString
    };
    Object.assign(values, profileFilters);
    let params = [];
    Object.keys(values).forEach(key => {
      if (values[key] !== "") {
        params.push(key + "=" + values[key]);
      }
    });
    return "/map?" + params.join("&");
  }
);
