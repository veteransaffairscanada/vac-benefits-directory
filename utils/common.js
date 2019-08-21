import { eligibilityMatch, getProfileFilters } from "../selectors/benefits";

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const questionIsRelevant = (
  question_variable_name,
  allProfileFilters,
  reduxState
) => {
  let profileFilters = JSON.parse(JSON.stringify(allProfileFilters));
  profileFilters[question_variable_name] = "";

  let relevantPaths = reduxState.benefitEligibility.filter(ep =>
    eligibilityMatch(ep, profileFilters, reduxState.multipleChoiceOptions)
  );
  let returnValue = false;
  relevantPaths.forEach(ep => {
    if (
      ep[question_variable_name] !== undefined &&
      ep[question_variable_name].length !== 0
    ) {
      returnValue = true;
    }
  });
  return returnValue;
};

export const showQuestion = (question_variable_name, index, reduxState) => {
  if (index === 0) {
    return true;
  }
  if (question_variable_name === "needs") {
    return reduxState.patronType !== "organization";
  }

  const { questions } = reduxState;
  const questionsToHide = questions
    .map(q => q.variable_name)
    .filter(
      q => !questionIsRelevant(q, getProfileFilters(reduxState), reduxState)
    );

  if (questionsToHide.indexOf(question_variable_name) > -1) {
    return false;
  }

  const displayableQuestions = questions.filter(
    q => questionsToHide.indexOf(q.variable_name) === -1
  );
  const new_index = displayableQuestions
    .map(x => x.variable_name)
    .indexOf(question_variable_name);
  const previousQuestionAnswered =
    reduxState[displayableQuestions[new_index - 1].variable_name] !== "";
  if (!previousQuestionAnswered && question_variable_name !== "needs") {
    return false;
  }
  return true;
};

// taken from https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cookies.js
export const areCookiesDisabled = () => {
  try {
    // Create cookie
    document.cookie = "cookietest=1";
    const cookiesDisabled = document.cookie.indexOf("cookietest=") === -1;
    // Delete cookie
    document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    return cookiesDisabled;
  } catch (e) {
    return true;
  }
};

// adds a utm to a url for ga tracking
export const getUtmUrl = (url, utm) => {
  let link =
    url.indexOf("?") === url.length - 1
      ? url + utm
      : url.indexOf("?") > -1
      ? url + "&" + utm
      : url + "?" + utm;

  return link;
};

export const getLink = (url, page, referrer) => {
  // link for page, copying the query params of url except for referrer
  let link =
    page +
    "?" +
    Object.entries(url.query)
      .filter(x => x[0] !== "" && x[1] !== "" && x[0] !== "referrer")
      .map(x => {
        return x[0] + "=" + x[1];
      })
      .join("&");
  if (referrer) {
    link += "&referrer=" + referrer;
  }
  return link;
};

export const mutateUrl = (url, route = "", query = {}) => {
  let newUrl = "";
  if (route) {
    newUrl += route;
  } else {
    newUrl += url.route;
  }

  let newQuery = {};
  Object.keys(url.query).forEach(x => {
    newQuery[x] = url.query[x];
  });
  Object.keys(query).forEach(x => {
    newQuery[x] = query[x];
  });

  newUrl +=
    "?" +
    Object.keys(newQuery)
      .filter(x => newQuery[x] !== "" && JSON.stringify(newQuery[x]) !== "{}")
      .map(x => `${x}=${newQuery[x]}`)
      .join("&");
  return newUrl;
};

export const getBenefitCountString = (benefits, t) => {
  if (benefits.length === 0) {
    return t("BenefitsPane.no_filtered_benefits");
  } else if (benefits.length === 1) {
    return t("B3.One benefit");
  } else {
    return t("B3.x benefits to consider", { x: benefits.length });
  }
};

export const getPageName = questionName => {
  const pageNameDict = {
    patronType: "",
    serviceType: "serviceType",
    statusAndVitals: "statusAndVitals",
    serviceHealthIssue: "serviceHealthIssue",
    needs: "needs",
    benefitsDirectory: "benefits-directory"
  };
  return pageNameDict[questionName];
};
