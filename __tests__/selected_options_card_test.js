import React from "react";
import SelectedOptionsCard from "../components/selected_options_card";
import { mount } from "enzyme";

describe("Test Selected Options Card", () => {
  it("SelectedOptionsCard", () => {
    const testOptions = ["test_option_1", "test_option_2"];
    const testPage = "test_page";

    const expectedText = testOptions
      .map(option => {
        return testPage + "." + option;
      })
      .join();

    const card = mount(
      <SelectedOptionsCard
        t={key => key}
        page={testPage}
        options={testOptions}
      />
    );
    const cardText = card
      .find("Typography")
      .map(option => {
        return option.text();
      })
      .join();

    expect(cardText).toEqual(expectedText);
  });
});
