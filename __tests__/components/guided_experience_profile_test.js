/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";

import { GuidedExperienceProfile } from "../../components/guided_experience_profile";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperienceProfile", () => {
  let props;
  let _mountedGuidedExperienceProfile;
  let _shallowGuidedExperienceProfile;

  const mounted_GuidedExperienceProfile = () => {
    if (!_mountedGuidedExperienceProfile) {
      _mountedGuidedExperienceProfile = mount(
        <GuidedExperienceProfile {...props} />
      );
    }
    return _mountedGuidedExperienceProfile;
  };

  const shallow_GuidedExperienceProfile = () => {
    if (!_shallowGuidedExperienceProfile) {
      _shallowGuidedExperienceProfile = shallow(
        <GuidedExperienceProfile {...props} />
      );
    }
    return _shallowGuidedExperienceProfile;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      title: "title",
      options: ["op0", "op1"],
      onClick: jest.fn(),
      isDown: option => option === "op0",
      classes: {}
    };
    _shallowGuidedExperienceProfile = undefined;
    _mountedGuidedExperienceProfile = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted_GuidedExperienceProfile().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains all the options", () => {
    expect(
      shallow_GuidedExperienceProfile().find("SelectButton").length
    ).toEqual(2);
  });

  it("has the correct button down", () => {
    expect(
      shallow_GuidedExperienceProfile()
        .find("SelectButton")
        .map(b => b.props().isDown)
    ).toEqual([true, false]);
  });

  it("calls onClick when option pressed", () => {
    shallow_GuidedExperienceProfile()
      .find("SelectButton")
      .first()
      .simulate("click");
    expect(props.onClick).toBeCalledWith(props.options[0]);
  });
});
