import React from "react";
import SelectButton from "../../components/select_button";
import { mount } from "enzyme";

describe("Test SelectButton", () => {
  it("SelectButton renders", () => {
    const button = mount(
      <SelectButton
        t={key => key}
        id="test_id"
        text="test_text"
        onClick={() => {}}
        isDown={false}
      />
    );
    expect(button.text()).toEqual("test_text");
  });
});
