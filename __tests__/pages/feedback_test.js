/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";
import { Feedback } from "../../pages/feedback";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import configureStore from "redux-mock-store";
import translate from "../fixtures/translate";
import Router from "next/router";
import fs from "fs";
const data = JSON.parse(fs.readFileSync("data/data.json"));

jest.mock("react-ga");

describe("Feedback", () => {
  let props;
  let mockStore, reduxData;
  Router.push = jest.fn().mockImplementation(() => new Promise(() => true));

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate,
      url: { query: {}, route: "/feedback" }
    };
    reduxData = {
      questions: data.questions,
      betaFeedback: "your site is awesome",
      multipleChoiceOptions: data.multipleChoiceOptions,
      benefitEligibility: data.benefitEligibility,
      questionDisplayLogic: data.questionDisplayLogic,
      questionClearLogic: data.questionClearLogic
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<Feedback {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains a back button", async () => {
    expect(mount(<Feedback {...props} {...reduxData} />).text()).toContain(
      "back"
    );
  });
  it("contains the RadioSelector component", async () => {
    expect(
      mount(<Feedback {...props} {...reduxData} />).find("RadioSelector").length
    ).toEqual(1);
  });
  it("contains a send button", async () => {
    expect(mount(<Feedback {...props} {...reduxData} />).text()).toContain(
      "send"
    );
  });
  it("clicking send navigates to the feedback_submitted page", () => {
    mount(<Feedback {...props} {...reduxData} />)
      .find("#send")
      .first()
      .simulate("click");
    expect(Router.push).toBeCalledWith({
      pathname: "/feedback_submitted",
      query: {}
    });
  });
  it("contains the details component", async () => {
    expect(
      mount(<Feedback {...props} {...reduxData} />).find("Details").length
    ).toEqual(1);
  });
});
