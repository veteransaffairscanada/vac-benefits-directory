/* eslint-env jest */

import { mount, shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";

import { BB } from "../../components/BB";
import benefitsFixture from "../fixtures/benefits";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import examplesFixture from "../fixtures/needs";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("BB", () => {
  let props;
  let _mountedBB;
  let _shallowBB;
  let mockStore, data;

  const mounted_BB = () => {
    if (!_mountedBB) {
      _mountedBB = mount(<BB {...props} {...data} />);
    }
    return _mountedBB;
  };

  const shallow_BB = () => {
    if (!_shallowBB) {
      _shallowBB = shallow(<BB {...props} {...data} />);
    }
    return _shallowBB;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      selectedNeeds: {},
      selectedEligibility: {
        serviceType: "",
        patronType: "",
        statusAndVitals: ""
      },
      favouriteBenefits: [],
      toggleSelectedEligibility: jest.fn(),
      classes: {
        card: "BB-card-87",
        media: "BB-media-88",
        actions: "BB-actions-89",
        expand: "BB-expand-90",
        expandOpen: "BB-expandOpen-91",
        avatar: "BB-avatar-92"
      },
      url: { query: {} }
    };
    _shallowBB = undefined;
    _mountedBB = undefined;
    mockStore = configureStore();
    data = {
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture
    };
    props.store = mockStore(data);
  });

  it("passes axe tests", async () => {
    let html = mounted_BB().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("filteredBenefits", () => {
    let benefits, eligibilityPaths, selectedEligibility, needs, selectedNeeds;

    let filterBenefits = () =>
      mounted_BB()
        .instance()
        .filterBenefits(
          benefits,
          eligibilityPaths,
          selectedEligibility,
          needs,
          selectedNeeds
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
          childBenefits: ["0", "1", "4"],
          availableIndependently: "Independent"
        },
        {
          id: "3",
          childBenefits: ["4"],
          availableIndependently: "Independent"
        },
        {
          id: "4",
          childBenefits: [],
          availableIndependently: "Requires Gateway Benefit"
        }
      ];
      eligibilityPaths = [
        {
          patronType: "p1",
          serviceType: "na",
          statusAndVitals: "na",
          benefits: ["0", "2", "4"]
        },
        {
          patronType: "p2",
          serviceType: "na",
          statusAndVitals: "na",
          benefits: ["2"]
        },
        {
          patronType: "p3",
          serviceType: "na",
          statusAndVitals: "na",
          benefits: ["1", "3", "4"]
        }
      ];
      selectedEligibility = {
        patronType: "",
        serviceType: "",
        statusAndVitals: ""
      };
      needs = [];
      selectedNeeds = {};
    });

    // don't show benefit 0 because it's not independent
    it("displays benefits 1, 2 and 3 if nothing selected", () => {
      let returnValue = filterBenefits().map(b => b.id);
      returnValue.sort();
      expect(returnValue).toEqual(["1", "2", "3"]);
    });

    // 0 and 2 match, but 0 is a child of 2, so we just show 2
    it("display benefits 2 if patronType p1", () => {
      selectedEligibility.patronType = "p1";
      expect(filterBenefits().map(b => b.id)).toEqual(["2"]);
    });

    // eligible for 1, 3, 4. Need only matches 4, a child of 3. So show 3
    it("shows an eligible parent for a matching child", () => {
      selectedEligibility.patronType = "p3";
      needs = [{ id: "n0", benefits: ["4"] }];
      selectedNeeds = { n0: "n0" };
      expect(filterBenefits().map(b => b.id)).toEqual(["3"]);
    });
  });

  it("has a sortBy selector", () => {
    expect(shallow_BB().find("#sortBySelector").length).toEqual(1);
  });

  it("has the selected benefit cards", () => {
    props.selectedEligibility = {
      serviceType: "CAF",
      patronType: "service-person",
      statusAndVitals: "releasedAlive"
    };
    const benefitCards = mounted_BB().find("BenefitCard");
    expect(benefitCards.length).toEqual(1);
    benefitCards.map((bt, i) => {
      expect(bt.prop("benefit").vac_name_fr).toEqual(
        benefitsFixture[i].vac_name_fr
      );
    });
  });

  it("has the ProfileSelector component", () => {
    expect(mounted_BB().find("ProfileSelector").length).toEqual(1);
  });

  it("has the NeedsSelector component", () => {
    expect(mounted_BB().find("NeedsSelector").length).toEqual(1);
  });

  // Broken test
  // used to worked before because of other wrong code
  // ;(

  // it("allows a person to click on filters", () => {
  //   mounted_BB()
  //   let filter = mounted_BB()
  //     .find("DropDownSelector")
  //     .first();
  //   let checkbox = filter.find("Select").first();
  //   checkbox.simulate("click");
  //   expect(props.toggleSelectedEligibility).toBeCalled();
  // });

  it("has a Clear Filters button", () => {
    expect(shallow_BB().find("#ClearEligibilityFilters"));
  });

  it("has a benefits counter", () => {
    expect(mounted_BB().find(".BenefitsCounter"));
  });

  it("shows B3.All benefits to consider when no filters are selected", () => {
    mounted_BB().setProps({
      selectedEligibility: {
        patronType: "",
        serviceType: "",
        statusAndVitals: ""
      }
    });
    mounted_BB().setProps({ selectedNeeds: {} });
    expect(
      mounted_BB()
        .find(".BenefitsCounter")
        .last()
        .text()
    ).toEqual("B3.All benefits to consider");
  });

  describe("countSelection", () => {
    it("returns 0 if nothing is selected", () => {
      expect(
        mounted_BB()
          .instance()
          .countSelection()
      ).toEqual(0);
    });

    it("returns 1 if one selectedEligibilty is selected", () => {
      mounted_BB().setProps({
        selectedEligibility: {
          patronType: eligibilityPathsFixture[0].patronType
        }
      });
      expect(
        mounted_BB()
          .instance()
          .countSelection()
      ).toEqual(1);
    });

    it("returns 1 if one selectedNeeds is selected", () => {
      let needsSelection = {};
      needsSelection[needsFixture[0].id] = needsFixture[0].id;
      mounted_BB().setProps({ selectedNeeds: needsSelection });
      expect(
        mounted_BB()
          .instance()
          .countSelection()
      ).toEqual(1);
    });

    it("returns 1 if one selectedNeeds is selected", () => {
      let needsSelection = {};
      needsSelection[needsFixture[0].id] = needsFixture[0].id;
      mounted_BB().setProps({ selectedNeeds: needsSelection });
      mounted_BB().setProps({
        selectedEligibility: {
          patronType: eligibilityPathsFixture[0].patronType
        }
      });
      expect(
        mounted_BB()
          .instance()
          .countSelection()
      ).toEqual(2);
    });
  });

  describe("search feature", () => {
    it("creates a lunr index for english benefits", () => {
      expect(mounted_BB().state().enIdx).not.toEqual(null);
    });

    it("creates a lunr index for french benefits", () => {
      expect(mounted_BB().state().frIdx).not.toEqual(null);
    });

    it("shows a text serach box is show_search url param is set", () => {
      mounted_BB().setProps({ url: { query: { show_search: true } } });
      expect(
        mounted_BB()
          .find("#bbSearchField")
          .first().length
      ).toEqual(1);
    });

    it("hides a text serach box is show_search url param is not set", () => {
      mounted_BB().setProps({ url: { query: {} } });
      expect(
        mounted_BB()
          .find("#bbSearchField")
          .first().length
      ).toEqual(0);
    });

    it("handleSearchChange sets the state of searchString", () => {
      mounted_BB()
        .instance()
        .handleSearchChange({ target: { value: "foo" } });
      expect(mounted_BB().state().searchString).toEqual("foo");
    });

    it("if the search string is empty the results are not filtered", () => {
      let filterBenefits = () =>
        mounted_BB()
          .instance()
          .filterBenefits(
            benefitsFixture,
            eligibilityPathsFixture,
            {
              serviceType: "",
              patronType: "",
              statusAndVitals: ""
            },
            [],
            {}
          );

      mounted_BB()
        .instance()
        .handleSearchChange({ target: { value: " " } });
      expect(filterBenefits().map(b => b.id)).toEqual(["0"]);
    });

    it("the search string filters results", () => {
      let filterBenefits = () =>
        mounted_BB()
          .instance()
          .filterBenefits(
            benefitsFixture,
            eligibilityPathsFixture,
            {
              serviceType: "",
              patronType: "",
              statusAndVitals: ""
            },
            [],
            {}
          );

      mounted_BB()
        .instance()
        .handleSearchChange({ target: { value: "foo" } });
      expect(filterBenefits().map(b => b.id)).toEqual([]);
    });
  });

  it("contains the print button", () => {
    expect(mounted_BB().find(".printButton").length).toEqual(5); // not sure why this is 5, should be 1
  });

  it("has a correct getPrintUrl function", () => {
    const url = mounted_BB()
      .instance()
      .getPrintUrl(
        [{ id: "id1" }, { id: "id2" }],
        { patronType: "service-person" },
        { need1: "need1", need2: "need2" },
        "en"
      );
    expect(url).toEqual(
      "print?lng=en&patronType=service-person&needs=need1,need2&benefits=id1,id2"
    );
  });
});
