import React from "react";
import { mount } from "enzyme";
import ShareBox from "../../components/share_box";

const { axe, toHaveNoViolations } = require("jest-axe");

expect.extend(toHaveNoViolations);

describe("ShareBox", () => {
  let props;

  beforeEach(() => {
    props = {
      t: () => "en",
      url: {},
      printUrl: "/print",
      showShareLink: false
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<ShareBox {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains a print button", async () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    let shareBox = mount(<ShareBox {...props} />);
    shareBox.logPrintEvent = jest.fn();
    expect(shareBox.find("HeaderLink").length).toEqual(1);
    shareBox.find("HeaderLink").simulate("click");
    expect(analytics.logEvent).toBeCalledWith("Exit", "print");
  });

  it("doesn't render a share button when props.share is false", async () => {
    let shareBox = mount(<ShareBox {...props} />);
    expect(shareBox.find("ShareModal").length).toEqual(0);
  });
  it("renders a share button when props.share is true", async () => {
    props.showShareLink = true;
    let shareBox = mount(<ShareBox {...props} />);
    expect(shareBox.find("ShareModal").length).toEqual(1);
  });
  it("clicking share button changes showModal state to true", () => {
    props.showShareLink = true;
    let mounted = mount(<ShareBox {...props} />);
    mounted
      .find("HeaderButton")
      .first()
      .simulate("click");
    expect(mounted.state().showModal).toEqual(true);
  });
});
