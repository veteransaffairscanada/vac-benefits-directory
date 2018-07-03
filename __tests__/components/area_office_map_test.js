/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import WrappedAreaOfficeMap from "../../components/area_office_map";
import { AreaOfficeMap } from "../../components/area_office_map";

import configureStore from "redux-mock-store";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("AreaOfficeMap", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCU5iYqJ_8g4bvR4AI3-LEzwlzr1DJ1dmE&language=en&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: "100%" }} />,
      containerElement: <div style={{ height: "400px" }} />,
      mapElement: <div style={{ height: "100%" }} />,
      t: key => {
        return key == "current-language-code" ? "en" : key;
      }
    };
    reduxData = {
      areaOffices: [
        {
          name_en: "name_en",
          name_fr: "name_fr",
          address_en: "address_en",
          address_fr: "address_fr",
          lat: "50",
          lng: "-100"
        },
        {
          name_en: "name_en",
          name_fr: "name_fr",
          address_en: "address_en",
          address_fr: "address_fr",
          lat: "55",
          lng: "-100"
        }
      ]
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<WrappedAreaOfficeMap {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders the correct number of Markers", () => {
    expect(
      shallow(<AreaOfficeMap {...props} {...reduxData} />).find("Marker").length
    ).toEqual(2);
  });
});
