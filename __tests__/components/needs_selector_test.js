import React from "react";
import { mount } from "enzyme";
import NeedsSelector from "../../components/needs_selector";
import needsFixture from "../fixtures/needs";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("NeedsSelector", () => {
  let props;
  let _mountedNeedsSelector;

  const mountedNeedsSelector = () => {
    if (!_mountedNeedsSelector) {
      _mountedNeedsSelector = mount(<NeedsSelector {...props} />);
    }
    return _mountedNeedsSelector;
  };

  beforeEach(() => {
    props = {
      clearNeeds: () => true,
      t: key => key,
      needs: needsFixture,
      selectedNeeds: {},
      handleChange: jest.fn(),
      pageWidth: 1000
    };
    _mountedNeedsSelector = undefined;
  });

  it("passes axe tests", async () => {
    let html = mountedNeedsSelector().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the exact number of children as passed", () => {
    const select = mountedNeedsSelector()
      .find("#needs_buttons")
      .find("Button");
    expect(select.length).toEqual(needsFixture.length);
  });

  it("works if needs haven't loaded yet", () => {
    props.needs = [];
    props.selectedNeeds = { 43534534: "43534534" };
    expect(mountedNeedsSelector());
  });

  it("works if language is en", () => {
    props.t = () => "en";
    expect(mountedNeedsSelector());
  });

  it("fires the the handleChange function when a need is selected", () => {
    mountedNeedsSelector()
      .find("#needs_buttons")
      .find("Button")
      .at(0)
      .simulate("click");
    expect(props.handleChange).toHaveBeenCalled();
  });

  it("works if needs haven't loaded yet", () => {
    props.needs = [];
    props.selectedNeeds = { 43534534: "43534534" };
    expect(mountedNeedsSelector());
  });

  it("is expanded if pageWidth > 600px", () => {
    expect(
      mountedNeedsSelector()
        .find("ExpansionPanel")
        .prop("expanded")
    ).toEqual(true);
  });

  it("is not expanded if pageWidth < 600px", () => {
    props.pageWidth = 100;
    expect(
      mountedNeedsSelector()
        .find("ExpansionPanel")
        .prop("expanded")
    ).toEqual(false);
  });
});
