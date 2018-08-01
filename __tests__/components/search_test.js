import React from "react";
import { mount } from "enzyme";
import { Search } from "../../components/search";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import configureStore from "redux-mock-store";

describe("Search", () => {
  let props;
  let _mountedSearch;
  let mockStore, reduxData;

  const mounted_Search = () => {
    if (!_mountedSearch) {
      _mountedSearch = mount(<Search {...props} {...reduxData} />);
    }
    return _mountedSearch;
  };

  beforeEach(() => {
    props = {
      i18n: {},
      id: "",
      classes: {},
      t: key => key,
      theme: {}
    };
    _mountedSearch = undefined;
    reduxData = {
      benefits: benefitsFixture,
      enIdx: JSON.stringify({
        version: "2.3.0",
        fields: ["vacNameEn", "oneLineDescriptionEn"],
        fieldVectors: [
          ["vacNameEn/1", [0, 0.288]],
          ["oneLineDescriptionEn/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameEn: {}, oneLineDescriptionEn: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameEn: { "1": {} }, oneLineDescriptionEn: {} }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      frIdx: JSON.stringify({
        version: "2.3.0",
        fields: ["vacNameFr", "oneLineDescriptionFr"],
        fieldVectors: [
          ["vacNameFr/1", [0, 0.288]],
          ["oneLineDescriptionFr/1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            { _index: 1, vacNameFr: {}, oneLineDescriptionFr: { "1": {} } }
          ],
          [
            "fiz",
            { _index: 0, vacNameFr: { "1": {} }, oneLineDescriptionFr: {} }
          ]
        ],
        pipeline: ["stemmer"]
      })
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<Search {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  describe("getSuggestions", () => {
    it("returns an empty array if the value passed is blank", () => {
      expect(
        mounted_Search()
          .instance()
          .getSuggestions("  ")
      ).toEqual([]);
    });

    it("returns an array with partial matches on vacName in English", () => {
      props.t = () => "en";
      expect(
        mounted_Search()
          .instance()
          .getSuggestions("fiz")
      ).toEqual(["Disability Award"]);
    });

    it("returns an array with partial matches on vacName in French", () => {
      props.t = () => "fr";
      expect(
        mounted_Search()
          .instance()
          .getSuggestions("fiz")
      ).toEqual(["Prix ​​d'invalidité"]);
    });
  });

  describe("getSuggestionValue", () => {
    it("returns whatever is is passed", () => {
      expect(
        mounted_Search()
          .instance()
          .getSuggestionValue("foo")
      ).toEqual("foo");
    });
  });

  describe("onChange", () => {
    it("sets the state of value", () => {
      mounted_Search()
        .instance()
        .onChange({}, { newValue: "bar" });
      expect(mounted_Search().state("value")).toEqual("bar");
    });
  });

  describe("onSuggestionsFetchRequested", () => {
    it("sets the state of suggestions", () => {
      mounted_Search()
        .instance()
        .onSuggestionsFetchRequested({ value: "" });
      expect(mounted_Search().state("suggestions")).toEqual([]);
    });
  });

  describe("onSuggestionsClearRequested", () => {
    it("sets the state of suggestions to an empty array", () => {
      mounted_Search()
        .instance()
        .onSuggestionsClearRequested();
      expect(mounted_Search().state("suggestions")).toEqual([]);
    });
  });

  describe("renderInput", () => {
    it("returns an input element to be used as the autosuggest input", () => {
      expect(
        mounted_Search()
          .instance()
          .renderInput({ classes: { input: {} } })
      ).not.toEqual("");
    });
  });

  describe("renderSuggestion", () => {
    it("returns a list of suggestions to show in the autosuggest output with highlight", () => {
      expect(
        mounted_Search()
          .instance()
          .renderSuggestion("Disability Award", {
            query: "Dis",
            isHighlighted: false
          })
      ).not.toEqual("");
    });

    it("returns a list of suggestions to show in the autosuggest output without highlight", () => {
      expect(
        mounted_Search()
          .instance()
          .renderSuggestion("Disability Award", {
            query: "dd",
            isHighlighted: false
          })
      ).not.toEqual("");
    });
  });

  it("has a search button on big screens", () => {
    expect(mounted_Search().find("#searchButtonLink").length).not.toEqual(0);
  });

  describe("renderSuggestionsContainer", () => {
    it("returns a wrapper element to be used as the autosuggest results conatiner", () => {
      expect(
        mounted_Search()
          .instance()
          .renderSuggestionsContainer({ containerProps: {}, children: {} })
      ).not.toEqual("");
    });
  });
});
