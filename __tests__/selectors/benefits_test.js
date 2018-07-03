import { getFilteredBenefits } from "../../selectors/benefits";

describe("getFilteredBenefits", () => {
  let state;

  beforeEach(() => {
    state = {
      benefits: [
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
      ],
      eligibilityPaths: [
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
      ],
      needs: [],
      selectedNeeds: {},
      patronType: "",
      serviceType: "",
      statusAndVitals: ""
    };
  });

  // don't show benefit 0 because it's not independent
  it("displays benefits 1, 2 and 3 if nothing selected", () => {
    let returnValue = getFilteredBenefits(state).map(b => b.id);
    returnValue.sort();
    expect(returnValue).toEqual(["1", "2", "3"]);
  });

  // 0 and 2 match, but 0 is a child of 2, so we just show 2
  it("display benefits 2 if patronType p1", () => {
    state.patronType = "p1";
    expect(getFilteredBenefits(state).map(b => b.id)).toEqual(["2"]);
  });

  // eligible for 1, 3, 4. Need only matches 4, a child of 3. So show 3
  it("shows an eligible parent for a matching child", () => {
    state.patronType = "p3";
    state.needs = [{ id: "n0", benefits: ["4"] }];
    state.selectedNeeds = { n0: "n0" };
    expect(getFilteredBenefits(state).map(b => b.id)).toEqual(["3"]);
  });
});
