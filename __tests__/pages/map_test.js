/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import { Map } from "../../pages/map";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Map", () => {
  let props;

  beforeEach(() => {
    props = {
      text: [],
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      classes: {}
    };
  });

  it("passes axe tests", async () => {
    let html = shallow(<Map {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders AreaOfficeMap", () => {
    expect(shallow(<Map {...props} />).find("#AreaOfficeMap").length).toEqual(
      1
    );
  });
});
