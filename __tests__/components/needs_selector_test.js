import React from "react";
import { mount } from "enzyme";
import { NeedsSelector } from "../../components/needs_selector";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

jest.unmock("../../utils/common");
const common = require.requireActual("../../utils/common");

describe("NeedsSelector", () => {
  let props;
  let _mountedNeedsSelector, mockStore, reduxData;

  const mountedNeedsSelector = () => {
    if (!_mountedNeedsSelector) {
      _mountedNeedsSelector = mount(
        <NeedsSelector {...props} {...reduxData} />
      );
    }
    return _mountedNeedsSelector;
  };

  beforeEach(() => {
    window.scrollTo = jest.fn();
    props = {
      theme: {},
      t: key => key,
      saveQuestionResponse: jest.fn()
    };
    reduxData = {
      needs: needsFixture,
      selectedNeeds: {},
      setSelectedNeeds: jest.fn(),
      pageWidth: 1000
    };
    props.reduxState = reduxData;
    mockStore = configureStore();
    props.store = mockStore(reduxData);
    _mountedNeedsSelector = undefined;
  });

  it("passes axe tests", async () => {
    let html = mountedNeedsSelector().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has the exact number of children as passed", () => {
    const select = mountedNeedsSelector().find("NeedButton");
    expect(select.length).toEqual(needsFixture.length);
  });

  it("works if needs haven't loaded yet", () => {
    reduxData.needs = [];
    reduxData.selectedNeeds = { need: "need" };
    props.store = mockStore(reduxData);
    expect(mountedNeedsSelector());
  });

  it("works if language is en", () => {
    props.t = () => "en";
    expect(mountedNeedsSelector());
  });

  describe("componentDidUpdate", () => {
    it("clears selectedNeeds if hidden", () => {
      common.showQuestion = jest.fn(() => false);
      reduxData.selectedNeeds = { need: "need" };
      const needsSelector = mount(
        <NeedsSelector {...props} {...reduxData} />
      ).instance();
      needsSelector.componentDidUpdate();
      expect(props.saveQuestionResponse).toBeCalledWith("selectedNeeds", {});
    });
  });
});
