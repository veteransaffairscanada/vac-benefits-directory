import { createSelector } from "reselect";
const getPatronType = state => state.patronType;
const getServiceType = state => state.serviceType;
const getStatusAndVitals = state => state.statusAndVitals;

export const showServiceType = createSelector([getPatronType], patronType => {
  let showServiceType =
    patronType && patronType !== "" && patronType !== "organization";
  return showServiceType ? true : false;
});

export const showStatusAndVitals = createSelector(
  [getServiceType, getPatronType],
  (serviceType, patronType) => {
    let showStatusAndVitals =
      serviceType &&
      serviceType !== "" &&
      patronType !== "organization" &&
      !(
        patronType === "service-person" && serviceType === "WSV (WWII or Korea)"
      );
    return showStatusAndVitals ? true : false;
  }
);

export const showServiceHealthIssue = createSelector(
  [getServiceType, getPatronType, getStatusAndVitals],
  (serviceType, patronType, statusAndVitals) => {
    let showServiceHealthIssue =
      serviceType &&
      serviceType !== "" &&
      patronType !== "organization" &&
      (statusAndVitals !== "" ||
        (patronType === "service-person" &&
          serviceType === "WSV (WWII or Korea)"));
    return showServiceHealthIssue ? true : false;
  }
);
