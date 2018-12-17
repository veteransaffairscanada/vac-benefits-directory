import { mount } from "enzyme";
import Checkbox from "../../components/checkbox";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Checkbox", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "label text"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Checkbox {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Checkbox {...props} />).html()).toContain("label text");
  });
});
