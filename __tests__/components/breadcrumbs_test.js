import Breadcrumbs from "../../components/breadcrumbs";
import { mount } from "enzyme";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Breadcrumbs", () => {
  let props;
  beforeEach(() => {
    props = {
      pageTitle: "test",
      t: () => "test",
      url: { query: {} },
      breadcrumbs: [{ url: "/", name: "test" }]
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<Breadcrumbs {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
