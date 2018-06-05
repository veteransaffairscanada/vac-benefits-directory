import React from "react";
import SelectButton from "../../components/select_button";
import { mount } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("SelectButton", () => {
  // Setup

  let props;
  let mountedSelectButton;
  let buttonChild;

  const selectButton = () => {
    if (!mountedSelectButton) {
      mountedSelectButton = mount(<SelectButton {...props} />);
    }
    return mountedSelectButton;
  };

  beforeEach(() => {
    props = {
      target: "test target",
      text: "test string",
      id: "test id",
      href: "test href",
      isDown: false,
      onClick: jest.fn()
    };
    mountedSelectButton = undefined;

    buttonChild = () =>
      selectButton()
        .find("Button")
        .first();
  });

  // Tests
  it("passes axe tests", async () => {
    let html = buttonChild().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains a Button with correct fullWidth, target and href", () => {
    const button = buttonChild();
    expect(button.props().fullWidth).toEqual(true);
    expect(button.props().href).toEqual(props.href);
    expect(button.props().target).toEqual(props.target);
  });

  it("contains a Button with correct onClick", () => {
    const button = buttonChild();
    button.simulate("click");
    expect(props.onClick).toBeCalledWith(props.id);
  });

  it("contains a Button with correct text", () => {
    const button = buttonChild();
    expect(button.children().length).toEqual(1);
    expect(
      button
        .children()
        .first()
        .text()
    ).toEqual(props.text);
  });

  describe("isDown is true", () => {
    beforeEach(() => {
      props.isDown = true;
    });

    it("Button's backgroundColor is #aaa", () => {
      const button = buttonChild();
      expect(button.props().style.backgroundColor).toEqual("#aaa");
    });
  });

  describe("isDown is false", () => {
    beforeEach(() => {
      props.isDown = false;
    });

    it("Button's backgroundColor is #fff", () => {
      const button = buttonChild();
      expect(button.props().style.backgroundColor).toEqual("#fff");
    });
  });
});
