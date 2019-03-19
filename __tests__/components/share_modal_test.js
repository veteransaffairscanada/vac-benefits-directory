import React from "react";
import { mount } from "enzyme";
import Router from "next/router";
import ShareModal from "../../components/share_modal";
import ReactModal from "react-modal";

// mock app element to fix warning "App element is not defined"
let app = document.createElement("div");
app.id = "app";

document
  .getElementsByTagName("body")
  .item(0)
  .appendChild(app);

ReactModal.setAppElement("#app");

describe("ShareModal", () => {
  let props;
  process.browser = true;
  // add a div with #modal-root id to the global body
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "main");
  const body = global.document.querySelector("body");
  body.appendChild(modalRoot);
  beforeEach(() => {
    window.open = jest.fn();
    Router.push = jest.fn();
    window.location.assign = jest.fn();
    document.createRange = function() {
      return {
        selectNodeContents: function() {}
      };
    };
    window.getSelection = function() {
      return {
        addRange: function() {},
        removeAllRanges: function() {}
      };
    };
    props = {
      uid: "abc",
      isOpen: true,
      closeModal: jest.fn(),
      t: () => "en",
      url: { url: "test_url" },
      titles: { share: "" },
      share: {
        copy_prompt: "",
        copy_button: ""
      }
    };
  });

  it("closes the model when the close button is clicked", () => {
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    modal.instance().close = jest.fn();
    modal
      .find("button")
      .first()
      .simulate("click");
    expect(modal.instance().close).toBeCalled();
  });

  it("renders when isOpen is true", () => {
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    expect(modal.find("input").length).not.toEqual(0);
  });

  it("doesn't render when isOpen is false", () => {
    let modal = mount(<ShareModal {...props} />);
    expect(modal.find("input").length).not.toEqual(0);
  });

  it("the link is copied when the copy button is clicked - no window.navigator", () => {
    document.execCommand = jest.fn();
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    modal
      .find("button")
      .at(1)
      .simulate("click");
    expect(modal.instance().state.statusMessage).not.toEqual("");
  });

  it("the link is copied when the copy button is clicked on an ios device", () => {
    Object.defineProperty(window.navigator, "userAgent", { value: "iphone" });
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    modal
      .find("button")
      .at(1)
      .simulate("click");
    expect(modal.instance().state.statusMessage).not.toEqual("");
  });

  it("renders when isOpen is true on an iOS device", () => {
    Object.defineProperty(window.navigator, "userAgent", { value: "iphone" });
    window.MSStream = false;
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    expect(modal.find("input").length).not.toEqual(0);
  });

  it("the link is copied when the copy button is clicked", () => {
    Object.defineProperty(window.navigator, "clipboard", {
      value: { writeText: jest.fn() }
    });
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    modal
      .find("button")
      .at(1)
      .simulate("click");
    expect(modal.instance().state.statusMessage).not.toEqual("");
  });

  it("the link copied text is cleared when the modal is closed", () => {
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    modal
      .find("button")
      .at(1)
      .simulate("click");
    modal
      .find("button")
      .first()
      .simulate("click");
    expect(modal.instance().state.statusMessage).toEqual("");
  });

  it("doesn't render when we are on the server", () => {
    process.browser = false;
    let modal = mount(<ShareModal {...props} />);
    expect(modal.html()).toEqual("<div></div>");
  });
});
