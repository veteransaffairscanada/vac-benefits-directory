import { mount } from "enzyme";
import Radio from "../../components/radio";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Radio", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "label text",
      value: "value"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Radio {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Radio {...props} />).html()).toContain("label text");
  });
});
