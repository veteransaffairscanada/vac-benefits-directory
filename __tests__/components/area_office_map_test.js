/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import WrappedAreaOfficeMap from "../../components/area_office_map";
import { AreaOfficeMap } from "../../components/area_office_map";
import areaOfficesFixture from "../fixtures/area_offices";

const GOOGLE_MAPS_KEY=process.env.GOOGLE_MAPS_KEY

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import { withScriptjs } from "react-google-maps";

jest.mock("react-ga");

describe("AreaOfficeMap", () => {
  let props;

  beforeEach(() => {
    props = {
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_KEY + "&language=en&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: "100%" }} />,
      containerElement: <div style={{ height: "400px" }} />,
      mapElement: <div style={{ height: "100%" }} />,
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      areaOffices: areaOfficesFixture,
      userLocation: { lat: 0, lng: 0 },
      setSelectedAreaOffice: jest.fn(),
      setMapView: jest.fn(),
      selectedAreaOffice: areaOfficesFixture[0],
      mapView: { lat: 49, lng: -100, zoom: 10 },
      classes: {}
    };
  });

  it("passes axe tests", async () => {
    let WrappedComponent = withScriptjs(WrappedAreaOfficeMap);
    let html = mount(<WrappedComponent {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("renders the correct number of Markers", () => {
    expect(shallow(<AreaOfficeMap {...props} />).find("Marker").length).toEqual(
      2
    );
  });

  it("selects an area office when a pin is clicked", () => {
    shallow(<AreaOfficeMap {...props} />)
      .find("Marker")
      .at(1)
      .simulate("click");
    expect(props.setSelectedAreaOffice).toBeCalledWith(props.areaOffices[1]);
  });

  it("pops up InfoWindow when a pin is clicked", () => {
    const map = shallow(<AreaOfficeMap {...props} />);
    map
      .find("Marker")
      .at(1)
      .simulate("click");
    expect(map.find("InfoWindow").length).toEqual(1);
  });

  it("InfoWindow has a button", () => {
    const map = shallow(<AreaOfficeMap {...props} />);
    map
      .find("Marker")
      .at(1)
      .simulate("click");
    expect(
      map
        .find("InfoWindow")
        .first()
        .find("#getDirectionsButton").length
    ).toEqual(1);
  });
});
