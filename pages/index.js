import React, { Component } from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import GuidedExperience from "../components/guided_experience";
import GuidedExperienceProfile from "../components/guided_experience_profile";

const section = "patronType";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setURL();
    }
  }

  setURL = () => {
    this.props.url.query[section] = this.props.reduxState[section];
    this.props.url.query.lng = this.props.t("current-language-code");
  };

  getSubtitle = question => {
    if (this.props.t("current-language-code") === "en") {
      return question["guided_experience_english"];
    } else {
      return question["guided_experience_french"];
    }
  };

  render() {
    const { t, i18n, store, reduxState, sectionOrder, url } = this.props;
    const question = reduxState.questions.filter(
      x => x.variable_name === section
    )[0];

    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        title={t("ge.Find benefits and services")}
        skipLink="#mainContent"
      >
        <GuidedExperience
          id={section}
          stepNumber={sectionOrder.indexOf(section)}
          prevSection="index"
          subtitle={this.getSubtitle(question)}
          t={t}
          url={url}
          store={store}
        >
          <GuidedExperienceProfile
            t={t}
            selectorType={section}
            store={store}
            options={question["multiple_choice_options"]}
          />
        </GuidedExperience>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveQuestionResponse: (question, response) => {
      dispatch({
        type: "SAVE_QUESTION_RESPONSE",
        data: { [question]: response }
      });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    selectedNeeds: reduxState.selectedNeeds,
    sectionOrder: reduxState.questions.map(x => x.variable_name)
  };
};

Index.propTypes = {
  reduxState: PropTypes.object,
  sectionOrder: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18N(Index));
