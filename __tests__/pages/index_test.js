/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";
import { App } from "../../pages/index";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Index page", () => {
  let props = {
    t: key => key,
    text: [],
    i18n: {
      addResourceBundle: jest.fn()
    }
  };

  it("passes axe tests", async () => {
    let html = mount(<App {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a description", () => {
    const appMounted = mount(<App {...props} />);
    expect(
      appMounted
        .find("#heroTitle")
        .first()
        .text()
    ).toEqual("index.title");
  });

  it("has a button for the guided experience", () => {
    const appMounted = mount(<App {...props} />);
    expect(
      appMounted
        .find("#heroGuidedLink")
        .first()
        .text()
    ).toEqual("index.guided experience");
  });

  it("has a Button for the directory", () => {
    const appMounted = mount(<App {...props} />);
    expect(
      appMounted
        .find("#heroBenefitsLink")
        .first()
        .text()
    ).toEqual("index.all benefits");
  });
});
