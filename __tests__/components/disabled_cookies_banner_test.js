import { shallow } from "enzyme";
import { DisabledCookiesBanner } from "../../components/disabled_cookies_banner";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("DisabledCookiesBanner", () => {
  let props;

  beforeEach(() => {
    props = {
      t: jest.fn(),
      onClose: jest.fn()
    };
  });

  // Tests
  it("passes axe tests", async () => {
    let html = shallow(<DisabledCookiesBanner {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
