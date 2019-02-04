import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "../components/layout";
import GuidedExperience from "../components/guided_experience";
import GuidedExperienceProfile from "../components/guided_experience_profile";
import GuidedExperienceNeeds from "../components/guided_experience_needs";
import withI18N from "../lib/i18nHOC";

export class GuidedExperiencePage extends Component {
  render() {
    const { t, i18n, store, reduxState, url, section } = this.props;
    const question = reduxState.questions.filter(
      x => x.variable_name === section
    )[0];
    const pageTitle =
      t("current-language-code") === "en"
        ? question.guided_experience_page_title_english
        : question.guided_experience_page_title_french;

    console.log(reduxState);
    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        title={pageTitle}
        skipLink="#mainContent"
      >
        <GuidedExperience id={section} t={t} url={url} store={store}>
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

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

GuidedExperiencePage.propTypes = {
  reduxState: PropTypes.object,
  i18n: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18N(GuidedExperiencePage));
