import lunr from "lunr";
import { createSelector } from "reselect";

const getBenefits = state => state.benefits;
const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getEligibilityPaths = state => state.eligibilityPaths;
const getEnIdx = state => state.enIdx;
const getFrIdx = state => state.frIdx;
const getNeeds = state => state.needs;
const getNeedsFilter = state => state.selectedNeeds;
const getPatronFilter = state => state.patronType;
const getSearchStringFilter = state => state.searchString;
const getServiceFilter = state => state.serviceType;
const getStatusFilter = state => state.statusAndVitals;

export const getFilteredBenefits = createSelector(
  [
    getPatronFilter,
    getServiceFilter,
    getStatusFilter,
    getNeedsFilter,
    getBenefits,
    getNeeds,
    getEligibilityPaths,
    getSearchStringFilter,
    getCurrentLanguage,
    getEnIdx,
    getFrIdx
  ],
  (
    patronFilter,
    serviceFilter,
    statusFilter,
    selectedNeeds,
    benefits,
    needs,
    eligibilityPaths,
    searchString,
    currentLanguage,
    enIdx,
    frIdx
  ) => {
    // Reinitalize indexes after they are serialized by Redux
    enIdx = lunr.Index.load(JSON.parse(enIdx));
    frIdx = lunr.Index.load(JSON.parse(frIdx));

    let selectedEligibility = {
      patronType: patronFilter,
      serviceType: serviceFilter,
      statusAndVitals: statusFilter
    };
    let eligibilityMatch = (path, selected) => {
      let matches = true;
      ["serviceType", "patronType", "statusAndVitals"].forEach(criteria => {
        if (
          selected[criteria] != "" &&
          path[criteria] !== "na" &&
          selected[criteria] != path[criteria]
        ) {
          matches = false;
        }
      });
      return matches;
    };

    if (benefits.length === 0) {
      return benefits;
    }

    // make it easy to invert the id
    let benefitForId = {};
    benefits.forEach(b => {
      benefitForId[b.id] = b;
    });

    // find benefits that match
    let eligibleBenefitIds = [];
    eligibilityPaths.forEach(ep => {
      if (eligibilityMatch(ep, selectedEligibility)) {
        eligibleBenefitIds = eligibleBenefitIds.concat(ep.benefits);
      }
    });

    let benefitIdsForSelectedNeeds = [];
    if (Object.keys(selectedNeeds).length > 0) {
      Object.keys(selectedNeeds).forEach(id => {
        const need = needs.filter(n => n.id === id)[0];
        benefitIdsForSelectedNeeds = benefitIdsForSelectedNeeds.concat(
          need.benefits
        );
      });
    } else {
      benefitIdsForSelectedNeeds = benefits.map(b => b.id);
    }
    let matchingBenefitIds = eligibleBenefitIds.filter(
      id => benefitIdsForSelectedNeeds.indexOf(id) > -1
    );

    return matchingBenefitIds.map(id => benefitForId[id]);
  }
);
