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
      printUrl: "",
      share: false
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<ShareBox {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains a print button", async () => {
    let shareBox = mount(<ShareBox {...props} />);

    expect(shareBox.find("HeaderLink").length).toEqual(1);
  });

  it("doesn't render a share button when props.share is false", async () => {
    let shareBox = mount(<ShareBox {...props} />);
    expect(shareBox.find("ShareModal").length).toEqual(0);
  });
  it("renders a share button when props.share is true", async () => {
    props.share = true;
    let shareBox = mount(<ShareBox {...props} />);
    expect(shareBox.find("ShareModal").length).toEqual(1);
  });
  it("clicking share button changes showModal state to true", () => {
    props.share = true;
    let mounted = mount(<ShareBox {...props} />);
    mounted
      .find("HeaderButton")
      .first()
      .simulate("click");
    expect(mounted.state().showModal).toEqual(true);
  });
});
