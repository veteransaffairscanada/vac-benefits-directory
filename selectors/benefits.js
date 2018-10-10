import lunr from "lunr";
import { createSelector } from "reselect";

const getBenefits = state => state.benefits;
const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getEligibilityPaths = state => state.eligibilityPaths;
const getEnIdx = state => state.enIdx;
const getFrIdx = state => state.frIdx;
const getNeeds = state => state.needs;
const getNeedsFilter = state => state.selectedNeeds;
const getSearchStringFilter = state => state.searchString;

export const getProfileFilters = createSelector(
  [state => state.questions, state => state],
  (questions, reduxState) => {
    const profileQuestions = questions
      .filter(q => q.variable_name !== "needs")
      .map(q => q.variable_name);
    let filters = {};
    profileQuestions.forEach(q => {
      filters[q] = reduxState[q];
    });
    return filters;
  }
);

export const getFilteredBenefits = createSelector(
  [
    getProfileFilters,
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
    selectedProfile,
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

    let eligibilityMatch = (path, selected) => {
      let matches = true;
      Object.keys(selectedProfile).forEach(criteria => {
        if (
          selected[criteria] !== "" &&
          path[criteria] !== "na" &&
          selected[criteria] !== path[criteria]
        ) {
          matches = false;
        }
      });
      return matches;
    };

    if (benefits.length === 0) {
      return benefits;
    }

    // find benefits that match
    let eligibleBenefitIds = [];
    eligibilityPaths.forEach(ep => {
      if (eligibilityMatch(ep, selectedProfile)) {
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
    let matchingBenefits = benefits.filter(b =>
      matchingBenefitIds.includes(b.id)
    );

    // If there is a searchString the run another filter
    if (searchString.trim() !== "") {
      searchString = searchString.toLowerCase();
      let results = [];
      if (currentLanguage === "en") {
        results = enIdx.query(q => {
          searchString.split(" ").forEach(term => {
            q.term(term, { usePipeline: true, boost: 100 });
            q.term(term, {
              usePipeline: false,
              boost: 10,
              wildcard:
                lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
            });
            q.term(term, { usePipeline: false, editDistance: 1 });
          });
        });
      } else {
        results = frIdx.query(q => {
          searchString.split(" ").forEach(term => {
            q.term(term, { usePipeline: true, boost: 100 });
            q.term(term, {
              usePipeline: false,
              boost: 10,
              wildcard:
                lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
            });
            q.term(term, { usePipeline: false, editDistance: 1 });
          });
        });
      }
      let resultIds = results.map(r => r.ref);
      matchingBenefits = matchingBenefits.filter(b => resultIds.includes(b.id));
    }

    return matchingBenefits;
  }
);
