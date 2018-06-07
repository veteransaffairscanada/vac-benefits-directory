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
      nextSection: "nextSection",
      setSection: jest.fn(),
      classes: {}
    };
    _shallowGuidedExperienceProfile = undefined;
    _mountedGuidedExperienceProfile = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted_GuidedExperienceProfile().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the options and next buttons", () => {
    expect(
      shallow_GuidedExperienceProfile()
        .find("SelectButton")
        .map(b => b.props().text)
    ).toEqual(["op0", "op1", "next"]);
  });

  it("has the correct button down", () => {
    expect(
      shallow_GuidedExperienceProfile()
        .find("SelectButton")
        .map(b => b.props().isDown)
    ).toEqual([true, false, false]);
  });

  it("calls onClick when option pressed", () => {
    shallow_GuidedExperienceProfile()
      .find("SelectButton")
      .first()
      .simulate("click");
    expect(props.onClick).toBeCalledWith(props.options[0]);
  });

  it("calls setSection if the Next button is pressed", () => {
    shallow_GuidedExperienceProfile()
      .find("SelectButton")
      .at(2)
      .simulate("click");
    expect(props.setSection).toBeCalledWith(props.nextSection);
  });
});
