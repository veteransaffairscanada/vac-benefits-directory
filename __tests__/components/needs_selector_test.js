import React from "react";
import { mount } from "enzyme";
import NeedsSelector from "../../components/needs_selector";
import needsFixture from "../fixtures/needs";

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
      t: key => key,
      needs: needsFixture,
      selectedNeeds: {},
      handleChange: jest.fn()
    };
    _mountedNeedsSelector = undefined;
  });

  it("contains the prompt", () => {
    expect(
      mountedNeedsSelector()
        .find("InputLabel")
        .text()
    ).toContain("What do you need help with");
  });

  it("has the exact number of children as passed", () => {
    const select = mountedNeedsSelector()
      .find("Select")
      .at(0);
    expect(select.props().children.length).toEqual(needsFixture.length);
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

  it("fires the the handleChange function when a option is selected", () => {
    const select = mountedNeedsSelector()
      .find("Select")
      .at(0);
    select.props().onChange({ target: { value: [needsFixture[0].id] } });
    expect(props.handleChange).toHaveBeenCalled();
  });
});
