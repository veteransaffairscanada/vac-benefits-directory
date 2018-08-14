import { createSelector } from "reselect";

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
    let href = "/favourites?";
    if (Object.keys(selectedNeeds).length > 0) {
      href += "&selectedNeeds=" + Object.keys(selectedNeeds).join();
    }
    if (patronFilter !== "") {
      href += "&patronType=" + patronFilter;
    }
    if (serviceFilter !== "") {
      href += "&serviceType=" + serviceFilter;
    }
    if (statusFilter !== "") {
      href += "&statusAndVitals=" + statusFilter;
    }
    if (healthIssueFilter !== "") {
      href += "&serviceHealthIssue=" + healthIssueFilter;
    }
    if (searchString !== "") {
      href += "&searchString=" + searchString;
    }
    href += "&lng=" + currentLanguage;
    href += "&sortBy=" + sortBy;
    return href;
  }
);

export const getPrintUrl = createSelector(
  [
    getPatronFilter,
    getServiceFilter,
    getStatusFilter,
    getHealthIssueFilter,
    getNeedsFilter,
    getSortBy,
    getCurrentLanguage,
    getClosestOffice,
    getSelectedOffice
  ],
  (
    filteredBenefits,
    patronFilter,
    serviceFilter,
    statusFilter,
    healthIssueFilter,
    selectedNeeds,
    sortBy,
    language,
    closestAreaOffice,
    selectedAreaOffice
  ) => {
    const filteredBenefitsIDs = filteredBenefits.map(b => b.id);
    const needsIDs = Object.keys(selectedNeeds);

    let url = "print";
    if (patronFilter !== "") {
      url += "&patronType=" + patronFilter;
    }
    if (serviceFilter !== "") {
      url += "&serviceType=" + serviceFilter;
    }
    if (statusFilter !== "") {
      url += "&statusAndVitals=" + statusFilter;
    }
    if (healthIssueFilter !== "") {
      url += "&serviceHealthIssue=" + healthIssueFilter;
    }
    url += "?lng=" + language;
    if (needsIDs.length > 0) {
      url += "&needs=" + needsIDs.join(",");
    }
    url += "&sortBy=" + sortBy;
    if (filteredBenefitsIDs.length > 0) {
      url += "&benefits=" + filteredBenefitsIDs.join(",");
    }
    if (closestAreaOffice.id !== undefined) {
      url += "&closestAOID=" + closestAreaOffice.id;
    }
    if (selectedAreaOffice.id !== undefined) {
      url += "&selectedAOID=" + selectedAreaOffice.id;
    }
    return url;
  }
);
