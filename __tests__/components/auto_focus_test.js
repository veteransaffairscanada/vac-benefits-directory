import React from "react";
import { mount } from "enzyme";
import AutoFocus from "../../components/auto_focus";

describe("<WordMark />", () => {
  it("renders svg", () => {
    let wrapper = mount(<AutoFocus />);
    expect(wrapper.is("svg")).toBeTruthy();
  });
});
