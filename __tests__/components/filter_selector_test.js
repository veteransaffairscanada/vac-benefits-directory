import React from "react";
import { mount } from "enzyme";
import FilterSelector from "../../components/filter_selector";
import patronTypesFixture from "../fixtures/patron_types";

describe("FilterSelector", () => {
  let props;
  let _mountedFilterSelector;

  const mountedFilterSelector = () => {
    if (!_mountedFilterSelector) {
      _mountedFilterSelector = mount(<FilterSelector {...props} />);
    }
    return _mountedFilterSelector;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      legend: "test legend",
      filters: patronTypesFixture,
      selectedFilters: [],
      handleChange: jest.fn()
    };
    _mountedFilterSelector = undefined;
  });

  it("contains the legend", () => {
    expect(
      mountedFilterSelector()
        .find("legend")
        .text()
    ).toContain(props.legend);
  });

  it("contains checkboxes for the filters", () => {
    expect(mountedFilterSelector().find("Checkbox").length).toEqual(
      props.filters.length
    );
    expect(
      patronTypesFixture.map(
        pt =>
          mountedFilterSelector()
            .find("#" + pt.id)
            .first()
            .props().label
      )
    ).toEqual(patronTypesFixture.map(pt => pt.name_fr));
  });

  it("displays English label if appropriate", () => {
    props.t = () => "en";
    expect(
      patronTypesFixture.map(
        pt =>
          mountedFilterSelector()
            .find("#" + pt.id)
            .first()
            .props().label
      )
    ).toEqual(patronTypesFixture.map(pt => pt.name_en));
  });

  it("has the correct checked properties", () => {
    props.selectedFilters = { [patronTypesFixture[0].id]: 1 };
    expect(
      mountedFilterSelector()
        .find("Checkbox")
        .get(0).props.checked
    ).toEqual(true);
    expect(
      mountedFilterSelector()
        .find("Checkbox")
        .get(1).props.checked
    ).toEqual(false);
  });

  it("has the correct onChange properties", () => {
    mountedFilterSelector()
      .find("Checkbox")
      .first()
      .simulate("change");
    expect(props.handleChange).toBeCalledWith(patronTypesFixture[0].id);
  });
});
