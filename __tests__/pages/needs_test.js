/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Needs from "../../pages/needs";

describe("Needs", () => {
  it("renders GuidedExperiencePage", async () => {
    expect(shallow(<Needs />).length).toEqual(1);
  });
});
