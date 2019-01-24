import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import GuidedExperience from "../components/guided_experience";
import GuidedExperienceProfile from "../components/guided_experience_profile";
import Cookies from "universal-cookie";

const section = "patronType";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }
  render() {
    const { t, i18n, store, reduxState, url } = this.props;
    const question = reduxState.questions.filter(
      x => x.variable_name === section
    )[0];
    const pageTitle =
      t("current-language-code") === "en"
        ? question.guided_experience_page_title_english
        : question.guided_experience_page_title_french;
    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        title={pageTitle}
        skipLink="#mainContent"
      >
        <GuidedExperience id={section} t={t} url={url} store={store}>
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

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

Index.propTypes = {
  reduxState: PropTypes.object,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18N(Index));
