/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import { Map } from "../../pages/map";
import areaOfficesFixture from "../fixtures/area_offices";
import configureStore from "redux-mock-store";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Map", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      translations: [],
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      classes: {}
    };
    reduxData = {
      areaOffices: areaOfficesFixture,
      userLocation: { lat: 0, lng: 0 },
      setUserLocation: jest.fn(),
      setClosestAreaOffice: jest.fn(),
      setSelectedAreaOffice: jest.fn(),
      closestAreaOffice: areaOfficesFixture[0],
      selectedAreaOffice: areaOfficesFixture[0],
      setMapView: jest.fn()
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = shallow(<Map {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders AreaOfficeMap", () => {
    expect(
      shallow(<Map {...props} {...reduxData} />).find("#AreaOfficeMap").length
    ).toEqual(1);
  });

  it("renders AreaOfficeTable", () => {
    expect(
      shallow(<Map {...props} {...reduxData} />).find("#AreaOfficeTable").length
    ).toEqual(1);
  });

  it("has a back button", () => {
    expect(
      shallow(<Map {...props} {...reduxData} />).find("#backButton").length
    ).toEqual(1);
  });

  it("has contact Info", () => {
    expect(
      shallow(<Map {...props} {...reduxData} />).find("#contactInfo").length
    ).toEqual(1);
  });
});
