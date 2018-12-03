import React from "react";
import { mount } from "enzyme";
import EditIcon from "../../../components/icons/Edit";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("EditIcon", () => {
  let props;
  beforeEach(() => {
    props = {
      height: "30px",
      width: "30px",
      t: x => x
    };
  });

  it("renders", async () => {
    mount(<EditIcon {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<EditIcon {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
