/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";
import Router from "next/router";
import { App } from "../../pages/index";
import benefitsFixture from "../fixtures/benefits";
import configureStore from "redux-mock-store";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("Index page", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: key => key,
      translations: [],
      i18n: {
        addResourceBundle: jest.fn()
      }
    };
    mockStore = configureStore();
    reduxData = {
      setPageWidth: jest.fn(),
      pageWidth: 1000,
      translations: [],
      benefits: benefitsFixture,
      enIdx: JSON.stringify({
        version: "2.3.0",
        fields: ["vacNameEn", "oneLineDescriptionEn"],
        fieldVectors: [
          ["vacNameEn/1", [0, 0.288]],
          ["oneLineDescriptionEn/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameEn: {}, oneLineDescriptionEn: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameEn: { "1": {} }, oneLineDescriptionEn: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      frIdx: JSON.stringify({
        version: "2.3.0",
        fields: ["vacNameFr", "oneLineDescriptionFr"],
        fieldVectors: [
          ["vacNameFr/1", [0, 0.288]],
          ["oneLineDescriptionFr/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameFr: {}, oneLineDescriptionFr: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameFr: { "1": {} }, oneLineDescriptionFr: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      option: ""
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<App {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a description", () => {
    const appMounted = mount(<App {...props} {...reduxData} />);
    expect(
      appMounted
        .find("#heroTitle")
        .first()
        .text()
    ).toEqual("index.title");
  });

  it("has a button for the guided experience", () => {
    const appMounted = mount(<App {...props} {...reduxData} />);
    expect(
      appMounted
        .find("#heroGuidedLink")
        .first()
        .text()
    ).toEqual("index.guided experience");
  });

  it("has a Button for the directory", () => {
    const appMounted = mount(<App {...props} {...reduxData} />);
    expect(
      appMounted
        .find("#heroBenefitsLink")
        .first()
        .text()
    ).toEqual("index.all benefits");
  });

  it("has a search component", () => {
    const appMounted = mount(<App {...props} {...reduxData} />);
    expect(appMounted.find("#searchComponent").length).not.toEqual(1);
  });
});
