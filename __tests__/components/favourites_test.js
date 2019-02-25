/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";
import { Favourites } from "../../components/favourites";
import benefitsFixture from "../fixtures/benefits";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import questionsFixture from "../fixtures/questions";
import needsFixture from "../fixtures/needs";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import nextStepsFixture from "../fixtures/nextSteps";
import Cookies from "universal-cookie";
import benefitExamplesFixture from "../fixtures/benefitExamples";
import translateFixture from "../fixtures/translate";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Favourites", () => {
  let props;
  let _mountedFavourites;
  let _shallowFavourites;
  let mockStore, reduxData;

  const mountedFavourites = () => {
    if (!_mountedFavourites) {
      _mountedFavourites = mount(<Favourites {...props} {...reduxData} />);
    }
    return _mountedFavourites;
  };

  const shallowFavourites = () => {
    if (!_shallowFavourites) {
      _shallowFavourites = shallow(<Favourites {...props} {...reduxData} />);
    }
    return _shallowFavourites;
  };

  beforeEach(() => {
    window.scrollTo = jest.fn();
    props = {
      t: translateFixture,
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      url: { query: {} },
      homeUrl: "/",
      saveFavourites: jest.fn()
    };
    _shallowFavourites = undefined;
    _mountedFavourites = undefined;

    mockStore = configureStore();
    reduxData = {
      nextSteps: nextStepsFixture,
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      benefits: benefitsFixture,
      needs: needsFixture,
      questions: questionsFixture,
      favouriteBenefits: ["benefit_2"],
      selectedNeeds: {},
      benefitEligibility: benefitEligibilityFixture,
      benefitExamples: benefitExamplesFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      searchString: ""
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedFavourites().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("displays only one benefit", async () => {
    expect(mountedFavourites().find("BenefitCard").length).toEqual(1);
    expect(
      mountedFavourites()
        .find("BenefitCard")
        .first()
        .props().benefit.id
    ).toEqual("benefit_2");
  });

  it("renders with no favourites", async () => {
    reduxData.favouriteBenefits = [];
    props.store = mockStore(reduxData);
    expect(mountedFavourites().find("BenefitCard").length).toEqual(0);
  });

  it("renders with 2 favourites", async () => {
    reduxData.favouriteBenefits = ["benefit_0", "benefit_3"];
    props.store = mockStore(reduxData);
    expect(mountedFavourites().find("BenefitCard").length).toEqual(2);
  });

  it("renders BreadCrumbs", async () => {
    expect(mountedFavourites().find("BreadCrumbs").length).toEqual(1);
  });

  it("has a working filterBenefits function", async () => {
    const favouritesInstance = shallowFavourites().instance();
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, []).length
    ).toEqual(0);
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, ["benefit_0"]).length
    ).toEqual(1);
    expect(
      favouritesInstance.filterBenefits(benefitsFixture, [
        "benefit_1",
        "benefit_3"
      ]).length
    ).toEqual(2);
  });

  describe("cookies tests", () => {
    let cookiesInstance;
    let cookies = new Cookies();
    beforeEach(() => {
      cookies.set("favouriteBenefits", ["benefit_2", "benefit_5"]);
      cookiesInstance = mount(
        <Favourites {...props} {...reduxData} />
      ).instance();
    });
    it("updates cookie data when a benefit has been deleted", () => {
      expect(cookiesInstance.cookies.get("favouriteBenefits")).toEqual([
        "benefit_2"
      ]);
    });
  });
});
