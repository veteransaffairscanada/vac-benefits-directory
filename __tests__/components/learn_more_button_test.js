import React from "react";
import { mount } from "enzyme";
import LearnMoreButton from "../../components/learn_more_button";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("LearnMoreButton", () => {
  let props;
  const mocked_fn = jest.fn();
  mocked_fn.mockReturnValue({ focus: jest.fn() });
  window.open = mocked_fn;

  beforeEach(() => {
    props = {
      benefit: benefitsFixture[0],
      t: () => "en"
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<LearnMoreButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correctly configured external link button", () => {
    let relatedComponent = mount(<LearnMoreButton {...props} />);
    relatedComponent
      .find("Button")
      .at(0)
      .simulate("click");
    expect(window.open).toBeCalledWith(props.benefit.benefitPageEn, "_blank");
    expect(
      relatedComponent
        .find("Button")
        .at(0)
        .text()
    ).toEqual("en");
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
      props.benefit.benefitPageEn
    );
  });
});
