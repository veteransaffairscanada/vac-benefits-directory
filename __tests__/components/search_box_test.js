import { mount } from "enzyme";
import SearchBox from "../../components/search_box";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("SearchBox", () => {
  let props;
  beforeEach(() => {
    props = {
      inputId: "input",
      onButtonClick: jest.fn(),
      buttonId: "buttonId",
      onKeyDown: jest.fn(),
      onKeyUp: jest.fn(),
      value: "the value",
      onChange: jest.fn(),
      onClear: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<SearchBox {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("the input element is getting the placeholder prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().placeholder
    ).toEqual(props.placeholder);
  });

  it("the input element is getting the onKeyDown prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().onKeyDown
    ).toEqual(props.onKeyDown);
  });

  it("the input element is getting the onKeyUp prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().onKeyUp
    ).toEqual(props.onKeyUp);
  });

  it("the input element is getting the value prop", () => {
    expect(
      mount(<SearchBox {...props} />)
        .find("input")
        .props().value
    ).toEqual(props.value);
  });

  it("if disableButton is false then clicking the button will trigger onClick", () => {
    mount(<SearchBox {...props} />)
      .find("button")
      .at(1)
      .simulate("click");
    expect(props.onButtonClick).toBeCalled();
  });

  it("if disableButton is true then clicking the button will not trigger onClick", () => {
    props.disableButton = true;
    mount(<SearchBox {...props} />)
      .find("button")
      .at(1)
      .simulate("click");
    expect(props.onButtonClick).not.toBeCalled();
  });

  describe("handleChange function", () => {
    let event;
    beforeEach(() => {
      event = { target: { value: "v" } };
    });

    it("calls onChange appropriately", () => {
      mount(<SearchBox {...props} />)
        .instance()
        .handleChange(event);
      expect(props.onChange).toBeCalledWith(event);
    });

    it("works if onChange undefined", () => {
      props.onChange = undefined;
      mount(<SearchBox {...props} />)
        .instance()
        .handleChange(event);
    });
  });

  describe("handleClear", () => {
    it("calls onClear appropriately", () => {
      mount(<SearchBox {...props} />)
        .instance()
        .handleClear();
      expect(props.onClear).toBeCalled();
    });

    it("calls otherProps.onChange appropriately", () => {
      props.otherProps = { value: "v", onChange: jest.fn() };
      mount(<SearchBox {...props} />)
        .instance()
        .handleClear();
      expect(props.otherProps.onChange).toBeCalledWith({
        target: { value: "" }
      });
    });
  });
});
