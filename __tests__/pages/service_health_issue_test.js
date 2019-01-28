/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import ServiceHealthIssue from "../../pages/serviceHealthIssue";

describe("ServiceHealthIssue", () => {
  it("renders GuidedExperiencePage", async () => {
    expect(shallow(<ServiceHealthIssue />).length).toEqual(1);
  });
});
