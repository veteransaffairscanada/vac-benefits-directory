/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import WrappedAreaOfficeMap from "../../components/area_office_map";
import { AreaOfficeMap } from "../../components/area_office_map";
import areaOfficesFixture from "../fixtures/area_offices";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

import { withScriptjs } from "react-google-maps";

jest.mock("react-ga");

describe("AreaOfficeMap", () => {
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
      areaOffices: areaOfficesFixture,
      userLocation: { lat: 0, lng: 0 },
      setSelectedAreaOffice: jest.fn(),
      selectedAreaOffice: areaOfficesFixture[0]
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
});
