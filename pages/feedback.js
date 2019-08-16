import { Component } from "react";
import Header from "../components/typography/header";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { globalTheme } from "../theme";
import Container from "../components/container";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
require("isomorphic-fetch");
import BreadCrumbs from "../components/breadcrumbs";
import { getGuidedExperienceUrl } from "../selectors/urls";
import Paper from "../components/paper";
import FeedbackForm from "../components/feedback_form";
import FeedbackSubmitted from "../components/feedback_submitted";

const padding = css`
  padding-top: 15px;
  padding-bottom: 15px;
`;
const headerPadding = css`
  padding-bottom: 10px;
`;
const innerDiv = css`
  padding-top: 24px;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
`;

export class Feedback extends Component {
  state = {
    renderForm: true
  };

  render() {
    const { t, i18n, store, url, guidedExperienceUrl } = this.props;

    const breadcrumbs = [
      {
        url: guidedExperienceUrl,
        name: t("ge.Find benefits and services")
      }
    ];

    return (
      <Layout
        t={t}
        i18n={i18n}
        hideNoscript={false}
        title={t("feedback.page_title")}
        backgroundColor={globalTheme.colour.paleGreyTwo}
        skipLink="#mainContent"
        url={url}
      >
        <Container className={padding} id="mainContent">
          <div className={topMatter}>
            <BreadCrumbs
              t={t}
              breadcrumbs={breadcrumbs}
              pageTitle={t("feedback.page_header")}
            />
          </div>
          <Paper
            id="feedbackPagePaper"
            padding="md"
            styles={innerDiv}
            url={url}
            t={t}
            includeBanner={true}
          >
            <Header styles={headerPadding} headingLevel="h1" size="lg">
              {t("feedback.page_header")}
            </Header>
            {this.state.renderForm ? (
              <FeedbackForm
                t={t}
                url={url}
                store={store}
                onSend={() => {
                  this.setState({ renderForm: false });
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }}
              />
            ) : (
              <FeedbackSubmitted t={t} url={url}></FeedbackSubmitted>
            )}
          </Paper>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    guidedExperienceUrl: getGuidedExperienceUrl(reduxState, props)
  };
};

Feedback.propTypes = {
  t: PropTypes.func.isRequired,
  guidedExperienceUrl: PropTypes.string,
  betaFeedback: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default withI18N(connect(mapStateToProps)(Feedback));
