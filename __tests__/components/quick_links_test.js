import React from "react";
import { mount } from "enzyme";
import QuickLinks from "../../components/quick_links";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("QuickLinks", () => {
  let props;
  beforeEach(() => {
    props = {
      t: () => "en",
      rightHandText: "right hand text"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<QuickLinks {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("clicking next steps button changes window location", () => {
    let mounted = mount(<QuickLinks {...props} />);
    mounted.instance().scrollToId = jest.fn();
    mounted.find("#next-steps-button").simulate("click");
    expect(mounted.instance().scrollToId).toBeCalledWith("#next-steps");
  });
  it("clicking benefits and services changes window location", () => {
    let mounted = mount(<QuickLinks {...props} />);
    mounted.instance().scrollToId = jest.fn();
    mounted.find("#benefits-and-services-button").simulate("click");
    expect(mounted.instance().scrollToId).toBeCalledWith(
      "#benefits-and-services"
    );
  });
});
