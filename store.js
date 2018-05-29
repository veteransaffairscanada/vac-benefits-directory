import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const exampleInitialState = {
  storeHydrated: false,
  benefits: [],
  eligibilityPaths: [],
  needs: []
};

export const actionTypes = {
  LOAD_DATA: "LOAD_DATA"
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_DATA:
      return {
        storeHydrated: action.data.storeHydrated || state.storeHydrated,
        benefits: action.data.benefits || state.benefits,
        eligibilityPaths:
          action.data.eligibilityPaths || state.eligibilityPaths,
        needs: action.data.needs || state.needs
      };
    default:
      return state;
  }
};

// ACTIONS

export const loadDataStore = data => dispatch => {
  return dispatch({ type: actionTypes.LOAD_DATA, data: data });
};

export const initStore = (initialState = exampleInitialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
