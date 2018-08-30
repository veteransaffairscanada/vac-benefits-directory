/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import { Map } from "../../pages/map";
import areaOfficesFixture from "../fixtures/area_offices";
import configureStore from "redux-mock-store";
import translate from "../fixtures/translate";

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
      t: translate,
      setMapView: jest.fn(),
      setUserLocation: jest.fn(),
      url: { query: {} }
    };
    reduxData = {
      areaOffices: areaOfficesFixture,
      userLocation: { lat: 0, lng: 0 },
      closestAreaOffice: areaOfficesFixture[0],
      selectedAreaOffice: areaOfficesFixture[0]
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

  describe("getLocation", () => {
    it("calls setUserLocation with default values if the navigator does not exist", () => {
      global.navigator = {};
      const map = shallow(<Map {...props} {...reduxData} />);
      map.instance().getLocation();
      expect(props.setUserLocation).toBeCalledWith({
        lat: 49,
        lng: -104
      });
    });

    it("calls setUserLocation if the navigator exists", () => {
      const map = shallow(<Map {...props} {...reduxData} />);
      map.instance().getLocation();
      expect(props.setUserLocation).toBeCalledWith({
        lat: 10,
        lng: 10
      });
    });

    it("calls setMapView if the navigator exists", () => {
      const map = shallow(<Map {...props} {...reduxData} />);
      map.instance().getLocation();
      expect(props.setMapView).toBeCalledWith({ lat: 10, lng: 10, zoom: 10 });
    });
  });

  describe("get_link", () => {
    it("generates a link using the existing page passed to it", () => {
      const map = shallow(<Map {...props} {...reduxData} />);
      expect(map.instance().get_link("foo")).toEqual("foo?");
    });

    it("generates a link using with the existing query params in props", () => {
      props.url.query = { fiz: "biz" };
      const map = shallow(<Map {...props} {...reduxData} />);
      expect(map.instance().get_link("foo")).toEqual("foo?fiz=biz");
    });

    it("generates a link using with the existing query params in props and ignore empties", () => {
      props.url.query = { fiz: "biz", biz: "" };
      const map = shallow(<Map {...props} {...reduxData} />);
      expect(map.instance().get_link("foo")).toEqual("foo?fiz=biz");
    });
  });
});
