/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";

import { BB } from "../../components/BB";
import benefitsFixture from "../fixtures/benefits";
import elegibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";

jest.mock("react-ga");

describe("BB", () => {
  let props;
  let _mountedBB;
  let _shallowBB;

  const mounted_BB = () => {
    if (!_mountedBB) {
      _mountedBB = mount(<BB {...props} />);
    }
    return _mountedBB;
  };

  const shallow_BB = () => {
    if (!_shallowBB) {
      _shallowBB = shallow(<BB {...props} />);
    }
    return _shallowBB;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      benefits: benefitsFixture,
      eligibilityPaths: elegibilityPathsFixture,
      selectedNeeds: {},
      needs: [],
      examples: [],
      selectedEligibility: {
        serviceType: {},
        serviceStatus: {},
        patronType: {},
        servicePersonVitalStatus: {}
      },
      toggleSelectedEligibility: jest.fn(),
      classes: {
        card: "BB-card-87",
        media: "BB-media-88",
        actions: "BB-actions-89",
        expand: "BB-expand-90",
        expandOpen: "BB-expandOpen-91",
        avatar: "BB-avatar-92"
      }
    };
    _shallowBB = undefined;
  });

  describe("filteredBenefits", () => {
    let benefits, eligibilityPaths, selectedEligibility;

    let filteredBenefits = () =>
      mounted_BB()
        .instance()
        .filteredBenefits(
          benefits,
          eligibilityPaths,
          selectedEligibility,
          [],
          {}
        );

    beforeEach(() => {
      benefits = [
        {
          id: "0",
          childBenefits: [],
          availableIndependently: "Requires Gateway Benefit"
        },
        {
          id: "1",
          childBenefits: [],
          availableIndependently: "Independent"
        },
        {
          id: "2",
          childBenefits: ["0", "1"],
          availableIndependently: "Independent"
        },
        {
          id: "3",
          childBenefits: [],
          availableIndependently: "Independent"
        }
      ];
      eligibilityPaths = [
        {
          patronType: "p1",
          serviceType: "na",
          servicePersonVitalStatus: "na",
          serviceStatus: "na",
          benefits: ["0"]
        },
        {
          patronType: "p2",
          serviceType: "na",
          servicePersonVitalStatus: "na",
          serviceStatus: "na",
          benefits: ["2"]
        },
        {
          patronType: "p3",
          serviceType: "na",
          servicePersonVitalStatus: "na",
          serviceStatus: "na",
          benefits: ["1", "3"]
        }
      ];
      selectedEligibility = {
        patronType: {},
        serviceType: {},
        serviceStatus: {},
        servicePersonVitalStatus: {}
      };
    });

    // don't show benefit 0 because it's not independent
    it("displays benefits 1, 2 and 3 if nothing selected", () => {
      expect(filteredBenefits().map(b => b.id)).toEqual(["1", "2", "3"]);
    });

    // only 0 matches, but it's a child of 2, so we show 2
    it("display benefits 2 if patronType p1", () => {
      selectedEligibility.patronType = { p1: "p1" };
      expect(filteredBenefits().map(b => b.id)).toEqual(["2"]);
    });
  });

  it("has a correct sortBenefits function", () => {
    let BBInstance = shallow_BB().instance();
    // console.log(BBInstance.sortBenefits(benefitsFixture, "en"))
    expect(BBInstance.sortBenefits(benefitsFixture, "en")[0]).toEqual(
      benefitsFixture.filter(o => {
        return o.id === "3";
      })[0]
    );
  });

  it("has a serviceTypes filter", () => {
    expect(shallow_BB().find("#serviceTypeFilter").length).toEqual(1);
  });
  it("has a patronType filter", () => {
    expect(shallow_BB().find("#patronTypeFilter").length).toEqual(1);
  });

  it("has the filters contained in a collapse component", () => {
    expect(
      shallow_BB()
        .find("#collapseBlock")
        .find("#serviceTypeFilter").length
    ).toEqual(1);
    expect(
      shallow_BB()
        .find("#collapseBlock")
        .find("#patronTypeFilter").length
    ).toEqual(1);
  });

  it("has the filter initially expanded", () => {
    expect(shallow_BB().state().expanded).toEqual(true);
  });

  it("has a button to collapse / expand the filter", () => {
    shallow_BB()
      .find("#expandButton")
      .simulate("click");
    expect(shallow_BB().state().expanded).toEqual(false);
    shallow_BB()
      .find("#expandButton")
      .simulate("click");
    expect(shallow_BB().state().expanded).toEqual(true);
  });

  it("has the selected benefit cards", () => {
    props.selectedEligibility = {
      serviceType: { CAF: 1 },
      serviceStatus: { released: 1 },
      patronType: { ["service-person"]: 1 },
      servicePersonVitalStatus: { alive: 1 }
    };
    const benefitCards = shallow_BB().find(".BenefitCards");
    expect(benefitCards.length).toEqual(1);
    benefitCards.map((bt, i) => {
      expect(bt.prop("benefit").vac_name_fr).toEqual(
        benefitsFixture[i].vac_name_fr
      );
    });
  });

  it("allows a person to click on filters", () => {
    let filter = mounted_BB()
      .find("DropDownSelector")
      .first();

    console.log(filter.html());
    let checkbox = filter.find("Select").first();

    console.log(checkbox.html());

    checkbox.simulate("click");

    expect(props.toggleSelectedEligibility).toBeCalled();
  });

  it("has a Clear Filters button", () => {
    expect(shallow_BB().find("#ClearFilters"));
  });

  it("has a benefits counter", () => {
    expect(mounted_BB().find(".BenefitsCounter"));
  });
});
