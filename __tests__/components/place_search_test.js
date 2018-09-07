/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import WrappedPlaceSearch from "../../components/place_search";
import { PlaceSearch } from "../../components/place_search";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import { withScriptjs } from "react-google-maps";

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;

describe("PlaceSearch", () => {
  let props;
  let _mountedPlaceSearch;

  const mounted_PlaceSearch = () => {
    if (!_mountedPlaceSearch) {
      _mountedPlaceSearch = shallow(<PlaceSearch {...props} />);
    }
    return _mountedPlaceSearch;
  };

  beforeEach(() => {
    props = {
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=" +
        GOOGLE_MAPS_KEY +
        "&language=en&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: "100%" }} />,
      containerElement: <div style={{ height: "400px" }} />,
      mapElement: <div style={{ height: "100%" }} />,
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      userLocation: { lat: 0, lng: 0 },
      setUserLocation: jest.fn(),
      setMapView: jest.fn()
    };
    _mountedPlaceSearch = undefined;
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
        getPlaces: () => [
          { geometry: { location: { lat: () => 0, lng: () => 0 } } }
        ]
      });
      mounted_PlaceSearch().state("onPlacesChanged")();
      expect(
        mounted_PlaceSearch()
          .state("selected")
          .lat()
      ).toEqual(0);
    });
  });

  describe("setLocation", () => {
    it("calls setUserLocation and setMapView when setLocation is called", () => {
      mounted_PlaceSearch().setState({
        selected: { lat: () => 0, lng: () => 0 }
      });
      mounted_PlaceSearch()
        .instance()
        .setLocation();
      expect(props.setUserLocation).toBeCalledWith({ lat: 0, lng: 0 });
      expect(props.setMapView).toBeCalledWith({ lat: 0, lng: 0, zoom: 10 });
    });
  });

  it("onKeyPress toggle setLocation if Enter is pressed", () => {
    mounted_PlaceSearch().instance().setLocation = jest.fn();
    mounted_PlaceSearch()
      .instance()
      .onKeyPress({ key: "Enter" });
    expect(mounted_PlaceSearch().instance().setLocation).toBeCalled();
  });
});
