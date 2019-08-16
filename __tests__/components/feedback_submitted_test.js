import React from "react";
import { mount } from "enzyme";
import { FeedbackSubmitted } from "../../components/feedback_submitted";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import translate from "../fixtures/translate";

jest.mock("react-ga");

describe("FeedbackSubmitted", () => {
  let props;

  beforeEach(() => {
    props = {
      t: translate,
      url: { query: {} }
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<FeedbackSubmitted {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the Return to Find benefits and services link", async () => {
    expect(mount(<FeedbackSubmitted {...props} />).text()).toContain(
      "ben_dir_link"
    );
  });
});
