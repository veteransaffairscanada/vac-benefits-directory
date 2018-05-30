import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const exampleInitialState = {
  count: 10,
  storeHydrated: false,
  benefits: [],
  eligibilityPaths: [],
  needs: [],
  examples: []
};

export const actionTypes = {
  ADD: "ADD",
  LOAD_DATA: "LOAD_DATA"
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    case actionTypes.LOAD_DATA:
      return Object.assign({}, state, {
        storeHydrated: action.data.storeHydrated || state.storeHydrated,
        benefits: action.data.benefits || state.benefits,
        eligibilityPaths:
          action.data.eligibilityPaths || state.eligibilityPaths,
        needs: action.data.needs || state.needs,
        examples: action.data.examples || state.examples
      });
    default:
      return state;
  }
};

// ACTIONS

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD });
};

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
