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
      t: key => {
        return key == "current-language-code" ? "en" : key;
      }
    };
    _mountedAlphaBanner = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mountedAlphaBanner().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows the change language button", () => {
    expect(mountedAlphaBanner().find("PhaseBadge").length).toEqual(1);
  });
});
