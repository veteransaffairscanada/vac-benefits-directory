/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import WrappedPlaceSearch from "../../components/place_search";
import { PlaceSearch } from "../../components/place_search";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import { withScriptjs } from "react-google-maps";

jest.mock("react-ga");

describe("PlaceSearch", () => {
  let props;

  beforeEach(() => {
    props = {
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCU5iYqJ_8g4bvR4AI3-LEzwlzr1DJ1dmE&language=en&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: "100%" }} />,
      containerElement: <div style={{ height: "400px" }} />,
      mapElement: <div style={{ height: "100%" }} />,
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      userLocation: { lat: 0, lng: 0 },
      setUserLocation: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let WrappedComponent = withScriptjs(WrappedPlaceSearch);
    let html = mount(<WrappedComponent {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
