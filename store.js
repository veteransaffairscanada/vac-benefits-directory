import { createStore } from "redux";
import { Provider } from "react-redux";

const exampleInitialState = {
  benefits: [],
  eligibilityPaths: [],
  needs: []
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      return Object.assign({}, state, {
        storeHydrated: action.data.storeHydrated || state.storeHydrated,
        benefits: action.data.benefits || state.benefits,
        eligibilityPaths:
          action.data.eligibilityPaths || state.eligibilityPaths,
        needs: action.data.needs || state.needs
      });
    default:
      return state;
  }
};

export const initStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState);
};
