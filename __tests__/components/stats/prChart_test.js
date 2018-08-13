import React from "react";
import { PrChart } from "../../../components/stats/prChart";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import githubFixture from "../../fixtures/github_data";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("prChart", () => {
  let props;
  let mountedPrChart;
  let mockStore, reduxData;

  const prChart = () => {
    if (!mountedPrChart) {
      mountedPrChart = mount(<PrChart {...props} />);
    }
    return mountedPrChart;
  };

  beforeEach(() => {
    props = {
      classes: {},
      githubData: githubFixture,
      t: key => key
    };
    reduxData = {
      githubData: githubFixture
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
    mountedPrChart = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = prChart().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("chartConfig", () => {
    it("returns an object to configure a highchart", () => {
      expect(
        typeof prChart()
          .instance()
          .chartConfig()
      ).toEqual("object");
    });
  });

  describe("filterMerged", () => {
    it("filters out non-merged PRs", () => {
      expect(prChart().props().githubData.pullRequests.length).toEqual(4);
      expect(
        prChart()
          .instance()
          .filterMerged().length
      ).toEqual(3);
    });

    it("sorts merged PRs in ASC order", () => {
      expect(prChart().props().githubData.pullRequests[0].title).toEqual(
        "PR 2"
      );
      expect(
        prChart()
          .instance()
          .filterMerged()[0].title
      ).toEqual("PR 1");
    });
  });

  describe("maxValue", () => {
    it("returns the maximum number of PRs per day in data set", () => {
      expect(
        prChart()
          .instance()
          .maxValue()
      ).toEqual(2);
    });
  });

  describe("prData", () => {
    it("returns an array of time stamps between the start and an end date", () => {
      expect(
        prChart()
          .instance()
          .prData().length
      ).toEqual(3);
    });

    it("shows value per date", () => {
      let result = prChart()
        .instance()
        .prData();
      expect(result[0][1]).toEqual(1);
      expect(result[1][1]).toEqual(0);
      expect(result[2][1]).toEqual(2);
    });
  });

  describe("releaseData", () => {
    it("returns an array of object representing release dates", () => {
      expect(
        prChart()
          .instance()
          .releaseData()[0].tag
      ).toEqual("release1");
    });
  });

  describe("sortByMergedAt", () => {
    it("return 0 if the dates are the same", () => {
      expect(
        prChart()
          .instance()
          .sortByMergedAt(
            { merged_at: "2000-01-01" },
            { merged_at: "2000-01-01" }
          )
      ).toEqual(0);
    });

    it("return 1 if the first date is larger than the second", () => {
      expect(
        prChart()
          .instance()
          .sortByMergedAt(
            { merged_at: "2000-02-01" },
            { merged_at: "2000-01-01" }
          )
      ).toEqual(1);
    });

    it("return -1 if the first date is less than the second", () => {
      expect(
        prChart()
          .instance()
          .sortByMergedAt(
            { merged_at: "2000-01-01" },
            { merged_at: "2000-02-01" }
          )
      ).toEqual(-1);
    });
  });
});
