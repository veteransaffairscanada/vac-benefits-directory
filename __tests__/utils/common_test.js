import {
  showQuestion,
  getLink,
  questionIsRelevant,
  getBenefitCountString
} from "../../utils/common";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";

describe("questionIsRelevant function", () => {
  let reduxState;
  beforeEach(() => {
    reduxState = {
      benefitEligibility: benefitEligibilityFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture
    };
  });

  it("returns false if question is not relevant", () => {
    const profileFilters = {
      patronType: "servingMember"
    };
    expect(
      questionIsRelevant("serviceType", profileFilters, reduxState)
    ).toEqual(false);
  });

  it("returns true if question is relevant", () => {
    const profileFilters = {
      patronType: "veteran"
    };
    expect(
      questionIsRelevant("serviceType", profileFilters, reduxState)
    ).toEqual(true);
  });

  it("returns true if question is relevant if it is cleared", () => {
    const profileFilters = {
      patronType: "veteran",
      serviceType: "s3"
    };
    expect(
      questionIsRelevant("serviceType", profileFilters, reduxState)
    ).toEqual(true);
  });
});

describe("showQuestion function", () => {
  let reduxState;
  beforeEach(() => {
    reduxState = {
      questions: questionsFixture,
      benefitEligibility: benefitEligibilityFixture,
      questionDisplayLogic: questionDisplayLogicFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      patronType: "veteran",
      serviceType: "",
      serviceHealthIssue: "",
      statusAndVitals: ""
    };
  });

  it("shows the first question", () => {
    reduxState.patronType = "";
    expect(showQuestion("patronType", 0, reduxState)).toEqual(true);
  });

  it("hides question if previous question doesn't have an answer", () => {
    reduxState.patronType = "";
    expect(showQuestion("serviceType", 1, reduxState)).toEqual(false);
  });

  it("shows question if previous question has an answer", () => {
    reduxState.patronType = "veteran";
    expect(showQuestion("serviceType", 1, reduxState)).toEqual(true);
  });

  it("hides questions if not relevant", () => {
    reduxState.patronType = "servingMember";
    expect(showQuestion("serviceType", 1, reduxState)).toEqual(false);
  });

  it("shows needs if patronType not organization", () => {
    reduxState.patronType = "servingMember";
    expect(showQuestion("needs", 1, reduxState)).toEqual(true);
  });

  it("hides needs if patronType is organization", () => {
    reduxState.patronType = "organization";
    expect(showQuestion("needs", 1, reduxState)).toEqual(false);
  });
});

describe("getLink function", () => {
  let url, page;
  beforeEach(() => {
    url = {
      query: { key1: "val1", key2: "val2" }
    };
    page = "page1";
  });

  it("creates a correct url if no referrer", () => {
    const link = getLink(url, page);
    expect(link).toEqual("page1?key1=val1&key2=val2");
  });

  it("creates a correct url if referrer is undefined", () => {
    const link = getLink(url, page, undefined);
    expect(link).toEqual("page1?key1=val1&key2=val2");
  });

  it("creates a correct url if referrer is empty", () => {
    const link = getLink(url, page, "");
    expect(link).toEqual("page1?key1=val1&key2=val2");
  });

  it("creates a correct url if referrer is not empty", () => {
    const link = getLink(url, page, "referrer1");
    expect(link).toEqual("page1?key1=val1&key2=val2&referrer=referrer1");
  });

  it("ignores empty query params", () => {
    url.query = { a: "aa", b: "" };
    const link = getLink(url, page);
    expect(link).toEqual("page1?a=aa");
  });
});

describe("getBenefitCountString function", () => {
  let t = x => x;
  it("returns the right string", () => {
    expect(getBenefitCountString([], t)).toEqual(
      "BenefitsPane.no_filtered_benefits"
    );
    expect(getBenefitCountString(["x"], t)).toEqual("B3.One benefit");
    expect(getBenefitCountString(["x", "y"], t)).toEqual(
      "B3.x benefits to consider"
    );
  });
});
