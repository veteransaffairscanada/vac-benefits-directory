import React from "react";
import { TextArea } from "../../components/text_area";
import { mount } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("TextArea", () => {
  // Setup

  let props;

  beforeEach(() => {
    props = {
      t: key => key,
      children: "This is the text area label!",
      maxLength: 500
    };
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mount(<TextArea {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has textarea maxlength equal to the maxLength prop", () => {
    let mounted = mount(<TextArea {...props} />);
    expect(mounted.find("textarea").html()).toContain('maxlength="500"');
  });

  it("updates the characters left indicator when the text area contents change", () => {
    let mounted = mount(<TextArea {...props} />);
    const event = { target: { value: "sometext" } };
    mounted.find("textarea").simulate("change", event);
    expect(mounted.state().charsLeft).toEqual(492);
  });
});
