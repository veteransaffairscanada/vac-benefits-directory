/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import { Stats } from "../../pages/stats";
import githubFixture from "../fixtures/github_data";
import configureStore from "redux-mock-store";
import translate from "../fixtures/translate";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Stats", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      translations: [],
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate
    };
    reduxData = {
      githubData: githubFixture
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = shallow(<Stats {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders PrChart", () => {
    expect(
      shallow(<Stats {...props} {...reduxData} />).find("#PrChart").length
    ).toEqual(1);
  });
});
