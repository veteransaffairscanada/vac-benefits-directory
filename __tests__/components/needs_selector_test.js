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
});
