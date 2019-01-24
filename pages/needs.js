import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import GuidedExperience from "../components/guided_experience";
import GuidedExperienceNeeds from "../components/guided_experience_needs";

const section = "needs";

export class Categories extends Component {
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
          <GuidedExperienceNeeds t={t} selectorType={section} store={store} />
        </GuidedExperience>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    selectedNeeds: reduxState.selectedNeeds,
    sectionOrder: reduxState.questions.map(x => x.variable_name)
  };
};

Categories.propTypes = {
  reduxState: PropTypes.object,
  sectionOrder: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18N(Categories));
