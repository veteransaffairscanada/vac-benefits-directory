/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import { App } from "../../pages/index";

jest.mock("react-ga");

describe("Index page", () => {
  let props = {
    t: key => key,
    i18n: {}
  };

  it("has a description", () => {
    const appMounted = shallow(<App {...props} />);
    expect(appMounted.find("h1#TextDescription").text()).toEqual(
      "home.poc-description"
    );
  });

  it("has buttons for wireframe  B", () => {
    const appMounted = shallow(<App {...props} />);
    expect(appMounted.find("SelectButton").map(b => b.props().text)).toEqual([
      "B"
    ]);
  });
});
