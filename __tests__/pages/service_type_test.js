/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import ServiceType from "../../pages/serviceType";

describe("ServiceType", () => {
  it("renders GuidedExperiencePage", async () => {
    expect(shallow(<ServiceType />).length).toEqual(1);
  });
});
