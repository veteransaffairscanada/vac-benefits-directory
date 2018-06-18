import { createStore } from "redux";

const initialState = {
  benefits: [],
  eligibilityPaths: [],
  needs: [],
  examples: []
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      return Object.assign({}, state, {
        storeHydrated: action.data.storeHydrated || state.storeHydrated,
        benefits: action.data.benefits || state.benefits,
        eligibilityPaths:
          action.data.eligibilityPaths || state.eligibilityPaths,
        needs: action.data.needs || state.needs,
        examples: action.data.examples || state.examples
      });
    case "SAVE_BENEFITS":
      return Object.assign({}, state, {
        filteredBenefits: action.data.filteredBenefits || state.filteredBenefits
      });
    default:
      return state;
  }
};

export const initStore = (state = initialState) => {
  return createStore(reducer, state);
};
