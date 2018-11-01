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
    window.scrollTo = jest.fn();
    props = {
      need: needsFixture[0],
      t: key => key,
      setSelectedNeeds: jest.fn(),
      pageWidth: 1000,
      selectedNeeds: {}
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
    expect(analytics.logEvent).toBeCalledWith("FilterClick", "need", "foo");
  });

  it("scrolls to the top of the page when clicked on desktop", () => {
    let needsInstance = mount(<NeedButton {...props} />).instance();
    needsInstance.handleClick("foo");
    expect(window.scrollTo).toBeCalled();
  });

  it("does not scroll to the top of the page when clicked on mobile", () => {
    props.pageWidth = 500;
    let needsInstance = mount(<NeedButton {...props} />).instance();
    needsInstance.handleClick("foo");
    expect(window.scrollTo).not.toBeCalled();
  });
});
