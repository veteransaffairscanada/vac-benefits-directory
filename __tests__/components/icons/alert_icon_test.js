import React from "react";
import { mount } from "enzyme";
import AlertIcon from "../../../components/icons/alert_icon";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("AlertIcon", () => {
  let props;
  beforeEach(() => {
    props = {
      height: "30px",
      t: x => x
    };
  });

  it("renders", async () => {
    mount(<AlertIcon {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<AlertIcon {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
