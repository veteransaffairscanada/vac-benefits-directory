import { showQuestion } from "../../utils/common";
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
    expect(showQuestion(questionsFixture[0], 0, reduxState)).toEqual(true);
  });

  it("hides question if previous question doesn't have an answer", () => {
    expect(showQuestion(questionsFixture[1], 1, reduxState)).toEqual(false);
  });

  it("shows question if previous question has an answer", () => {
    reduxState.patronType = "service-member";

    expect(showQuestion(questionsFixture[1], 1, reduxState)).toEqual(true);
  });

  it("hides questions if organization selected", () => {
    reduxState.patronType = "organization";
    expect(showQuestion(questionsFixture[1], 1, reduxState)).toEqual(false);
  });
});
