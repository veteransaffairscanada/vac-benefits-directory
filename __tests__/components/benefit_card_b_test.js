import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";

import { BenefitCardB } from "../../components/benefit_cards_b";
import benefitsFixture from "../fixtures/benefits";
import examplesFixture from "../fixtures/examples";
import needsFixture from "../fixtures/needs";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("BenefitCardB", () => {
  let props;
  let mockStore, reduxData;
  let _mountedBenefitCard, _shallowBenefitCard;
  const mountedBenefitCard = () => {
    if (!_mountedBenefitCard) {
      _mountedBenefitCard = mount(<BenefitCardB {...props} {...reduxData} />);
    }
    return _mountedBenefitCard;
  };
  const shallowBenefitCard = () => {
    if (!_shallowBenefitCard) {
      _shallowBenefitCard = shallow(<BenefitCardB {...props} {...reduxData} />);
    }
    return _shallowBenefitCard;
  };

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: benefitsFixture[0],
      allBenefits: benefitsFixture,
      veteranBenefitIds: [],
      familyBenefitIds: [],
      classes: {},
      onRef: foo => foo,
      searchString: "",
      favouriteBenefits: [],
      showFavourite: true
    };
    mockStore = configureStore();
    reduxData = {
      examples: examplesFixture,
      needs: needsFixture,
      selectedNeeds: {},
      benefits: benefitsFixture,
      favouriteBenefits: []
    };
    props.store = mockStore(reduxData);

    _mountedBenefitCard = undefined;
    _shallowBenefitCard = undefined;
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedBenefitCard().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the name", () => {
    expect(mountedBenefitCard().text()).toContain(benefitsFixture[0].vacNameEn);
  });

  it("contains the description", () => {
    expect(
      mountedBenefitCard()
        .find(".cardDescription")
        .first()
        .text()
    ).toEqual(benefitsFixture[0].oneLineDescriptionEn);
  });

  it("renders if there are examples", () => {
    props.t = key => key;
    props.benefit = benefitsFixture[1];
    expect(mountedBenefitCard().html()).toContain("examples:");
  });

  it("renders if there are no examples", () => {
    props.t = key => key;
    props.benefit = benefitsFixture[0];
    expect(mountedBenefitCard().html()).not.toContain("examples:");
  });

  it("has a correctly configured button", () => {
    expect(
      mountedBenefitCard()
        .find("Button")
        .prop("target")
    ).toEqual("_blank");
    expect(
      mountedBenefitCard()
        .find("Button")
        .prop("href")
    ).toEqual(benefitsFixture[1].benefitPageEn);
    expect(
      mountedBenefitCard()
        .find("Button")
        .text()
    ).toEqual("en");
  });

  it("hides the Favourite Button if showFavourite is false", () => {
    props.showFavourite = false;
    expect(shallowBenefitCard().find("FavoriteButton").length).toEqual(0);
  });

  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });

    it("contains the French name", () => {
      expect(mountedBenefitCard().text()).toContain(
        benefitsFixture[0].vacNameFr
      );
    });

    it("has a button with the French link", () => {
      expect(
        mountedBenefitCard()
          .find("Button")
          .prop("href")
      ).toEqual(benefitsFixture[1].benefitPageFr);
      expect(
        mountedBenefitCard()
          .find("Button")
          .text()
      ).toEqual("fr");
    });
  });

  it("has a needs tag", () => {
    reduxData.selectedNeeds["0"] = "0";
    expect(mountedBenefitCard().text()).toContain("Need 0");
  });

  it("changes open state when somebody clicks on it", () => {
    expect(mountedBenefitCard().state().open).toEqual(false);
    mountedBenefitCard()
      .find("div > div > div")
      .at(0)
      .simulate("click");
    expect(mountedBenefitCard().state().open).toEqual(true);
  });

  it("Clicking the link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mountedBenefitCard()
      .find("Button")
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      benefitsFixture[0].benefitPageEn
    );
  });
});
