import {
  showServiceType,
  showStatusAndVitals,
  showServiceHealthIssue
} from "../../selectors/show_filters";

describe("showFilters", () => {
  let reduxState;

  beforeEach(() => {
    reduxState = {
      patronType: "",
      serviceType: "",
      statusAndVitals: ""
    };
  });

  it("showServiceType is false by default", () => {
    expect(showServiceType(reduxState)).toEqual(false);
  });

  it("showServiceType is true if a patronType is selected other than organization", () => {
    reduxState.patronType = "foo";
    expect(showServiceType(reduxState)).toEqual(true);
  });

  it("showServiceType is false if patronType is organization", () => {
    reduxState.patronType = "organization";
    expect(showServiceType(reduxState)).toEqual(false);
  });

  it("showStatusAndVitals is false by default", () => {
    expect(showStatusAndVitals(reduxState)).toEqual(false);
  });

  it("showStatusAndVitals is true if a serviceType is selected other than organization", () => {
    reduxState.patronType = "foo";
    reduxState.serviceType = "bar";
    expect(showStatusAndVitals(reduxState)).toEqual(true);
  });

  it("showStatusAndVitals is false if patronType is service-person and serviceType is WSV (WWII or Korea)", () => {
    reduxState.patronType = "service-person";
    reduxState.serviceType = "WSV (WWII or Korea)";
    expect(showStatusAndVitals(reduxState)).toEqual(false);
  });

  it("showStatusAndVitals is false if patronType is organization", () => {
    reduxState.patronType = "organization";
    expect(showStatusAndVitals(reduxState)).toEqual(false);
  });

  it("showServiceHealthIssue is true if a serviceType, statusAndVitals is selected other than organization", () => {
    reduxState.patronType = "foo";
    reduxState.serviceType = "bar";
    reduxState.statusAndVitals = "xyz";
    expect(showServiceHealthIssue(reduxState)).toEqual(true);
  });

  it("serviceHealthIssueFilter is false if patronType is organization", () => {
    reduxState.patronType = "organization";
    expect(showServiceHealthIssue(reduxState)).toEqual(false);
  });

  it("serviceHealthIssueFilter is true if patronType is service-person and serviceType is WSV (WWII or Korea)", () => {
    reduxState.patronType = "service-person";
    reduxState.serviceType = "WSV (WWII or Korea)";
    expect(showServiceHealthIssue(reduxState)).toEqual(true);
  });
});
