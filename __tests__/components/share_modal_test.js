import React from "react";
import { mount } from "enzyme";
import Router from "next/router";
import ShareModal from "../../components/share_modal";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("ShareModal", () => {
  let props;
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
      children: "header"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<ShareModal {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
