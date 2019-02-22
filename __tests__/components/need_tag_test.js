import React from "react";
import { mount } from "enzyme";
import { NeedTag } from "../../components/need_tag";
import needsFixture from "../fixtures/needs";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("NeedTag", () => {
  let props;
  beforeEach(() => {
    props = {
      need: needsFixture[0],
      t: key => {
        return key == "current-language-code" ? "en" : key;
      }
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<NeedTag {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the correct text", () => {
    expect(
      mount(<NeedTag {...props} />)
        .find("div")
        .at(0)
        .text()
        .replace(",", "")
    ).toEqual("NEED 0");
  });
});
