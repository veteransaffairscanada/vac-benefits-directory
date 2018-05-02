/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";
import A1 from "../../components/A1";
import benefitTypesFixture from "../fixtures/benefit_types";

jest.mock("react-ga");

describe("A1", () => {
  let props;
  let _mountedA1;
  const mountedA1 = () => {
    if (!_mountedA1) {
      _mountedA1 = mount(<A1 {...props} />);
    }
    return _mountedA1;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      benefitTypes: benefitTypesFixture,
      selectedBenefitTypes: [],
      switchSection: jest.fn()
    };
    _mountedA1 = undefined;
  });

  it("sets state correctly on mount if no preselected benefit types", () => {
    expect(mountedA1().state().selectedBenefitTypes).toEqual({});
  });

  it("sets state correctly on mount if preselected benefit types", () => {
    props.selectedBenefitTypes = [benefitTypesFixture[0].id];
    let expectedSelectedBenefitTypes = {};
    expectedSelectedBenefitTypes[benefitTypesFixture[0].id] = true;
    expect(mountedA1().state().selectedBenefitTypes).toEqual(
      expectedSelectedBenefitTypes
    );
  });

  it("toggleButton adds id to state if not already there", () => {
    mountedA1()
      .instance()
      .toggleButton(benefitTypesFixture[0].id);
    let expectedSelectedBenefitTypes = {};
    expectedSelectedBenefitTypes[benefitTypesFixture[0].id] = true;
    expect(mountedA1().state().selectedBenefitTypes).toEqual(
      expectedSelectedBenefitTypes
    );
  });

  it("toggleButton removes id from state if already there", () => {
    let initialSelectedBenefitTypes = {};
    initialSelectedBenefitTypes[benefitTypesFixture[0].id] = true;
    let A1Instance = mountedA1().instance();
    A1Instance.setState({
      selectedBenefitTypes: initialSelectedBenefitTypes
    });
    A1Instance.toggleButton(benefitTypesFixture[0].id);
    expect(A1Instance.state.selectedBenefitTypes).toEqual({});
  });

  it("has benefit type buttons", () => {
    const expectedButtonText = benefitTypesFixture
      .map(b => b.name_fr)
      .concat(["A1.Next"]);
    expect(
      mountedA1()
        .find("SelectButton")
        .map(b => b.text())
    ).toEqual(expectedButtonText);
    expect(
      mountedA1()
        .find("SelectButton")
        .first()
        .prop("onClick")
    ).toEqual(mountedA1().instance().toggleButton);
  });

  it("has benefit type with isDown all false if no benefit types are preselected", () => {
    expect(
      mountedA1()
        .find("SelectButton")
        .map(b => b.prop("isDown"))
    ).toEqual([false, false, false]);
  });

  it("has benefit type with isDown true if a benefit types is preselected", () => {
    props.selectedBenefitTypes = [benefitTypesFixture[1].id];
    expect(
      mountedA1()
        .find("SelectButton")
        .map(b => b.prop("isDown"))
    ).toEqual([false, true, false]);
  });

  it("has a Next button", () => {
    expect(
      mountedA1()
        .find("SelectButton")
        .get(2).props.text
    ).toEqual("A1.Next");
  });

  it("has an All Benefits Link", () => {
    expect(
      mountedA1()
        .find(".AllBenefits")
        .text()
    ).toEqual("Show All Benefits");
  });
});
