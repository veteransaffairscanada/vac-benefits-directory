import React from "react";
import AlphaBanner from "../../components/alpha_banner";
import { mount, shallow } from "enzyme";

describe("Test Alpha Banner", () => {
  let mountedAlphaBanner;
  beforeEach(() => {
    const props = {
      t: key => key
    };
    mountedAlphaBanner = mount(<AlphaBanner {...props} />);
  });

  it("AlphaBanner should show the alpha message", () => {
    expect(
      mountedAlphaBanner
        .find("#AlphaTextContainer")
        .at(0)
        .text()
    ).toEqual("alpha");
  });

  it("AlphaBanner should show the alpha message", () => {
    expect(
      mountedAlphaBanner
        .find("#AlphaButton")
        .at(0)
        .text()
    ).toEqual("Alpha");
  });
});
