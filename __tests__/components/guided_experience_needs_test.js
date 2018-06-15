/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import { GuidedExperienceNeeds } from "../../components/guided_experience_needs";
import needsFixture from "../fixtures/needs";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperienceNeeds", () => {
  let props;
  let _mountedGuidedExperienceNeeds;
  let _shallowGuidedExperienceNeeds;

  const mounted_GuidedExperienceNeeds = () => {
    if (!_mountedGuidedExperienceNeeds) {
      _mountedGuidedExperienceNeeds = mount(
        <GuidedExperienceNeeds {...props} />
      );
    }
    return _mountedGuidedExperienceNeeds;
  };

  const shallow_GuidedExperienceNeeds = () => {
    if (!_shallowGuidedExperienceNeeds) {
      _shallowGuidedExperienceNeeds = shallow(
        <GuidedExperienceNeeds {...props} />
      );
    }
    return _shallowGuidedExperienceNeeds;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      needs: needsFixture,
      selectedNeeds: {},
      setSelectedNeeds: jest.fn(),
      classes: {}
    };
    _shallowGuidedExperienceNeeds = undefined;
    _mountedGuidedExperienceNeeds = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted_GuidedExperienceNeeds().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the needs buttons", () => {
    expect(shallow_GuidedExperienceNeeds().find("SelectButton").length).toEqual(
      needsFixture.length
    );
  });

  it("has the correct button down", () => {
    props.selectedNeeds[needsFixture[0].id] = "selected";
    expect(
      shallow_GuidedExperienceNeeds()
        .find("SelectButton")
        .map(b => b.props().isDown)
    ).toEqual([true, false, false]);
  });

  it("calls setSelectedNeeds when option pressed", () => {
    shallow_GuidedExperienceNeeds()
      .find("SelectButton")
      .first()
      .simulate("click");
    expect(props.setSelectedNeeds).toBeCalled();
  });
});
