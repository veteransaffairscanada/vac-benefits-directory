/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";

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
      onClick: jest.fn(),
      isDown: option => option === "op0",
      value: "op0"
    };
    reduxData = {
      serviceType: "",
      patronType: "",
      statusAndVitals: ""
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

  it("has the correct button down", () => {
    expect(
      shallow(<GuidedExperienceProfile {...props} {...reduxData} />)
        .find("#RadioSelector")
        .props().selectedFilter
    ).toEqual("op0");
  });
});
