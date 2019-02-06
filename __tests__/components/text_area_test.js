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
      children: "This is the text area label!"
    };
  });

  // Tests
  it("passes axe tests", async () => {
    let html = mount(<TextArea {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("displays only 500 characters if more than 500 are inputted", () => {
    let string = `Two roads diverged in a yellow wood,
      And sorry I could not travel both
      And be one traveler, long I stood
      And looked down one as far as I could
      To where it bent in the undergrowth;
      
      Then took the other, as just as fair,
      And having perhaps the better claim,
      Because it was grassy and wanted wear;
      Though as for that the passing there
      Had worn them really about the same,
      
      And both that morning equally lay
      In leaves no step had trodden black.
      Oh, I kept the first for another day!
      Yet knowing how way leads on to way,
      I doubted if I should ever come back.
      
      I shall be telling this with a sigh
      Somewhere ages and ages hence:
      Two roads diverged in a wood, and I—
      I took the one less traveled by,
      And that has made all the difference.`;

    expect(string.length).toBeGreaterThan(500);
    let mounted = mount(<TextArea {...props} />);
    mounted.find("textarea").simulate("change", { target: { value: string } });
    expect(mounted.find("textarea").text().length).toEqual(500);
  });
});
