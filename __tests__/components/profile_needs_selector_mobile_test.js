import React from "react";
import { mount } from "enzyme";
import { ProfileNeedsSelectorMobile } from "../../components/profile_needs_selector_mobile";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";

describe("ProfileNeedsSelectorMobile", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: key => key
    };
    reduxData = {
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      patronType: "",
      serviceType: "",
      statusAndVitals: "",
      serviceHealthIssue: "",
      selectedPatronType: "",
      selectedServiceType: "",
      selectedStatusAndVitals: "",
      selectedServiceHealthIssue: "",
      selectedNeeds: {},
      needs: needsFixture,
      setPatronType: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      setServiceHealthIssue: jest.fn(),
      setSelectedNeeds: jest.fn(),
      eligibilityPaths: eligibilityPathsFixture,
      pageWidth: 1000
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(
      <ProfileNeedsSelectorMobile {...props} {...reduxData} />
    ).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has no clear button if patronType is empty", () => {
    reduxData.patronType = "";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelectorMobile {...props} {...reduxData} />)
        .find("#ClearFiltersMobile")
        .first().length
    ).toEqual(0);
  });

  it("has a clear button if patronType is populated", () => {
    reduxData.patronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelectorMobile {...props} {...reduxData} />)
        .find("#ClearFiltersMobile")
        .first().length
    ).toEqual(1);
  });

  it("has no clear button if selectedNeeds is empty", () => {
    reduxData.selectedNeeds = {};
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelectorMobile {...props} {...reduxData} />)
        .find("#ClearFiltersMobile")
        .first().length
    ).toEqual(0);
  });

  it("has a clear button if selectedNeeds is populated", () => {
    reduxData.selectedNeeds = { foo: "bar" };
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelectorMobile {...props} {...reduxData} />)
        .find("#ClearFiltersMobile")
        .first().length
    ).toEqual(1);
  });

  it("has a correct clearFilters function", () => {
    let instance = mount(
      <ProfileNeedsSelectorMobile {...props} {...reduxData} />
    ).instance();
    instance.clearFilters();
    expect(reduxData.setPatronType).toBeCalledWith("");
    expect(reduxData.setServiceType).toBeCalledWith("");
    expect(reduxData.setStatusAndVitals).toBeCalledWith("");
    expect(reduxData.setServiceHealthIssue).toBeCalledWith("");
    expect(reduxData.setSelectedNeeds).toBeCalledWith({});
  });

  it("clicking #ClearFiltersMobile toggles the clearFilters function", () => {
    reduxData.selectedNeeds = { foo: "bar" };
    const mounted = mount(
      <ProfileNeedsSelectorMobile {...props} {...reduxData} />
    );
    mounted.instance().clearFilters = jest.fn();
    mounted
      .find("#ClearFiltersMobile")
      .first()
      .simulate("click");
    expect(mounted.instance().clearFilters).toBeCalled();
  });

  it("clicking ExpansionPanelSummary toggles the toggleOpenState function", () => {
    const mounted = mount(
      <ProfileNeedsSelectorMobile {...props} {...reduxData} />
    );
    mounted.instance().toggleOpenState = jest.fn();
    mounted
      .find("ExpansionPanelSummary")
      .first()
      .simulate("click");
    expect(mounted.instance().toggleOpenState).toBeCalled();
  });

  it("returns 1 if a profile is selected", () => {
    reduxData.selectedPatronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelectorMobile {...props} {...reduxData} />)
        .instance()
        .countSelected()
    ).toEqual(1);
  });

  it("toggles the state with toggleOpenState", () => {
    const mounted = mount(
      <ProfileNeedsSelectorMobile {...props} {...reduxData} />
    );
    mounted.setState({ open: true });
    mounted.instance().toggleOpenState();
    expect(mounted.state("open")).toEqual(false);
  });
});
