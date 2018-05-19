/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { A } from "../../pages/A";
import benefitsFixture from "../fixtures/benefits";

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
      loadDataStore: jest.fn()
    };
    _mountedA = undefined;
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedA().state().section).toEqual("BB");
  });

  it("toggleSelectedEligibility adds and removes id", () => {
    let AInstance = mountedA().instance();
    expect(
      !AInstance.state.selectedEligibility["serviceType"].hasOwnProperty("x")
    );
    AInstance.toggleSelectedEligibility("serviceType", "x")();
    expect(
      AInstance.state.selectedEligibility["serviceType"].hasOwnProperty("x")
    );
    AInstance.toggleSelectedEligibility("serviceType", "x")();
    expect(
      !AInstance.state.selectedEligibility["serviceType"].hasOwnProperty("x")
    );
  });

  it("sectionToDisplay returns appropriate component", () => {
    let AInstance = mountedA().instance();
    expect(AInstance.sectionToDisplay("BB").props.id).toEqual("BB");
  });

  it("componantDidMount hydrates Redux with fixtures if use_testdata set", () => {
    props.url = {
      query: {
        use_testdata: "true"
      }
    };
    const expectedArgs = {
      benefits: benefitsFixture
    };
    expect(mountedA().instance().props.loadDataStore).toBeCalledWith(
      expectedArgs
    );
  });

  it("componantDidMount hydrates Redux with cached data if passed", () => {
    props.data = {
      benefits: 3
    };
    expect(mountedA().instance().props.loadDataStore).toBeCalledWith(
      props.data
    );
  });
});
