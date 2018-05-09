/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { A } from "../../pages/A";
import { benefitsFixture } from "../fixtures/benefits";
import benefitTypesFixture from "../fixtures/benefit_types";
import patronTypesFixture from "../fixtures/patron_types";
import { corporaEnFixture, corporaFrFixture } from "../fixtures/corpora";

jest.mock("react-ga");

describe("A", () => {
  Router.router = {
    push: jest.fn()
  };
  Router.push = jest.fn();

  let props;
  let _mountedA;
  const mountedA = () => {
    if (!_mountedA) {
      _mountedA = shallow(<A {...props} />);
    }
    return _mountedA;
  };

  beforeEach(() => {
    props = {
      url: {
        query: {}
      },
      i18n: undefined,
      t: key => key,
      storeHydrated: true,
      loadDataStore: jest.fn(),
      benefitTypes: benefitTypesFixture,
      patronTypes: patronTypesFixture,
      benefits: benefitsFixture,
      corporaEn: corporaEnFixture,
      corporaFr: corporaFrFixture
    };
    _mountedA = undefined;
  });

  it("componentWillMount does not run hydrateFromAirtable if storeHydrated = true", () => {
    let airtable = require("../../utils/airtable");
    airtable.hydrateFromAirtable = jest.fn();
    mountedA();
    expect(airtable.hydrateFromAirtable).not.toBeCalled();
  });

  it("componentWillMount does run hydrateFromAirtable if storeHydrated = false", () => {
    props.storeHydrated = false;
    let airtable = require("../../utils/airtable");
    airtable.hydrateFromAirtable = jest.fn();
    mountedA();
    expect(airtable.hydrateFromAirtable).toBeCalled();
  });

  it("componentWillMount sets state correctly from empty url", () => {
    const expectedState = {
      section: "A1",
      selectedBenefitTypes: [],
      selectedPatronTypes: []
    };
    expect(mountedA().state()).toEqual(expectedState);
  });

  it("componentWillMount sets state correctly from populated url", () => {
    props.url = {
      query: {
        section: "test section",
        selectedBenefitTypes: "bt1,bt2",
        selectedPatronTypes: "pt"
      }
    };
    const expectedState = {
      section: "test section",
      selectedBenefitTypes: ["bt1", "bt2"],
      selectedPatronTypes: ["pt"]
    };
    expect(mountedA().state()).toEqual(expectedState);
  });

  it("switchSection sets state correctly if no data", () => {
    const originalSection = {
      section: "A1",
      selectedBenefitTypes: ["bt"],
      selectedPatronTypes: ["pt"]
    };
    let AInstance = mountedA().instance();
    AInstance.setState(originalSection);
    AInstance.switchSection("A1", {});
    expect(AInstance.state).toEqual(originalSection);
  });

  it("switchSection sets state correctly if new section and data", () => {
    const originalSection = {
      section: "A1",
      selectedBenefitTypes: ["bt"],
      selectedPatronTypes: ["pt"]
    };
    const newData = {
      selectedBenefitTypes: ["bt 1"],
      selectedPatronTypes: ["pt 1"]
    };
    let AInstance = mountedA().instance();
    AInstance.setState(originalSection);
    AInstance.switchSection("A2", newData);
    expect(AInstance.state).toEqual({
      section: "A2",
      selectedBenefitTypes: ["bt 1"],
      selectedPatronTypes: ["pt 1"]
    });
  });

  it("switchSection calls Router.push with correct href", () => {
    const originalSection = {
      section: "A1",
      selectedBenefitTypes: ["bt"],
      selectedPatronTypes: ["pt"]
    };
    const newData = {
      selectedBenefitTypes: ["bt1", "bt2"],
      selectedPatronTypes: ["pt1", "pt2"]
    };
    let AInstance = mountedA().instance();
    AInstance.setState(originalSection);
    AInstance.switchSection("A2", newData);
    const href =
      "/A?section=A2&selectedBenefitTypes=bt1,bt2&selectedPatronTypes=pt1,pt2";
    expect(Router.push).toBeCalledWith(href);
  });

  it("toggleSelectedPatronType adds and removes id", () => {
    let AInstance = mountedA().instance();
    expect(AInstance.state.selectedPatronTypes.indexOf("x")).toEqual(-1);
    AInstance.toggleSelectedPatronType("x")();
    expect(AInstance.state.selectedPatronTypes.indexOf("x")).toEqual(0);
    AInstance.toggleSelectedPatronType("x")();
    expect(AInstance.state.selectedPatronTypes.indexOf("x")).toEqual(-1);
  });

  it("toggleSelectedBenefitType adds and removes id", () => {
    let AInstance = mountedA().instance();
    expect(AInstance.state.selectedBenefitTypes.indexOf("x")).toEqual(-1);
    AInstance.toggleSelectedBenefitType("x")();
    expect(AInstance.state.selectedBenefitTypes.indexOf("x")).toEqual(0);
    AInstance.toggleSelectedBenefitType("x")();
    expect(AInstance.state.selectedBenefitTypes.indexOf("x")).toEqual(-1);
  });

  it("sectionToDisplay returns appropriate component", () => {
    let AInstance = mountedA().instance();
    expect(AInstance.sectionToDisplay("A1").props.id).toEqual("A1");
    expect(AInstance.sectionToDisplay("A2").props.id).toEqual("A2");
    expect(AInstance.sectionToDisplay("A3").props.id).toEqual("A3");
    expect(AInstance.sectionToDisplay("B3").props.id).toEqual("B3");
  });
});
