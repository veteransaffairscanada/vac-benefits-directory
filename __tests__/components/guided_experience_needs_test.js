/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import { Checkbox } from "@material-ui/core";
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
    expect(mounted_GuidedExperienceNeeds().find(Checkbox).length).toEqual(
      needsFixture.length
    );
  });

  it("calls setSelectedNeeds when option pressed", () => {
    mounted_GuidedExperienceNeeds()
      .find(Checkbox)
      .first()
      .find("input")
      .first()
      .simulate("change", { target: { checked: true } });
    expect(props.setSelectedNeeds).toBeCalled();
  });

  it("removes a selectedNeed if it already selected", () => {
    props.selectedNeeds[needsFixture[1].id] = "selected";
    mounted_GuidedExperienceNeeds()
      .instance()
      .handleClick(needsFixture[1].id);
    expect(props.setSelectedNeeds).toBeCalledWith({});
  });
});
