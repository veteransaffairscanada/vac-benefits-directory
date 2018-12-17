import { mount } from "enzyme";
import FilterText from "../../../components/typography/filter_text";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
describe("FilterText", () => {
  let props;
  beforeEach(() => {
    props = {
      children: "test"
    };
  });
  it("passes axe tests", async () => {
    let html = mount(<FilterText {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
  it("shows children", () => {
    expect(mount(<FilterText {...props} />).text()).toEqual("test");
  });
});
