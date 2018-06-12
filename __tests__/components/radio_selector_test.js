import React from "react";
import { mount, shallow } from "enzyme";
import { RadioSelector } from "../../components/radio_selector";
// import profileFixture from "../fixtures/needs";
// import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("RadioSelector", () => {
  let props;
  let _mountedRadioSelector;
  let _shallowMountedRadioSelector;

  const mountedRadioSelector = () => {
    if (!_mountedRadioSelector) {
      _mountedRadioSelector = mount(<RadioSelector {...props} />);
    }
    return _mountedRadioSelector;
  };

  const shallowMountedRadioSelector = () => {
    if (!_shallowMountedRadioSelector) {
      _shallowMountedRadioSelector = shallow(<RadioSelector {...props} />);
    }
    return _shallowMountedRadioSelector;
  };

  beforeEach(() => {
    props = {
      classes: {},
      disabledString: "",
      legend: "",
      filters: [
        { id: "releasedAlive", name_en: "releasedAlive" },
        { id: "stillServing", name_en: "stillServing" },
        { id: "deceased", name_en: "deceased" }
      ],
      selectedFilter: "",
      t: key => key,
      setUserProfile: key => key,
      selectedEligibility: {
        patronType: "service-person",
        serviceType: "WSV (WWII or Korea)",
        statusAndVitals: "releasedAlive"
      }
    };
    _mountedRadioSelector = undefined;
    _shallowMountedRadioSelector = undefined;
  });

  it("passes axe tests", async () => {
    let html = mountedRadioSelector().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has 3 FormControlLabels", () => {
    expect(mountedRadioSelector().find("FormControlLabel").length).toEqual(3);
  });

  it("2nd FormControlLabel has the correct text", () => {
    expect(
      mountedRadioSelector()
        .find("FormControlLabel")
        .at(1)
        .text()
    ).toEqual("stillServing");
  });

  it("isDisabled returns false if we don't hit a condition", () => {
    const isDisabled = shallowMountedRadioSelector().instance().isDisabled;
    expect(isDisabled("a", { a: "a" })).toEqual(false);
  });

  it("isDisabled returns true if we do hit a condition", () => {
    const isDisabled = shallowMountedRadioSelector().instance().isDisabled;

    expect(isDisabled("deceased", { patronType: "service-person" })).toEqual(
      true
    );

    expect(
      isDisabled("stillServing", { serviceType: "WSV (WWII or Korea)" })
    ).toEqual(true);
  });
});
