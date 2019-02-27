import React from "react";
import MyVacButton from "../../components/myvac_button";
import { mount } from "enzyme";
import translate from "../fixtures/translate";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
jest.mock("react-ga");

describe("MyVacButton", () => {
  let props;

  beforeEach(() => {
    props = {
      i18n: {
        changeLanguage: () => {}
      },
      t: translate
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<MyVacButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
