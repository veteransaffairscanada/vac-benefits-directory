import { showQuestion, get_link } from "../../utils/common";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";

describe("showQuestion function", () => {
  let reduxState;
  beforeEach(() => {
    reduxState = {
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      serviceType: "",
      patronType: "",
      serviceHealthIssue: "",
      statusAndVitals: ""
    };
  });

  it("shows the first question", () => {
    expect(
      showQuestion(questionsFixture[0].variable_name, 0, reduxState)
    ).toEqual(true);
  });

  it("hides question if previous question doesn't have an answer", () => {
    expect(
      showQuestion(questionsFixture[1].variable_name, 1, reduxState)
    ).toEqual(false);
  });

  it("shows question if previous question has an answer", () => {
    reduxState.patronType = "service-member";

    expect(
      showQuestion(questionsFixture[1].variable_name, 1, reduxState)
    ).toEqual(true);
  });

  it("hides questions if organization selected", () => {
    reduxState.patronType = "organization";
    expect(
      showQuestion(questionsFixture[1].variable_name, 1, reduxState)
    ).toEqual(false);
  });
});

describe("get_link function", () => {
  let url, page;
  beforeEach(() => {
    url = {
      query: { key1: "val1", key2: "val2" }
    };
    page = "page1";
  });

  it("creates a correct url if no referrer", () => {
    const link = get_link(url, page);
    expect(link).toEqual("page1?key1=val1&key2=val2");
  });

  it("creates a correct url if referrer is undefined", () => {
    const link = get_link(url, page, undefined);
    expect(link).toEqual("page1?key1=val1&key2=val2");
  });

  it("creates a correct url if referrer is empty", () => {
    const link = get_link(url, page, "");
    expect(link).toEqual("page1?key1=val1&key2=val2");
  });

  it("creates a correct url if referrer is not empty", () => {
    const link = get_link(url, page, "referrer1");
    expect(link).toEqual("page1?key1=val1&key2=val2&referrer=referrer1");
  });
});
