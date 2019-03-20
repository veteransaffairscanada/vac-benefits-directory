/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";
import { GuidedExperienceNeeds } from "../../components/guided_experience_needs";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedExperienceNeeds", () => {
  let props, reduxState, mockStore;
  let _mountedGuidedExperienceNeeds;

  const mounted_GuidedExperienceNeeds = () => {
    if (!_mountedGuidedExperienceNeeds) {
      _mountedGuidedExperienceNeeds = mount(
        <GuidedExperienceNeeds {...props} {...reduxState} />
      );
    }
    return _mountedGuidedExperienceNeeds;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      url: {
        query: { lng: "en", patronType: "veteran", serviceType: "RCMP" },
        route: "/"
      }
    };
    reduxState = {
      needs: needsFixture,
      selectedNeeds: {},
      setSelectedNeeds: jest.fn()
    };
    mockStore = configureStore();
    props.store = mockStore(reduxState);

    _mountedGuidedExperienceNeeds = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted_GuidedExperienceNeeds().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the needs buttons", () => {
    expect(mounted_GuidedExperienceNeeds().find("NeedButton").length).toEqual(
      needsFixture.length
    );
  });
});
