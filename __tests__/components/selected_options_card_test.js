import React from "react";
import SelectedOptionsCard from "../../components/selected_options_card";
import { mount } from "enzyme";

describe("SelectedOptionsCard", () => {
  // Setup

  let props;
  let _mountedSelectedOptionsCard;
  const mountedSelectedOptionsCard = () => {
    if (!_mountedSelectedOptionsCard) {
      _mountedSelectedOptionsCard = mount(<SelectedOptionsCard {...props} />);
    }
    return _mountedSelectedOptionsCard;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      id: "test id",
      options: [],
      action: jest.fn()
    };
    _mountedSelectedOptionsCard = undefined;
  });

  // Tests

  it("has a button with the correct onClick", () => {
    mountedSelectedOptionsCard()
      .find("#ChangeButton")
      .first()
      .simulate("click");
    expect(props.action).toBeCalled();
  });

  it("contains the list of options", () => {
    props.options = ["option_1", "option_2"];

    expect(
      mountedSelectedOptionsCard()
        .find("Typography")
        .map(comp => comp.text())
        .join()
    ).toEqual("option_1,option_2");
  });
});
