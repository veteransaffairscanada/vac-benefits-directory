import React from "react";
import { mount } from "enzyme";
import Router from "next/router";
import HeaderButton from "../../components/header_button";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("HeaderButton", () => {
  let props;
  beforeEach(() => {
    window.open = jest.fn();
    Router.push = jest.fn();
    window.location.assign = jest.fn();
    props = {
      children: "header"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<HeaderButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows children", () => {
    expect(mount(<HeaderButton {...props} />).text()).toEqual("header");
  });

  describe("buttonOnClick function", () => {
    let buttonOnClick, event, href, target, useLink, onClick;
    beforeEach(() => {
      buttonOnClick = mount(<HeaderButton {...props} />).instance()
        .buttonOnClick;
      event = undefined;
      href = undefined;
      target = undefined;
      useLink = false;
      onClick = jest.fn();
    });

    describe("if href is set", () => {
      beforeEach(() => {
        href = "href";
      });

      it("calls window.location.assign if neither target nor useLink is set", () => {
        buttonOnClick(event, href, target, useLink, onClick);
        expect(window.location.assign).toBeCalledWith(href);
      });

      it("calls window.open if target is set", () => {
        target = "target";
        buttonOnClick(event, href, target, useLink, onClick);
        expect(window.open).toBeCalledWith(href, target);
      });

      it("calls Router.push if useLink is set", () => {
        useLink = true;
        buttonOnClick(event, href, target, useLink, onClick);
        expect(Router.push).toBeCalledWith(href);
      });
    });

    it("calls onClick if onClick is defined", () => {
      event = "event";
      buttonOnClick(event, href, target, useLink, onClick);
      expect(onClick).toBeCalledWith("event");
    });
  });
});
