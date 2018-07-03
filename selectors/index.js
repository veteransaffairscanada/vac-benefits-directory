import { createSelector } from "reselect";

const getBenefits = state => state.benefits;
const getEligibilityPaths = state => state.eligibilityPaths;
const getNeeds = state => state.needs;
const getNeedsFilter = state => state.selectedNeeds;
const getPatronFilter = state => state.patronType;
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
    getEligibilityPaths
  ],
  (
    patronFilter,
    serviceFilter,
    statusFilter,
    selectedNeeds,
    benefits,
    needs,
    eligibilityPaths
  ) => {
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
    const eligibleBenefits = eligibleBenefitIds.map(id => benefitForId[id]);

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
    const matchingBenefits = matchingBenefitIds.map(id => benefitForId[id]);

    /* show:
         - matching benefits
         - eligible benefits with a matching child
         ( maybe: - non-eligible benefits with a matching child that isn't already covered)
     */

    const eligibleBenefitsWithMatchingChild = eligibleBenefits.filter(
      b =>
        b.childBenefits
          ? b.childBenefits.filter(id => matchingBenefitIds.indexOf(id) > -1)
              .length > 0
          : false
    );

    let benefitsToShow = matchingBenefits.concat(
      eligibleBenefitsWithMatchingChild
    );
    benefitsToShow = benefitsToShow.filter(
      (b, n) => benefitsToShow.indexOf(b) === n
    ); // dedup

    // if a benefit is already shown as a child, only show it (as a parent card) if it's available independently
    let childrenIDsShown = [];
    benefitsToShow.forEach(b => {
      childrenIDsShown = childrenIDsShown.concat(b.childBenefits);
    });
    benefitsToShow = benefitsToShow.filter(
      b =>
        b.availableIndependently === "Independent" ||
        childrenIDsShown.indexOf(b.id) < 0
    );

    return benefitsToShow;
  }
);
