import React from "react";
import { shallow } from "enzyme";
import { AlphaBanner } from "../../components/alpha_banner";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("AlphaBanner", () => {
  let props;
  let _mountedAlphaBanner;
  const mountedAlphaBanner = () => {
    if (!_mountedAlphaBanner) {
      _mountedAlphaBanner = shallow(<AlphaBanner {...props} />);
    }
    return _mountedAlphaBanner;
  };

  beforeEach(() => {
    props = {
      i18n: {
        changeLanguage: () => {}
      },
    };
    _mountedAlphaBanner = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mountedAlphaBanner().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the alpha badge", () => {
    expect(mountedAlphaBanner().find("PhaseBadge").length).toEqual(1);
  });
});
