import { GuidedSummary } from "../../pages/guided_summary";
import { mount, shallow } from "enzyme";
import translate from "../fixtures/translate";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("GuidedSummary", () => {
  let props;
  let _mountedGuidedSummary;
  let _shallowGuidedSummary;

  const mounted_GuidedSummary = () => {
    if (!_mountedGuidedSummary) {
      _mountedGuidedSummary = mount(<GuidedSummary {...props} />);
    }
    return _mountedGuidedSummary;
  };

  const shallow_GuidedSummary = () => {
    if (!_shallowGuidedSummary) {
      _shallowGuidedSummary = shallow(<GuidedSummary {...props} />);
    }
    return _shallowGuidedSummary;
  };

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate
    };
    _shallowGuidedSummary = undefined;
    _mountedGuidedSummary = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted_GuidedSummary().html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
