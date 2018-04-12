import React from "react";
import Footer from "../components/footer";
import { mount } from "enzyme";

describe("Test Footer", () => {
  it("Footer", () => {
    const footer = mount(<Footer t={key => key} />);

    expect(footer.find("Button#privacy").text()).toEqual("Privacy");
  });
});
