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
      onKeyUp: jest.fn(),
      value: "the value",
      onChange: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<SearchBox {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
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

  it("the input element is getting the value prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().value
    ).toEqual(props.value);
  });

  it("the input element is getting the onChange prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().onChange
    ).toEqual(props.onChange);
  });

  it("if disableButton is false then clicking the button will trigger onClick", () => {
    mount(<SearchBox {...props} />)
      .find("button")
      .simulate("click");
    expect(props.onButtonClick).toBeCalled();
  });

  it("if disableButton is true then clicking the button will not trigger onClick", () => {
    props.disableButton = true;
    mount(<SearchBox {...props} />)
      .find("button")
      .simulate("click");
    expect(props.onButtonClick).not.toBeCalled();
  });
});
