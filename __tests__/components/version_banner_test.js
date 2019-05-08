import React from "react";
import { shallow } from "enzyme";
import { VersionBanner } from "../../components/version_banner";
import translate from "../fixtures/translate";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("VersionBanner", () => {
  let props;
  let _mountedVersionBanner;
  const mountedVersionBanner = () => {
    if (!_mountedVersionBanner) {
      _mountedVersionBanner = shallow(<VersionBanner {...props} />);
    }
    return _mountedVersionBanner;
  };

  beforeEach(() => {
    props = {
      i18n: {
        changeLanguage: () => {}
      },
      t: translate,
      url: { query: { lng: "en" } }
    };
    _mountedVersionBanner = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mountedVersionBanner().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the phase badge", () => {
    expect(mountedVersionBanner().find("PhaseBadge").length).toEqual(1);
  });

  it("contains a link to the feedback page", () => {
    expect(mountedVersionBanner().find("Link").length).toEqual(1);
  });
});
