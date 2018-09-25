import React from "react";
import { mount } from "enzyme";
import GuidedExperienceLink from "../../../components/typography/guided_experience_link";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("GuidedExperienceLink", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "header",
      href: "#",
      onClick: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<GuidedExperienceLink {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("calls onClick when clicked", () => {
    mount(<GuidedExperienceLink {...props} />).simulate("click");
    expect(props.onClick).toBeCalled();
  });
});
