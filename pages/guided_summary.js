import React, { Component } from "react";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import PropTypes from "prop-types";
import GuidedExperience from "../components/guided_experience";

export class GuidedSummary extends Component {
  render() {
    const { t, i18n, store } = this.props;

    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        showRefreshCache={false}
        title={t("titles.ge_summary")}
      >
        <GuidedExperience
          id={"summary"}
          stepNumber={6}
          nextSection={"benefits-directory"}
          subtitle={t("ge.summary_subtitle")}
          helperText={t("ge.summary_tooltip")}
          t={t}
          store={store}
          setSection={x => x}
        >
          <div />
        </GuidedExperience>
      </Layout>
    );
  }
}

GuidedSummary.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default withI18N(GuidedSummary);
