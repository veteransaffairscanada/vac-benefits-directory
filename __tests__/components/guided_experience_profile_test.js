/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";

import { GuidedExperienceProfile } from "../../components/guided_experience_profile";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperienceProfile", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: key => key,
      options: ["op0", "op1"],
      selectorType: ""
    };
    reduxData = {
      serviceType: "",
      patronType: "",
      statusAndVitals: "",
      eligibilityPaths: eligibilityPathsFixture
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(
      <GuidedExperienceProfile {...props} {...reduxData} />
    ).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains all the options", () => {
    expect(
      mount(<GuidedExperienceProfile {...props} {...reduxData} />)
        .find("#RadioSelector")
        .find("Radio").length
    ).toEqual(2);
  });
});
