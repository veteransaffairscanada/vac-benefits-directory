/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import { App } from "../../pages/index";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Index page", () => {
  let props = {
    t: key => key,
    i18n: {}
  };

  it("passes axe tests", async () => {
    let html = shallow(<App {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a description", () => {
    const appMounted = shallow(<App {...props} />);
    expect(appMounted.find("h1#TextDescription").text()).toEqual(
      "home.poc-description"
    );
  });

  it("has buttons for wireframe  B and Data Validation", () => {
    const appMounted = shallow(<App {...props} />);
    expect(appMounted.find("SelectButton").map(b => b.props().text)).toEqual([
      "index.benefits directory",
      "index.data validation",
      "index.all benefits"
    ]);
  });
});
