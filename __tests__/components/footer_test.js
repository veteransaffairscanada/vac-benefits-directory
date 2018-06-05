import React from "react";
import Footer from "../../components/footer";
import { mount } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Footer", () => {
  // Setup

  let props;
  let _mountedFooter;
  const mountedFooter = () => {
    if (!_mountedFooter) {
      _mountedFooter = mount(<Footer {...props} />);
    }
    return _mountedFooter;
  };

  beforeEach(() => {
    props = {
      t: key => key
    };
    _mountedFooter = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mountedFooter().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the privacy button", () => {
    expect(
      mountedFooter()
        .find("#privacy")
        .at(0)
        .text()
    ).toEqual("Privacy");
  });

  describe("in production environment", () => {
    let _CIRCLE_SHA1;

    beforeEach(() => {
      _CIRCLE_SHA1 = process.env.CIRCLE_SHA1;
      process.env.CIRCLE_SHA1 = "1234567890";
    });

    afterEach(() => {
      if (typeof _CIRCLE_SHA1 === "undefined") {
        delete process.env.CIRCLE_SHA1;
      } else {
        process.env.CIRCLE_SHA1 = _CIRCLE_SHA1;
      }
    });

    it("shows abbreviated hash", () => {
      expect(mountedFooter().text()).toContain("1234567");
    });
  });

  describe("defaults to node environment", () => {
    beforeEach(() => {
      delete process.env.CIRCLE_SHA1;
    });

    it("shows 'test' in test environment", () => {
      expect(mountedFooter().text()).toContain("test");
    });
  });
});
