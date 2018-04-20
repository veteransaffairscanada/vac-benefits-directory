import React from "react";
import AlphaBanner from "../../components/alpha_banner";
import { mount } from "enzyme";

describe("Test Alpha Banner", () => {
  it("AlphaBanner should show the alpha message", () => {
    const alphaBanner = mount(<AlphaBanner t={key => key} />);

    expect(
      alphaBanner
        .find("#AlphaTextContainer")
        .at(1)
        .text()
    ).toEqual("alpha");
  });
});
