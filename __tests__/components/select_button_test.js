import React from "react";
import SelectButton from "../../components/select_button";
import { mount } from "enzyme";

describe("SelectButton", () => {
  // Setup

  let props;
  let mountedSelectButton;
  const selectButton = () => {
    if (!mountedSelectButton) {
      mountedSelectButton = mount(<SelectButton {...props} />);
    }
    return mountedSelectButton;
  };

  beforeEach(() => {
    props = {
      text: "test string",
      id: "test id",
      href: "test href",
      isDown: false,
      onClick: jest.fn()
    };
    mountedSelectButton = undefined;
  });

  // Tests

  it("Top level is a Card", () => {
    expect(selectButton().children().length).toEqual(1);
    expect(
      selectButton()
        .children()
        .first()
        .name()
    ).toEqual("Card");
  });

  it("Contains a single button", () => {
    const buttons = selectButton().find("Button");
    expect(buttons.length).toEqual(1);
  });

  const buttonChild = () =>
    selectButton()
      .find("Button")
      .first();

  it("Button has correct fullWidth and href", () => {
    const button = buttonChild();
    expect(button.props().fullWidth).toEqual(true);
    expect(button.props().href).toEqual(props.href);
  });

  it("Button has correct onClick", () => {
    const button = buttonChild();
    button.simulate("click");
    expect(props.onClick).toBeCalledWith(props.id);
  });

  it("Button contains correct child", () => {
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
