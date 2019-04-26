import React from "react";
import { mount } from "enzyme";
import LearnMoreButton from "../../components/learn_more_button";
import benefitsFixture from "../fixtures/benefits";
import translationFixture from "../fixtures/translate";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("LearnMoreButton", () => {
  let props;

  beforeEach(() => {
    props = {
      benefit: benefitsFixture[1],
      t: translationFixture
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
    ).toEqual("Find out more");
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
    const utm =
      "?utm_source=fbas&utm_medium=referral&utm_campaign=learn-more&utm_content=b0_en";
    analytics.logEvent = jest.fn();
    mount(<LearnMoreButton {...props} />)
      .find("Button")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      "learn more",
      props.benefit.benefitPageEn + utm
    );
  });

  it("has a correct aria-label", () => {
    expect(
      mount(<LearnMoreButton {...props} />)
        .find("a")
        .at(0)
        .prop("aria-label")
    ).toEqual("benefits_b.learn_more" + props.benefit.vacNameEn);
  });
});
