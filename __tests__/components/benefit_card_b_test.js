import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";

import { BenefitCardB } from "../../components/benefit_cards_b";
import benefitsFixture from "../fixtures/benefits";
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

  it("has a correctly configured external link button", () => {
    expect(
      mountedBenefitCard()
        .find("Button")
        .at(1)
        .prop("target")
    ).toEqual("_blank");
    expect(
      mountedBenefitCard()
        .find("Button")
        .at(1)
        .prop("href")
    ).toEqual(benefitsFixture[1].benefitPageEn);
    expect(
      mountedBenefitCard()
        .find("Button")
        .at(1)
        .text()
    ).toEqual("en");
  });

  it("hides the Favourite Button if showFavourite is false", () => {
    props.showFavourite = false;
    expect(shallowBenefitCard().find("FavoriteButton").length).toEqual(0);
  });

  it("shows a child benefit title if the benefit has a child", () => {
    expect(
      mountedBenefitCard()
        .find("Paper")
        .first()
        .text()
    ).toContain("en");
  });

  describe(".benefitTitle", () => {
    it("returns the title of a card in english", () => {
      expect(
        mountedBenefitCard()
          .instance()
          .benefitTitle(benefitsFixture[0])
      ).toEqual(benefitsFixture[0].vacNameEn);
    });

    it("returns the title of a card in french", () => {
      props.t = () => "fr";
      expect(
        mountedBenefitCard()
          .instance()
          .benefitTitle(benefitsFixture[0])
      ).toEqual(benefitsFixture[0].vacNameFr);
    });
  });

  describe(".parentBenefitNames", () => {
    it("returns the title of a benefit if there is one benefit", () => {
      expect(
        mountedBenefitCard()
          .instance()
          .parentBenefitNames([benefitsFixture[0]])
      ).toContain("en");
    });

    it("returns the titles of benefits if there are more than one", () => {
      expect(
        mountedBenefitCard()
          .instance()
          .parentBenefitNames([benefitsFixture])
      ).toContain("en");
    });
  });

  describe(".childBenefitNames", () => {
    it("returns the title of a benefit if there is one benefit", () => {
      expect(
        mountedBenefitCard()
          .instance()
          .childBenefitNames(benefitsFixture[0], benefitsFixture[0], false)
      ).toContain("en");
    });

    it("returns the count of benefits if there is more than one", () => {
      expect(
        mountedBenefitCard()
          .instance()
          .childBenefitNames(benefitsFixture[0], [benefitsFixture], false)
      ).toContain("en");
    });
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
          .at(1)
          .prop("href")
      ).toEqual(benefitsFixture[1].benefitPageFr);
      expect(
        mountedBenefitCard()
          .find("Button")
          .at(1)
          .text()
      ).toEqual("fr");
    });

    it("shows a child benefit title if the benefit has a child", () => {
      expect(
        mountedBenefitCard()
          .find("Paper")
          .first()
          .text()
      ).toContain("fr");
    });
  });

  it("has a needs tag", () => {
    reduxData.selectedNeeds["0"] = "0";
    expect(mountedBenefitCard().text()).toContain("Need 0");
  });

  it("changes open state when somebody clicks on it", () => {
    expect(mountedBenefitCard().state().open).toEqual(false);
    mountedBenefitCard()
      .find("ExpansionPanelSummary")
      .at(0)
      .simulate("click");
    expect(mountedBenefitCard().state().open).toEqual(true);
  });

  it("Clicking the link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mountedBenefitCard()
      .find("Button")
      .at(1)
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      benefitsFixture[0].benefitPageEn
    );
  });
});
