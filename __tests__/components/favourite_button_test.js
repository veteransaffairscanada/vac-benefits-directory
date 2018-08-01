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
      t: key => key,
      favouriteBenefits: ["0"],
      saveFavourites: jest.fn(),
      benefit: benefitsFixture[0],
      toggleOpenState: jest.fn(),
      classes: {}
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<FavouriteButton {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("calls toggleFavourite if favourite button pressed", () => {
    mount(<FavouriteButton {...props} />)
      .first()
      .simulate("click");
    expect(props.toggleOpenState).toBeCalled();
  });

  it("is favourited if in list", () => {
    let mounted = mount(<FavouriteButton {...props} />);
    expect(mounted.find("svg").hasClass("bookmarked")).toEqual(true);
  });

  it("is not favourited if not in list", () => {
    props.favouriteBenefits = [];
    let mounted = mount(<FavouriteButton {...props} />);
    expect(mounted.find("svg").hasClass("notBookmarked")).toEqual(true);
  });

  it("has a working toggleFavourite function", async () => {
    let instance = mount(<FavouriteButton {...props} />).instance();
    instance.toggleFavourite("0");
    instance.toggleFavourite("c0");
    instance.toggleFavourite("c1");
    expect(instance.cookies.get("favouriteBenefits")).toEqual(["c0", "c1"]);
    instance.toggleFavourite("c0");
    expect(instance.cookies.get("favouriteBenefits")).toEqual(["c1"]);
  });
});
