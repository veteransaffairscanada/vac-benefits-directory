import React from "react";
import { mount } from "enzyme";
import { NeedButton } from "../../components/need_button";
import needsFixture from "../fixtures/needs";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("NeedButton", () => {
  let props;

  beforeEach(() => {
    props = {
      need: needsFixture[0],
      t: key => key,
      setSelectedNeeds: jest.fn(),
      selectedNeeds: {},
      url: { route: "/" }
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<NeedButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("fires the the setSelectedNeeds function when a need is selected", () => {
    mount(<NeedButton {...props} />)
      .find("input")
      .at(0)
      .simulate("change", { target: { checked: true } });

    expect(props.setSelectedNeeds).toHaveBeenCalled();
  });

  it("handleClick logs an analytics event", () => {
    let needsInstance = mount(<NeedButton {...props} />).instance();
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    needsInstance.handleClick("foo");
    expect(analytics.logEvent).toBeCalledWith("GEFilterClick", "need", "foo");
  });
});
