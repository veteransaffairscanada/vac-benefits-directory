import { createSelector } from "reselect";
import { getFilteredBenefits } from "../selectors/benefits";

const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getNeedsFilter = state => state.selectedNeeds;
const getPatronFilter = state => state.patronType;
const getHealthIssueFilter = state => state.serviceHealthIssue;
const getSearchStringFilter = state => state.searchString;
const getServiceFilter = state => state.serviceType;
const getStatusFilter = state => state.statusAndVitals;
const getClosestOffice = state => state.closestAreaOffice;
const getSelectedOffice = state => state.selectedAreaOffice;
const getSortBy = state => state.sortBy;
const getFromFavourites = (state, props, params) => params.fromFavourites;
const getFavoriteBenefits = (state, props) => props.favouriteBenefits;
const getBenefits = state => state.benefits;

export const getFavouritesUrl = createSelector(
  [
    getPatronFilter,
    getServiceFilter,
    getStatusFilter,
    getHealthIssueFilter,
    getNeedsFilter,
    getSearchStringFilter,
    getCurrentLanguage,
    getSortBy
  ],
  (
    patronFilter,
    serviceFilter,
    statusFilter,
    healthIssueFilter,
    selectedNeeds,
    searchString,
    currentLanguage,
    sortBy
  ) => {
    let values = {
      lng: currentLanguage,
      sortBy: sortBy,
      selectedNeeds: Object.keys(selectedNeeds).join(),
      patronType: patronFilter,
      serviceType: serviceFilter,
      statusAndVitals: statusFilter,
      serviceHealthIssue: healthIssueFilter,
      searchString: searchString
    };
    let params = [];
    Object.keys(values).forEach(key => {
      if (values[key] !== "") {
        params.push(key + "=" + values[key]);
      }
    });
    return "/favourites?" + params.join("&");
  }
);

export const getPrintUrl = createSelector(
  [
    getFilteredBenefits,
    getPatronFilter,
    getServiceFilter,
    getStatusFilter,
    getHealthIssueFilter,
    getNeedsFilter,
    getSortBy,
    getCurrentLanguage,
    getClosestOffice,
    getSelectedOffice,
    getFromFavourites,
    getFavoriteBenefits,
    getBenefits
  ],
  (
    filteredBenefits,
    patronFilter,
    serviceFilter,
    statusFilter,
    healthIssueFilter,
    selectedNeeds,
    sortBy,
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
      sortBy: sortBy,
      benefits: filteredBenefitsIDs.join(","),
      patronType: patronFilter,
      serviceType: serviceFilter,
      statusAndVitals: statusFilter,
      serviceHealthIssue: healthIssueFilter,
      needs: Object.keys(selectedNeeds).join(),
      closestAOID:
        closestAreaOffice.id !== undefined ? closestAreaOffice.id : "",
      selectedAOID:
        selectedAreaOffice.id !== undefined ? selectedAreaOffice.id : "",
      fromFavourites: fromFavourites !== undefined ? fromFavourites : ""
    };
    let params = [];
    Object.keys(values).forEach(key => {
      if (values[key] !== "") {
        params.push(key + "=" + values[key]);
      }
    });
    return "/print?" + params.join("&");
  }
);
