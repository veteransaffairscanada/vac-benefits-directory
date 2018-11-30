import React from "react";
import { mount } from "enzyme";
import Router from "next/router";
import ShareModal from "../../components/share_modal";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

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
    props = {
      isOpen: true,
      closeModal: jest.fn(),
      t: () => "en",
      url: "test_url",
      titles: { share: "" },
      share: {
        copy_prompt: "",
        copy_button: ""
      }
    };
  });

  // mock copyText function and test that it fired

  it("passes axe tests", async () => {
    let html = mount(<ShareModal {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("closes the model when the close button is clicked", () => {
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    modal.instance().close = jest.fn();
    modal
      .find("#modalCloseButton")
      .first()
      .simulate("click");
    expect(modal.instance().close).toBeCalled();
  });

  it("renders when isOpen is true", () => {
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    expect(modal.find("#shareTarget").length).not.toEqual(0);
  });

  it("doesn't render when isOpen is false", () => {
    let modal = mount(<ShareModal {...props} />);
    expect(modal.find("#shareTarget").length).not.toEqual(0);
  });

  it("the link to be copied when the copy button is clicked", () => {
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    modal
      .find("#copyButton")
      .first()
      .simulate("click");
    expect(modal.instance().state.statusMessage).not.toEqual("");
  });

  it("the link copied text is cleared when the modal is closed", () => {
    let modal = mount(<ShareModal {...props} />);
    modal.setState({ isOpen: true });
    modal
      .find("#copyButton")
      .first()
      .simulate("click");
    modal
      .find("#modalCloseButton")
      .first()
      .simulate("click");
    expect(modal.instance().state.statusMessage).toEqual("");
  });
});
