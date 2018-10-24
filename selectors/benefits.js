import lunr from "lunr";
import { createSelector } from "reselect";

const getBenefits = state => state.benefits;
const getQuestions = state => state.questions;
const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getEligibilityPaths = state => state.eligibilityPaths;
const getMultipleChoiceOptions = state => state.multipleChoiceOptions;
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

export const pathToDict = (ep, multipleChoiceOptions, questions) => {
  let dict = {};
  questions.forEach(q => {
    dict[q.variable_name] = [];
  });
  if (ep.requirements) {
    ep.requirements.forEach(req => {
      const mco = multipleChoiceOptions.filter(mco => mco.id === req)[0];
      dict[mco.linked_question].push(mco.variable_name);
    });
  }
  return dict;
};

export const eligibilityMatch = (
  ep,
  selected,
  multipleChoiceOptions,
  questions
) => {
  let matches = true;
  const path = pathToDict(ep, multipleChoiceOptions, questions);
  Object.keys(selected).forEach(criteria => {
    if (
      selected[criteria] &&
      path[criteria] &&
      path[criteria].length > 0 &&
      path[criteria].indexOf(selected[criteria]) === -1
    ) {
      matches = false;
    }
  });
  return matches;
};

export const getFilteredBenefitsWithoutSearch = createSelector(
  [
    getProfileFilters,
    getNeedsFilter,
    getBenefits,
    getNeeds,
    getEligibilityPaths,
    getMultipleChoiceOptions,
    getQuestions
  ],
  (
    selectedProfile,
    selectedNeeds,
    benefits,
    needs,
    eligibilityPaths,
    multipleChoiceOptions,
    questions
  ) => {
    if (benefits.length === 0) {
      return benefits;
    }

    // find benefits that match
    let eligibleBenefitIds = [];
    eligibilityPaths.forEach(ep => {
      if (
        eligibilityMatch(ep, selectedProfile, multipleChoiceOptions, questions)
      ) {
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

    return benefits.filter(b => matchingBenefitIds.includes(b.id));
  }
);

export const getFilteredBenefits = createSelector(
  [
    getFilteredBenefitsWithoutSearch,
    getSearchStringFilter,
    getCurrentLanguage,
    getEnIdx,
    getFrIdx
  ],
  (
    filteredBenefitsWithoutSearch,
    searchString,
    currentLanguage,
    enIdx,
    frIdx
  ) => {
    let matchingBenefits = filteredBenefitsWithoutSearch;
    searchString = searchString.toLowerCase().trim();

    // If there is a searchString then run another filter
    if (searchString !== "") {
      // Reinitalize indexes after they are serialized by Redux
      enIdx = lunr.Index.load(JSON.parse(enIdx));
      frIdx = lunr.Index.load(JSON.parse(frIdx));

      let results = [];
      if (currentLanguage === "en") {
        results = enIdx.query(q => {
          searchString.split(/\s+/).forEach(term => {
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
          searchString.split(/\s+/).forEach(term => {
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
