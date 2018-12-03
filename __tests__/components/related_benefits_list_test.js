import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import { RelatedBenefits } from "../../components/related_benefits_list";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("CardFooter", () => {
  let props;
  let mockStore, reduxData;
  const mocked_fn = jest.fn();
  mocked_fn.mockReturnValue({ focus: jest.fn() });
  window.open = mocked_fn;

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: benefitsFixture[0]
    };
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      eligibilityPaths: eligibilityPathsFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture
    };
    props.store = mockStore(reduxData);

    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<RelatedBenefits {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("shows a child benefit title if the benefit has a child", () => {
    let related = mount(<RelatedBenefits {...props} {...reduxData} />);
    console.log(props.benefit.childBenefits);
    console.log(related.html());
    expect(
      related
        .find("ul")
        .childAt(0)
        .text()
    ).toContain("en");
  });

  it("Clicking the link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mount(<RelatedBenefits {...props} {...reduxData} />)
      .find("Button")
      .at(0)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      benefitsFixture[0].benefitPageEn
    );
  });
  /*
  describe(".childBenefitNames", () => {
    it("returns the title of a benefit if there is one benefit", () => {
      expect(
        mount(<RelatedBenefits {...props} {...reduxData} />)
          .instance()
          .childBenefitNames(benefitsFixture[0], benefitsFixture[0], false)
      ).toContain("en");
    });

    it("returns the count of benefits if there is more than one", () => {
      expect(
        mount(<RelatedBenefits {...props} {...reduxData} />)
          .instance()
          .childBenefitNames(benefitsFixture[0], [benefitsFixture], false)
      ).toContain("en");
    });
  });
*/
  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });

    it("shows a child benefit title if the benefit has a child", () => {
      expect(
        mount(<RelatedBenefits {...props} {...reduxData} />)
          .find("li")
          .first()
          .text()
      ).toContain("fr");
    });
  });

  /* MOVE TO BENEFIT CARDS
  it("changes open state when somebody clicks on it", () => {
    let mounted = mount(<RelatedBenefits {...props} {...reduxData} />);
    expect(mounted.state().open).toEqual(false);
    mounted
      .find("ExpansionPanelSummary")
      .at(0)
      .simulate("click");
    expect(mounted.state().open).toEqual(true);
  });
  */

  describe("getBenefitIds", () => {
    it("finds service person and family benefits", () => {
      expect(
        mount(<RelatedBenefits {...props} {...reduxData} />)
          .instance()
          .getBenefitIds(
            reduxData.eligibilityPaths,
            ["mco_p2", "mco_p3"],
            ["mco_p2"]
          )
      ).toEqual({
        veteran: new Set(["benefit_1", "benefit_2", "benefit_3"]),
        family: new Set(["benefit_2"])
      });
    });
  });

  it("has a correct getMatchingBenefits function", () => {
    expect(
      mount(<RelatedBenefits {...props} {...reduxData} />)
        .instance()
        .getMatchingBenefits(
          reduxData.benefits,
          new Set(["benefit_1", "benefit_99"])
        )
    ).toEqual([reduxData.benefits[1]]);
  });
});
