import React from "react";
import { mount } from "enzyme";
import LearnMoreButton from "../../components/learn_more_button";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("LearnMoreButton", () => {
  let props;

  beforeEach(() => {
    props = {
      benefit: benefitsFixture[1],
      t: () => "en"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<LearnMoreButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has correct English text", () => {
    expect(
      mount(<LearnMoreButton {...props} />)
        .find("Button")
        .at(0)
        .text()
    ).toEqual("en");
  });

  it("has correct French text", () => {
    props.t = () => "fr";
    expect(
      mount(<LearnMoreButton {...props} />)
        .find("Button")
        .at(0)
        .text()
    ).toEqual("fr");
  });

  it("Clicking the link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mount(<LearnMoreButton {...props} />)
      .find("Button")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      "learn more",
      props.benefit.benefitPageEn
    );
  });
});
