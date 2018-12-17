import { shallow } from "enzyme";
import { flush } from "emotion";
import WordMark from "../../components/word_mark";

describe("<WordMark />", () => {
  afterEach(() => flush());

  it("renders svg", () => {
    let wrapper = shallow(<WordMark />);
    expect(wrapper.is("svg")).toBeTruthy();
  });

  it("accepts a width prop", () => {
    let wrapper = shallow(<WordMark width="1000%" />);
    expect(wrapper.props().width).toEqual("1000%");
  });

  it("defaults to width of 10em", () => {
    let wrapper = shallow(<WordMark />);
    expect(wrapper.props().width).toEqual("10em");
  });

  it("allows passing through abritrary props", () => {
    let wrapper = shallow(<WordMark focusable="false" whizz="bang" />);
    expect(wrapper.props().focusable).toEqual("false");
    expect(wrapper.props().whizz).toEqual("bang");
  });
});
