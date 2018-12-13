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

export const pathToDict = (ep, multipleChoiceOptions) => {
  let dict = {};
  if (ep.requirements) {
    ep.requirements.forEach(req => {
      const mco = multipleChoiceOptions.filter(mco => mco.id === req)[0];
      dict[mco.linked_question] = dict[mco.linked_question]
        ? dict[mco.linked_question].concat([mco.variable_name])
        : [mco.variable_name];
    });
  }
  return dict;
};

export const eligibilityMatch = (ep, profileFilters, multipleChoiceOptions) => {
  let matches = true;
  const path = pathToDict(ep, multipleChoiceOptions);
  Object.keys(profileFilters).forEach(criteria => {
    if (
      profileFilters[criteria] &&
      path[criteria] &&
      path[criteria].length > 0 &&
      path[criteria].indexOf(profileFilters[criteria]) === -1
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
    profileFilters,
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
        eligibilityMatch(ep, profileFilters, multipleChoiceOptions, questions)
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

export const getNonFilteredBenefitsWithoutSearch = createSelector(
  [getFilteredBenefitsWithoutSearch, getBenefits],
  (filteredBenefitsWithoutSearch, benefits) => {
    return benefits.filter(b => filteredBenefitsWithoutSearch.indexOf(b) == -1);
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
    return applySearchString(
      matchingBenefits,
      searchString,
      currentLanguage,
      enIdx,
      frIdx
    );
  }
);

export const getNonFilteredBenefits = createSelector(
  [
    getNonFilteredBenefitsWithoutSearch,
    getSearchStringFilter,
    getCurrentLanguage,
    getEnIdx,
    getFrIdx
  ],
  (
    nonFilteredBenefitsWithoutSearch,
    searchString,
    currentLanguage,
    enIdx,
    frIdx
  ) => {
    let matchingBenefits = nonFilteredBenefitsWithoutSearch;
    return applySearchString(
      matchingBenefits,
      searchString,
      currentLanguage,
      enIdx,
      frIdx
    );
  }
);

export const applySearchString = (
  matchingBenefits,
  searchString,
  currentLanguage,
  enIdx,
  frIdx
) => {
  searchString = searchString.toLowerCase().trim();

  // If there is a searchString then run another filter
  if (searchString !== "") {
    // Reinitalize indexes after they are serialized by Redux
    let searchIndex =
      currentLanguage === "en"
        ? lunr.Index.load(JSON.parse(enIdx))
        : lunr.Index.load(JSON.parse(frIdx));
    let results = searchIndex.query(q => {
      searchString.split(/\s+/).forEach(term => {
        q.term(term, { usePipeline: true, boost: 100 });
        q.term(term, {
          usePipeline: false,
          boost: 10,
          wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
        });
        q.term(term, { usePipeline: false, editDistance: 1 });
      });
    });

    let resultDict = {};
    results.forEach(x => {
      resultDict[x.ref] = x;
    });
    let resultIds = results.map(r => r.ref);

    matchingBenefits = matchingBenefits.filter(b => resultIds.includes(b.id));
    matchingBenefits.forEach(b => {
      b.score = resultDict[b.id].score;
    });
    matchingBenefits.sort((a, b) => b.score - a.score); // descending sort
  }
  return matchingBenefits;
};
