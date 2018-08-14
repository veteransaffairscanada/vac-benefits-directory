/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import WrappedPlaceSearch from "../../components/place_search";
import { PlaceSearch } from "../../components/place_search";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import { withScriptjs } from "react-google-maps";
import configureStore from "redux-mock-store";

describe("PlaceSearch", () => {
  let props;
  let _mountedPlaceSearch;
  let mockStore, reduxData;

  const mounted_PlaceSearch = () => {
    if (!_mountedPlaceSearch) {
      _mountedPlaceSearch = shallow(<PlaceSearch {...props} {...reduxData} />);
    }
    return _mountedPlaceSearch;
  };

  beforeEach(() => {
    props = {
      classes: {},
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
    _mountedPlaceSearch = undefined;
    reduxData = {
      setUserLocation: jest.fn()
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let WrappedComponent = withScriptjs(WrappedPlaceSearch);
    let html = mount(<WrappedComponent {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("onSearchBoxMounted", () => {
    it("sets refs.searchbox in state", () => {
      mounted_PlaceSearch().state("onSearchBoxMounted")("foo");
      expect(mounted_PlaceSearch().state("refs")).toEqual({ searchBox: "foo" });
    });
  });

  describe("onPlacesChanged", () => {
    it("sets selectedState to first result of getPlaces", () => {
      mounted_PlaceSearch().state("onSearchBoxMounted")({
        getPlaces: () => [{ geometry: { location: "foo" } }]
      });
      mounted_PlaceSearch().state("onPlacesChanged")();
      expect(mounted_PlaceSearch().state("selected")).toEqual("foo");
    });
  });

  describe("setLocation", () => {
    it("sets the Location in Redux", () => {
      mounted_PlaceSearch().setState({
        selected: { lat: () => 0, lng: () => 0 }
      });
      mounted_PlaceSearch()
        .instance()
        .setLocation();
      expect(reduxData.setUserLocation).toBeCalledWith({ lat: 0, lng: 0 });
    });
  });
});
