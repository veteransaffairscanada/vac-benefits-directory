import { mount } from "enzyme";
import Dropdown from "../../components/dropdown";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Dropdown", () => {
  let props;
  beforeEach(() => {
    props = {
      children: [
        <option value="a" key="a">
          a
        </option>,
        <option value="b" key="b">
          b
        </option>
      ],
      onChange: jest.fn(),
      value: "value",
      label: "label",
      id: "id"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Dropdown {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<Dropdown {...props} />).find("option").length).toEqual(2);
  });
});
