import React from "react";
import { mount } from "enzyme";
import { FavouriteButton } from "../../components/favourite_button";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("FavouriteButton", () => {
  let props;

  beforeEach(() => {
    props = {
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      t: key => key,
      favouriteBenefits: ["benefit_0"],
      saveFavourites: jest.fn(),
      benefit: benefitsFixture[1],
      toggleOpenState: jest.fn()
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<FavouriteButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("calls toggleFavourite if favourite button pressed", () => {
    mount(<FavouriteButton {...props} />)
      .find("HeaderButton")
      .simulate("click");
    expect(props.toggleOpenState).toBeCalled();
  });

  it("is favourited if in list", () => {
    let mounted = mount(<FavouriteButton {...props} />);
    expect(mounted.find("span").html()).toContain(
      "B3.favouritesButtonTextRemove"
    );
  });

  it("is not favourited if not in list", () => {
    props.favouriteBenefits = [];
    let mounted = mount(<FavouriteButton {...props} />);
    expect(mounted.find("span").html()).toContain("B3.favouritesButtonBText");
  });

  // it("has a working toggleFavourite function", async () => {
  //   let instance = mount(<FavouriteButton {...props} />).instance();
  //   instance.toggleFavourite("benefit_0");
  //   instance.toggleFavourite("c0");
  //   instance.toggleFavourite("c1");
  //   expect(instance.cookies.get("favouriteBenefits")).toEqual(["c0", "c1"]);
  //   instance.toggleFavourite("c0");
  //   expect(instance.cookies.get("favouriteBenefits")).toEqual(["c1"]);
  // });
});
