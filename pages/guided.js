import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";

import Cookies from "universal-cookie";

import GuidedExperience from "../components/guided_experience";
import GuidedExperienceProfile from "../components/guided_experience_profile";
import GuidedExperienceNeeds from "../components/guided_experience_needs";
import { showQuestion } from "../utils/common";

const section_order = [
  "patronType",
  "serviceType",
  "statusAndVitals",
  "serviceHealthIssue",
  "needs"
];

export class Guided extends Component {
  constructor() {
    super();
    this.cookies = new Cookies();
    this.state = {
      favouriteBenefits: [],
      section: section_order[0]
    };
  }

  componentDidMount() {
    Router.onRouteChangeStart = newUrl => {
      let matches = newUrl.match(/section=([^&]*)/);
      const newState = {
        section: matches[1] || section_order[0]
      };
      this.setState(newState);
    };

    const newState = {
      favouriteBenefits: this.props.favouriteBenefits,
      section: this.props.url.query.section || section_order[0]
    };

    this.setState(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps || this.state.section !== prevState.section) {
      this.setURL();
    }
  }

  setURL = (state = this.state) => {
    let href = "/guided?section=" + state.section;
    if (Object.keys(this.props.selectedNeeds).length > 0) {
      href += "&selectedNeeds=" + Object.keys(this.props.selectedNeeds).join();
    }
    this.props.reduxState.questions
      .filter(x => x.variable_name !== "needs")
      .forEach(x => {
        if (this.props.reduxState[x.variable_name]) {
          href += `&${x.variable_name}=${
            this.props.reduxState[x.variable_name]
          }`;
        }
      });
    href += "&lng=" + this.props.t("current-language-code");
    Router.replace(href);
  };

  setSection = section => {
    this.setState({ section: section });
    // const current_index = section_order.indexOf(section);
    // section_order.filter((x, i) => i > current_index)
    //   .forEach(x => {
    //     this.props.saveQuestionResponse({x: ""});
    //   });

    let sectionMap = {
      patronType: 1,
      serviceType: 2,
      statusAndVitals: 3,
      serviceHealthIssue: 4,
      needs: 5
    };
    const {
      setPatronType,
      setServiceType,
      setStatusAndVitals,
      setServiceHealthIssue,
      setSelectedNeeds
    } = this.props;
    const setters = [
      () => setPatronType(""),
      () => setServiceType(""),
      () => setStatusAndVitals(""),
      () => setServiceHealthIssue(""),
      () => setSelectedNeeds({})
    ];
    let current_section_index;
    if (sectionMap[section]) {
      current_section_index = sectionMap[section];
    } else {
      current_section_index = 0;
    }
    setters.forEach((setter, i) => {
      if (i >= current_section_index) {
        setter();
      }
    });
  };

  render() {
    const { t, i18n, store, reduxState } = this.props;
    const { section } = this.state;
    const displayable_sections = section_order.filter((x, i) =>
      showQuestion(x, i, reduxState)
    );
    const dynamicStepNumber = displayable_sections.indexOf(section);

    const nextSection =
      dynamicStepNumber + 1 >= displayable_sections.length
        ? "benefits-directory"
        : displayable_sections[dynamicStepNumber + 1];
    const prevSection =
      dynamicStepNumber === 0
        ? "index"
        : displayable_sections[dynamicStepNumber - 1];

    const question = reduxState.questions.filter(
      x => x.variable_name === section
    )[0];
    const subtitle =
      t("current-language-code") === "en"
        ? question["guided_experience_english"]
        : question["guided_experience_french"];

    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        showRefreshCache={false}
        title={t("titles.guided_experience")}
      >
        <GuidedExperience
          id={section}
          stepNumber={section_order.indexOf(section)}
          nextSection={nextSection}
          prevSection={prevSection}
          setSection={this.setSection}
          subtitle={subtitle}
          t={t}
          store={store}
        >
          {section === "needs" ? (
            <GuidedExperienceNeeds t={t} selectorType={section} store={store} />
          ) : (
            <GuidedExperienceProfile
              t={t}
              selectorType={section}
              store={store}
              options={question["multiple_choice_options"]}
            />
          )}
        </GuidedExperience>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPatronType: patronType => {
      dispatch({ type: "SET_PATRON_TYPE", data: patronType });
    },
    setServiceType: serviceType => {
      dispatch({ type: "SET_SERVICE_TYPE", data: serviceType });
    },
    setStatusAndVitals: statusType => {
      dispatch({ type: "SET_STATUS_TYPE", data: statusType });
    },
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    },
    setServiceHealthIssue: serviceHealthIssue => {
      dispatch({ type: "SET_HEALTH_ISSUE", data: serviceHealthIssue });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    benefits: reduxState.benefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    examples: reduxState.examples,
    favouriteBenefits: reduxState.favouriteBenefits,
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds
  };
};

Guided.propTypes = {
  reduxState: PropTypes.object,
  benefits: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
  eligibilityPaths: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusAndVitals: PropTypes.func.isRequired,
  setServiceHealthIssue: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18next()(Guided));
