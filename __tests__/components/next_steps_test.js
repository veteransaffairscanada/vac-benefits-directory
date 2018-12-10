import React from "react";
import NextSteps from "../../components/next_steps";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("NextSteps", () => {
  let props;
  let mockStore, reduxState;
  beforeEach(() => {
    props = {
      t: translate,
      mapUrl: { query: {}, route: "/map" }
    };

    mockStore = configureStore();
    reduxState = {};
    props.store = mockStore(reduxState);
    props.reduxState = reduxState;
  });

  it("passes axe tests", async () => {
    let html = mount(<NextSteps {...props} {...reduxState} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
