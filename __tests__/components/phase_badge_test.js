import { shallow } from "enzyme";
import { PhaseBadge } from "../../components/phase_badge";

describe("<PhaseBadge />", () => {
  describe('when phase == "alpha"', () => {
    it("renders an alpha message", () => {
      let wrapper = shallow(<PhaseBadge phase="alpha" />);
      expect(wrapper.text()).toMatch(/ALPHA/);
    });
  });

  describe('when phase == "beta"', () => {
    it("renders an beta message", () => {
      let wrapper = shallow(<PhaseBadge phase="beta" />);
      expect(wrapper.text()).toMatch(/BETA/);
    });
  });
});
