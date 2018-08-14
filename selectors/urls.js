import { createSelector } from "reselect";

const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getNeedsFilter = state => state.selectedNeeds;
const getPatronFilter = state => state.patronType;
const getHealthIssueFilter = state => state.serviceHealthIssue;
const getSearchStringFilter = state => state.searchString;
const getServiceFilter = state => state.serviceType;
const getStatusFilter = state => state.statusAndVitals;

export const getFavouritesUrl = createSelector(
  [
    getPatronFilter,
    getServiceFilter,
    getStatusFilter,
    getHealthIssueFilter,
    getNeedsFilter,
    getSearchStringFilter,
    getCurrentLanguage
  ],
  (
    patronFilter,
    serviceFilter,
    statusFilter,
    healthIssueFilter,
    selectedNeeds,
    searchString,
    currentLanguage
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
    href += "&lng=" + currentLanguage;
    if (searchString !== "") {
      href += "&searchString=" + searchString;
    }
    return href;
  }
);
