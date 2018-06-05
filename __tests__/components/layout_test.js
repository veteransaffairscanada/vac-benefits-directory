import React from "react";
import Layout from "../../components/layout";
import { mount } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Layout", () => {
  // Setup

  let props;
  let _mountedLayout;
  const mountedLayout = () => {
    if (!_mountedLayout) {
      _mountedLayout = mount(<Layout {...props} />);
    }
    return _mountedLayout;
  };

  beforeEach(() => {
    window.GA_INITIALIZED = true;
    props = {
      t: key => key
    };
    _mountedLayout = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mountedLayout().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows Noscript if hideNoscript is false", () => {
    props.hideNoscript = false;
    expect(mountedLayout().find("Noscript").length).toEqual(1);
  });

  it("hides Noscript if hideNoscript is true", () => {
    props.hideNoscript = true;
    expect(mountedLayout().find("Noscript").length).toEqual(0);
  });
});
