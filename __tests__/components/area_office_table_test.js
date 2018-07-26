/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import WrappedAreaOfficeTable from "../../components/area_office_table";
import { AreaOfficeTable } from "../../components/area_office_table";
import configureStore from "redux-mock-store";
import areaOfficesFixture from "../fixtures/area_offices";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("AreaOfficeTable", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      lat: "0",
      lng: "0",
      t: key => {
        return key == "current-language-code" ? "en" : key;
      }
    };
    reduxData = {
      areaOffices: areaOfficesFixture
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(
      <WrappedAreaOfficeTable {...props} {...reduxData} />
    ).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a table", () => {
    expect(
      shallow(<AreaOfficeTable {...props} {...reduxData} />).find(
        "#tableHeader"
      ).length
    ).toEqual(1);
    expect(
      shallow(<AreaOfficeTable {...props} {...reduxData} />).find("#tableRow0")
        .length
    ).toEqual(1);
    expect(
      shallow(<AreaOfficeTable {...props} {...reduxData} />).find("#tableRow1")
        .length
    ).toEqual(1);
  });
});
