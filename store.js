import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const exampleInitialState = {
  count: 10,
  storeHydrated: false,
  benefitTypes: [],
  patronTypes: [],
  benefits: [],
  corporaEn: [],
  corporaFr: []
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
        benefitTypes: action.data.benefitTypes || state.benefitTypes,
        patronTypes: action.data.patronTypes || state.patronTypes,
        benefits: action.data.benefits || state.benefits,
        corporaEn: action.data.corporaEn || state.corporaEn,
        corporaFr: action.data.corporaFr || state.corporaFr
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
