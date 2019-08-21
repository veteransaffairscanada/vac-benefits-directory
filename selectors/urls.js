import { createSelector } from "reselect";
import { getFilteredBenefits, getProfileFilters } from "../selectors/benefits";

const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getNeedsFilter = state => state.selectedNeeds;
const getSearchStringFilter = state => state.searchString;

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

export const getPrintUrl = createSelector(
  [getFilteredBenefits, getProfileFilters, getNeedsFilter, getCurrentLanguage],
  (filteredBenefits, profileFilters, selectedNeeds, currentLanguage) => {
    let filteredBenefitsIDs = filteredBenefits.map(b => b.id);
    let values = {
      lng: currentLanguage,
      benefits: filteredBenefitsIDs.join(","),
      selectedNeeds: Object.keys(selectedNeeds).join()
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
