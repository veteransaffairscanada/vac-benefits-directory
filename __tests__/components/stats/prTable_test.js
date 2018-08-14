import React from "react";
import { PrTable } from "../../../components/stats/prTable";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import githubFixture from "../../fixtures/github_data";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("prTable", () => {
  let props;
  let mountedPrTable;
  let mockStore, reduxData;

  const prTable = () => {
    if (!mountedPrTable) {
      mountedPrTable = mount(<PrTable {...props} />);
    }
    return mountedPrTable;
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
    mountedPrTable = undefined;
  });

  // Tests
  it("passes axe tests", async () => {
    let html = prTable().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("filterMerged", () => {
    it("filters out non-merged PRs", () => {
      expect(prTable().props().githubData.pullRequests.length).toEqual(4);
      expect(
        prTable()
          .instance()
          .filterMerged().length
      ).toEqual(3);
    });

    it("sorts merged PRs in ASC order", () => {
      expect(prTable().props().githubData.pullRequests[0].title).toEqual(
        "PR 2"
      );
      expect(
        prTable()
          .instance()
          .filterMerged()[0].title
      ).toEqual("PR 1");
    });
  });

  describe("sortByMergedAt", () => {
    it("return 0 if the dates are the same", () => {
      expect(
        prTable()
          .instance()
          .sortByMergedAt(
            { merged_at: "2000-01-01" },
            { merged_at: "2000-01-01" }
          )
      ).toEqual(0);
    });

    it("return 1 if the first date is larger than the second", () => {
      expect(
        prTable()
          .instance()
          .sortByMergedAt(
            { merged_at: "2000-02-01" },
            { merged_at: "2000-01-01" }
          )
      ).toEqual(1);
    });

    it("return -1 if the first date is less than the second", () => {
      expect(
        prTable()
          .instance()
          .sortByMergedAt(
            { merged_at: "2000-01-01" },
            { merged_at: "2000-02-01" }
          )
      ).toEqual(-1);
    });
  });
});
