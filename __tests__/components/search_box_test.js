import React from "react";
import { mount } from "enzyme";
import SearchBox from "../../components/search_box";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("SearchBox", () => {
  let props;
  beforeEach(() => {
    props = {
      onButtonClick: jest.fn(),
      buttonId: "buttonId",
      onKeyDown: jest.fn(),
      onKeyUp: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<SearchBox {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("calls the onButtonClick fn when button is clicked", () => {
    mount(<SearchBox {...props} />)
      .find("#buttonId")
      .first()
      .simulate("click");
    expect(props.onButtonClick).toBeCalled();
  });

  it("the input element is getting the placeholder prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().placeholder
    ).toEqual(props.placeholder);
  });

  it("the input element is getting the onKeyDown prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().onKeyDown
    ).toEqual(props.onKeyDown);
  });

  it("the input element is getting the onKeyUp prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().onKeyUp
    ).toEqual(props.onKeyUp);
  });
});
