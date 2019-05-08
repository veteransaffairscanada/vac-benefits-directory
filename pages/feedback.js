import { Component } from "react";
import Header from "../components/typography/header";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { globalTheme } from "../theme";
import Container from "../components/container";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import RadioSelector from "../components/radio_selector";
import { connect } from "react-redux";
import Button from "../components/button";
import PropTypes from "prop-types";
import TextArea from "../components/text_area";
import Details from "../components/details";
require("isomorphic-fetch");
import Raven from "raven-js";
import Link from "next/link";
import BreadCrumbs from "../components/breadcrumbs";
import { getGuidedExperienceUrl } from "../selectors/urls";
import Paper from "../components/paper";
import HeaderLink from "../components/header_link";
import { mutateUrl } from "../utils/common";

const padding = css`
  padding-top: 15px;
  padding-bottom: 15px;
`;
const prevButton = css`
  margin-top: 50px;
  margin-bottom: 15px;
`;
const headerPadding = css`
  padding-bottom: 10px;
`;
const textAreaStyle = css`
  padding: 10px 0px 60px;
  max-width: 700px;
`;
const detailsStyle = css`
  font-size: 20px;
  margin-bottom: 30px;
  a {
    color: ${globalTheme.colour.greyishBrown};
  }
`;
const radioStyle = css`
  margin-top: 20px;
`;

const innerDiv = css`
  padding-top: 24px;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
`;
const leftMargin = css`
  margin-left: 1.5em;
`;
const textAreaHeader = css`
  margin-top: 50px;
`;
const textAreaPStyle = css`
  margin-top: 5px;
  margin-left: 2px;
  font-size: 18px;
  font-weight: normal;
  font-family: ${globalTheme.fontFamilySansSerif};
`;

export class Feedback extends Component {
  state = {
    how_was_your_experience: "",
    what_did_you_think: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  sendFeedback = () => {
    let payload = {
      how_was_your_experience: this.props.betaFeedback,
      what_did_you_think: this.state.what_did_you_think,
      time: new Date().toUTCString()
    };

    fetch("/submitBetaFeedback", {
      body: JSON.stringify(payload),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    }).catch(err => Raven.captureException(err));
  };

  render() {
    const { t, i18n, questions, store, url, guidedExperienceUrl } = this.props;
    const question = questions.filter(x => x.variable_name === "feedback")[0];

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
            <form>
              <Header styles={headerPadding} headingLevel="h1" size="lg">
                {t("feedback.page_header")}
              </Header>
              <RadioSelector
                styles={radioStyle}
                legend={
                  t("current-language-code") === "en"
                    ? question.display_text_english
                    : question.display_text_french
                }
                t={t}
                selectorType="betaFeedback"
                options={question.multiple_choice_options}
                store={store}
                url={url}
                feedbackPage
              />
              <Header headingLevel="h2" size="md" styles={textAreaHeader}>
                {t("feedback.tell_us_more")}
              </Header>
              <p css={textAreaPStyle}>{t("feedback.privacy_statement")}</p>
              <TextArea
                css={textAreaStyle}
                name="group1"
                maxLength={500}
                t={t}
                onChange={this.handleChange("what_did_you_think")}
              />
              <Details
                summary={t("feedback.details_question")}
                css={detailsStyle}
              >
                {t("feedback.details_expansion_pt1")}
                <a href={t("feedback.vac_office_link")}>
                  {t("feedback.details_expansion_pt2")}
                </a>
                {t("feedback.details_expansion_pt3")}
                <a href={t("feedback.transition_centre_link")}>
                  {t("feedback.details_expansion_pt4")}
                </a>
                {t("feedback.details_expansion_pt5")}
              </Details>

              <div className={padding}>
                <HeaderLink
                  id="prevButton"
                  css={prevButton}
                  hasBorder
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  {t("back")}
                </HeaderLink>
                <Link
                  href={{
                    pathname: "/feedback_submitted",
                    query: url.query
                  }}
                >
                  <Button
                    id="send"
                    arrow={true}
                    css={leftMargin}
                    onClick={() => {
                      !this.props.betaFeedback.isEmpty() ||
                      !this.state.what_did_you_think.isEmpty()
                        ? this.sendFeedback()
                        : "";
                    }}
                  >
                    {t("send")}{" "}
                  </Button>
                </Link>
              </div>
            </form>
          </Paper>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    questions: reduxState.questions,
    guidedExperienceUrl: getGuidedExperienceUrl(reduxState, props),
    betaFeedback: reduxState.betaFeedback
  };
};

Feedback.propTypes = {
  t: PropTypes.func.isRequired,
  guidedExperienceUrl: PropTypes.string,
  betaFeedback: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default withI18N(connect(mapStateToProps)(Feedback));
