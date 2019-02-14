/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import StatusAndVitals from "../../pages/statusAndVitals";

describe("StatusAndVitals", () => {
  it("renders GuidedExperiencePage", async () => {
    expect(shallow(<StatusAndVitals />).length).toEqual(1);
  });
});
