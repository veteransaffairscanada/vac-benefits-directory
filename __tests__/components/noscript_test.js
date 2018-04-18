import React from "react";
import Noscript from "../../components/noscript";
import { mount } from "enzyme";

describe("Test Noscript component", () => {
  it("displays a message inside a noscript tag", () => {
    const noscript = mount(<Noscript t={key => key} />);

    expect(noscript.find("div.copy p").text()).toEqual("noscript");
  });
});
