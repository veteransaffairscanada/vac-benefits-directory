/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";
import A2 from "../../components/A2";
import patronTypesFixture from "../fixtures/patron_types";

jest.mock("react-ga");

describe("A2", () => {
  let props;
  let _mountedA2;
  const mountedA2 = () => {
    if (!_mountedA2) {
      _mountedA2 = mount(<A2 {...props} />);
    }
    return _mountedA2;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      patronTypes: patronTypesFixture,
      selectedPatronTypes: [],
      switchSection: jest.fn()
    };
    _mountedA2 = undefined;
  });

  it("sets state correctly on mount if no preselected patron types", () => {
    expect(mountedA2().state().selectedPatronTypes).toEqual({});
  });

  it("sets state correctly on mount if preselected patron types", () => {
    props.selectedPatronTypes = [patronTypesFixture[0].id];
    let expectedselectedPatronTypes = {};
    expectedselectedPatronTypes[patronTypesFixture[0].id] = true;
    expect(mountedA2().state().selectedPatronTypes).toEqual(
      expectedselectedPatronTypes
    );
  });

  it("toggleButton adds id to state if not already there", () => {
    mountedA2()
      .instance()
      .toggleButton(patronTypesFixture[0].id);
    let expectedselectedPatronTypes = {};
    expectedselectedPatronTypes[patronTypesFixture[0].id] = true;
    expect(mountedA2().state().selectedPatronTypes).toEqual(
      expectedselectedPatronTypes
    );
  });

  it("toggleButton removes id from state if already there", () => {
    let initialselectedPatronTypes = {};
    initialselectedPatronTypes[patronTypesFixture[0].id] = true;
    let A2Instance = mountedA2().instance();
    A2Instance.setState({
      selectedPatronTypes: initialselectedPatronTypes
    });
    A2Instance.toggleButton(patronTypesFixture[0].id);
    expect(A2Instance.state.selectedPatronTypes).toEqual({});
  });

  it("has benefit type buttons", () => {
    const expectedButtonText = patronTypesFixture
      .map(b => b.name_fr)
      .concat(["A2.See Results"]);
    expect(
      mountedA2()
        .find("SelectButton")
        .map(b => b.text())
    ).toEqual(expectedButtonText);
    expect(
      mountedA2()
        .find("SelectButton")
        .first()
        .prop("onClick")
    ).toEqual(mountedA2().instance().toggleButton);
  });

  it("has benefit type with isDown all false if no patron types are preselected", () => {
    expect(
      mountedA2()
        .find("SelectButton")
        .map(b => b.prop("isDown"))
    ).toEqual([false, false, false]);
  });

  it("has benefit type with isDown true if a patron types is preselected", () => {
    props.selectedPatronTypes = [patronTypesFixture[1].id];
    expect(
      mountedA2()
        .find("SelectButton")
        .map(b => b.prop("isDown"))
    ).toEqual([false, true, false]);
  });

  it("has a See Results button", () => {
    expect(
      mountedA2()
        .find("SelectButton")
        .get(2).props.text
    ).toEqual("A2.See Results");
  });

  it("has an All Benefits Link", () => {
    expect(
      mountedA2()
        .find(".AllBenefits")
        .text()
    ).toEqual("Show All Benefits");
  });
});
