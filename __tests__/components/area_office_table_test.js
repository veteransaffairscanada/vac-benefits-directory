/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import { AreaOfficeTable } from "../../components/area_office_table";
import areaOfficesFixture from "../fixtures/area_offices";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("AreaOfficeTable", () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {},
      t: key => {
        return key == "current-language-code" ? "en" : key;
      },
      setClosestAreaOffice: jest.fn(),
      areaOffices: areaOfficesFixture,
      userLocation: { lat: 0, lng: 0 },
      setSelectedAreaOffice: jest.fn(),
      selectedAreaOffice: areaOfficesFixture[0],
      setMapView: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<AreaOfficeTable {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("computeDistanceKm", () => {
    it("computes distance between two points", () => {
      expect(
        mount(<AreaOfficeTable {...props} />)
          .instance()
          .computeDistanceKm("0", "0", "10", "10")
      ).toEqual(1569.5446022429596);
    });
  });

  describe("officeDistance", () => {
    it("calulates this distance between the position and offices", () => {
      expect(
        mount(<AreaOfficeTable {...props} />)
          .instance()
          .officeDistance()
      ).toEqual({ "0": 11509.581646975785, "1": 11509.581646975785 });
    });
  });

  describe("sortedAreaOffices", () => {
    it("sorts area offices", () => {
      expect(
        mount(<AreaOfficeTable {...props} />)
          .instance()
          .sortedAreaOffices()
      ).toEqual(areaOfficesFixture);
    });
  });

  it("has a table", () => {
    expect(
      shallow(<AreaOfficeTable {...props} />).find("#tableHeader").length
    ).toEqual(1);
    expect(
      shallow(<AreaOfficeTable {...props} />).find("#tableRow0").length
    ).toEqual(1);
    expect(
      shallow(<AreaOfficeTable {...props} />).find("#tableRow1").length
    ).toEqual(1);
  });

  it("stores the closest area office when a location is given", () => {
    shallow(<AreaOfficeTable {...props} />)
      .instance()
      .sortedAreaOffices();
    expect(props.setClosestAreaOffice).toBeCalledWith(props.areaOffices[0]);
  });

  it("selects an area office when a row is clicked", () => {
    mount(<AreaOfficeTable {...props} />)
      .find("TableRow")
      .at(2)
      .simulate("click");
    expect(props.setSelectedAreaOffice).toBeCalledWith(props.areaOffices[1]);
  });

  it("sets the map view when a row is clicked", () => {
    mount(<AreaOfficeTable {...props} />)
      .find("TableRow")
      .at(2)
      .simulate("click");
    expect(props.setMapView).toBeCalledWith({
      lat: props.areaOffices[1].lat,
      lng: props.areaOffices[1].lng,
      zoom: 10
    });
  });
});
