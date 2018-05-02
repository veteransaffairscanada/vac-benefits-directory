/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { App } from "../../components/A1";

jest.mock("react-ga");

import benefitTypesFixture from "../fixtures/benefit_types";
/*

- mounts with preselected components
- toggleButton
  - given id in state.selectedBenefitTypes, remove it from state
  - given id not in state, add it to state






import React from "react";
import A1 from "../../components/A1";
import { mount } from "enzyme";

describe("A1", () => {
  // Setup

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
      t: key => key
    };
    _mountedA1 = undefined;
  });

  // Tests

  it("shows the privacy button", () => {
    expect(
      mountedA1()
        .find("#privacy")
        .at(0)
        .text()
    ).toEqual("Privacy");
  });

  describe("in production environment", () => {
    let _CIRCLE_SHA1;

    beforeEach(() => {
      _CIRCLE_SHA1 = process.env.CIRCLE_SHA1;
      process.env.CIRCLE_SHA1 = "1234567890";
    });

    afterEach(() => {
      if (typeof _CIRCLE_SHA1 === "undefined") {
        delete process.env.CIRCLE_SHA1;
      } else {
        process.env.CIRCLE_SHA1 = _CIRCLE_SHA1;
      }
    });

    it("shows abbreviated hash", () => {
      expect(mountedA1().text()).toContain("1234567");
    });
  });

  describe("defaults to node environment", () => {
    beforeEach(() => {
      delete process.env.CIRCLE_SHA1;
    });

    it("shows 'test' in test environment", () => {
      expect(mountedA1().text()).toContain("test");
    });
  });
});



*/

describe("Page A1", () => {
  it("Instructions", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        benefitTypes={[]}
        selectedBenefitTypes={[]}
      />
    );
    expect(app.text()).toMatch(/A1.What services are you interested in?/);
    expect(app.text()).toMatch(/A1.Select all that apply/);
  });

  it("Buttons", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        selectedBenefitTypes={[]}
        switchSection={jest.fn()}
      />
    );
    const buttons = app.find("Button");
    const expectedText = [
      "Compensation Pour Préjudice",
      "Couverture des Coûts de Soins de Santé",
      "A1.Next"
    ];
    expect(buttons.length).toEqual(3);
    buttons.map(function(button, index) {
      expect(button.text()).toEqual(expectedText[index]);
    });
  });

  it("Show All Benefits Link", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        benefitTypes={[]}
        selectedBenefitTypes={[]}
      />
    );
    expect(app.find(".AllBenefits").text()).toEqual("Show All Benefits");
  });
});
