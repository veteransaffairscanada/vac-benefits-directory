import React from "react";
import SelectedOptionsCard from "../../components/selected_options_card";
import { mount } from "enzyme";

describe("Test Selected Options Card", () => {
  it("SelectedOptionsCard", () => {
    const testOptions = ["test_option_1", "test_option_2"];

    const card = mount(
      <SelectedOptionsCard options={testOptions} t={key => key} />
    );
    const cardText = card
      .find("Typography")
      .map(option => {
        return option.text();
      })
      .join();

    expect(cardText).toEqual(testOptions.join());
  });
});
