import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const exampleInitialState = {
  count: 10,
  benefit_types: [
    {
      id: "rec3PfnqeqyxSbx1x",
      name_en: "Compensation For Harm",
      name_fr: "Compensation Pour Préjudice"
    },
    {
      id: "recQO4AHswOl75poF",
      name_en: "Healthcare Cost Coverage",
      name_fr: "Couverture des Coûts de Soins de Santé"
    }
  ],
  patron_types: [
    {
      name: "rec726lY5vUBEh2Sv",
      name_en: "Military Service-Person",
      name_fr: "Service militaire-Personne"
    },
    {
      name: "recDAuNt8DXhD88Mr",
      name_en: "RCMP Service-Person",
      name_fr: "Personne-Service de la GRC"
    }
  ],

  benefitList: [
    {
      type: "Support for Families",
      title: "Survivor's Pension",
      description: "Survivor's Pension Description"
    },
    {
      type: "Financial",
      title: "Disability Award",
      description: "Disability Award Description"
    }
  ],
  vacServices: [
    "Financial Support",
    "Rehabilitation",
    "Mental Health Services",
    "Health Care",
    "Career Transition",
    "Support for Families"
  ],
  userStatuses: ["Veteran", "Family", "Not Sure"]
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
        benefit_types: action.data
      });
    default:
      return state;
  }
};

// ACTIONS

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD });
};

export const updateBenefitTypes = data => dispatch => {
  return dispatch({ type: actionTypes.LOAD_DATA, data: data });
};

export const initStore = (initialState = exampleInitialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
