/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import { Index } from "../../pages/index";

describe("Index", () => {
  it("renders GuidedExperiencePage", async () => {
    expect(shallow(<Index />).length).toEqual(1);
  });
});
