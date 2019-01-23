import lunr from "lunr";
import { createSelector } from "reselect";

const getBenefits = state => state.benefits;
const getQuestions = state => state.questions;
const getCurrentLanguage = (state, props) => props.t("current-language-code");
const getBenefitEligibility = state => state.benefitEligibility;
const getMultipleChoiceOptions = state => state.multipleChoiceOptions;
const getEnIdx = state => state.enIdx;
const getFrIdx = state => state.frIdx;
const getNeeds = state => state.needs;
const getNeedsFilter = state => state.selectedNeeds;
const getSearchStringFilter = state => state.searchString;
const getNextSteps = state => state.nextSteps;

export const getFilteredBenefitsFunction = (
  profileFilters,
  selectedNeeds,
  benefits,
  needs,
  benefitEligibility,
  multipleChoiceOptions
) => {
  if (benefits.length === 0) {
    return benefits;
  }
  // find benefits that match
  let eligibleBenefitIds = [];
  // iterate through benefitEligibility table and any benefit that matches, add to the list (but don't add more than once!)
  benefitEligibility.forEach(be => {
    if (benefitEligibilityMatch(be, profileFilters, multipleChoiceOptions)) {
      eligibleBenefitIds.push(be.benefit[0]);
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
};

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

export const benefitEligibilityMatch = (
  be,
  profileFilters,
  multipleChoiceOptions
) => {
  let matches = true;
  Object.keys(profileFilters).forEach(criteria => {
    if (profileFilters[criteria] && be[criteria] && be[criteria].length > 0) {
      // convert benefitEligibility ids to match profileFilter names
      const mco = multipleChoiceOptions.filter(
        mco => be[criteria].indexOf(mco.id) !== -1
      );
      let names = [];
      mco.forEach(m => {
        names.push(m.variable_name);
      });

      if (names.indexOf(profileFilters[criteria]) === -1) {
        matches = false;
      }
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
    getBenefitEligibility,
    getMultipleChoiceOptions,
    getQuestions
  ],
  (
    profileFilters,
    selectedNeeds,
    benefits,
    needs,
    benefitEligibility,
    multipleChoiceOptions
  ) => {
    return getFilteredBenefitsFunction(
      profileFilters,
      selectedNeeds,
      benefits,
      needs,
      benefitEligibility,
      multipleChoiceOptions
    );
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

export const getFilteredNextSteps = createSelector(
  [getNextSteps, getProfileFilters, getMultipleChoiceOptions, getQuestions],
  (nextSteps, profileFilters, multipleChoiceOptions) => {
    let hasSelections = false;

    Object.keys(profileFilters).forEach(criteria => {
      if (profileFilters[criteria] !== "") hasSelections = true;
    });

    if (hasSelections) {
      // only check eligible nextSteps if we know we have selections
      let eligibleNextStepIds = [];
      nextSteps.forEach(ns => {
        if (
          benefitEligibilityMatch(ns, profileFilters, multipleChoiceOptions)
        ) {
          eligibleNextStepIds.push(ns.id);
        }
      });
      return nextSteps.filter(ns => eligibleNextStepIds.includes(ns.id));
    }

    // if no selection, just return next steps with no requirements
    return nextSteps.filter(
      ns =>
        !ns.patronType &&
        !ns.serviceType &&
        !ns.statusAndVitals &&
        !ns.serviceHealthIssue
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
