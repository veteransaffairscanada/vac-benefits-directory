import React from "react";
import SelectedOptionsCard from "../components/selected_options_card";
import { mount } from "enzyme";

describe("Test Selected Options Card", () => {
  it("SelectedOptionsCard", () => {
    const test_options = ["test_option_1", "test_option_2"];
    const test_page = "test_page";
    const expected_full_options = test_options.map(option => {
      return test_page + "." + option;
    });
    const card = mount(
      <SelectedOptionsCard
        t={key => key}
        page={test_page}
        options={test_options}
      />
    );
    expect(card.find("Typography").text()).toEqual(
      " " + expected_full_options.join("  ") + " "
    );
  });
});
