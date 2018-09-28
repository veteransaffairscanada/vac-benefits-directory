import React from "react";
import { mount } from "enzyme";
import { ProfileNeedsSelector } from "../../components/profile_needs_selector";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import questionClearLogicFixture from "../fixtures/question_clear_logic";
import responsesFixture from "../fixtures/responses";

describe("ProfileNeedsSelector", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: key => key
    };
    reduxData = {
      questions: questionsFixture,
      profileQuestions: questionsFixture.filter(
        q => q.variable_name !== "needs"
      ),
      questionDisplayLogic: questionDisplayLogicFixture,
      questionClearLogic: questionClearLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      responses: responsesFixture,
      selectedNeeds: {},
      needs: needsFixture,
      saveQuestionResponse: jest.fn(),
      setSelectedNeeds: jest.fn(),
      eligibilityPaths: eligibilityPathsFixture,
      pageWidth: 1000
    };
    mockStore = configureStore();
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<ProfileNeedsSelector {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has no clear button if nothing selected", () => {
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(0);
  });

  it("has a clear button if patronType has a value", () => {
    reduxData.responses.patronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(1);
  });

  it("has a clear button if selectedNeeds is populated", () => {
    reduxData.selectedNeeds = { foo: "bar" };
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .find("#ClearFilters")
        .first().length
    ).toEqual(1);
  });

  it("has a correct clearFilters function", () => {
    let instance = mount(
      <ProfileNeedsSelector {...props} {...reduxData} />
    ).instance();
    instance.clearFilters();

    expect(reduxData.saveQuestionResponse).toBeCalledWith("patronType", "");
    expect(reduxData.saveQuestionResponse).toBeCalledWith("serviceType", "");
    expect(reduxData.saveQuestionResponse).toBeCalledWith(
      "statusAndVitals",
      ""
    );
    expect(reduxData.saveQuestionResponse).toBeCalledWith(
      "serviceHealthIssue",
      ""
    );
    expect(reduxData.saveQuestionResponse).toBeCalledWith("selectedNeeds", {});
  });

  it("clicking #ClearFilters toggles the clearFilters function", () => {
    reduxData.selectedNeeds = { foo: "bar" };
    const mounted = mount(<ProfileNeedsSelector {...props} {...reduxData} />);
    mounted.instance().clearFilters = jest.fn();
    mounted
      .find("#a-ClearFilters")
      .first()
      .simulate("click");
    expect(mounted.instance().clearFilters).toBeCalled();
  });

  it("countSelected returns 1 if a profile is selected", () => {
    reduxData.responses.patronType = "organization";
    props.store = mockStore(reduxData);
    expect(
      mount(<ProfileNeedsSelector {...props} {...reduxData} />)
        .instance()
        .countSelected()
    ).toEqual(1);
  });
});
