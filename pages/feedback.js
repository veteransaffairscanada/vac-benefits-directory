import React, { Component } from "react";
import Header from "../components/typography/header";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { globalTheme } from "../theme";
import Container from "../components/container";
import { css } from "emotion";
import RadioSelector from "../components/radio_selector";
import { connect } from "react-redux";
import HeaderButton from "../components/header_button";
import Button from "../components/button";
import PropTypes from "prop-types";
import TextArea from "../components/text_area";
import Details from "../components/details";
require("isomorphic-fetch");
import Raven from "raven-js";
import Router from "next/router";
import AlphaBanner from "../components/alpha_banner";

const padding = css`
  padding-top: 15px;
  padding-bottom: 15px;
`;
const prevButton = css`
  margin-top: 50px;
  margin-bottom: 15px;
  padding: 0;
`;
const headerPadding = css`
  padding-bottom: 10px;
`;
const textAreaStyle = css`
  padding: 10px 0px 60px;
  max-width: 700px;
`;
const detailsStyle = css`
  margin-bottom: 30px;
  a {
    color: ${globalTheme.colour.greyishBrown};
  }
`;
const radioStyle = css`
  margin-left: 0px;
  margin-top: 20px;
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
    const { t, i18n, questions, store, url } = this.props;
    const question = questions.filter(x => x.variable_name === "feedback")[0];
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
          <AlphaBanner t={t} url={url} />
          <HeaderButton
            onClick={() => {
              window.history.back();
            }}
            className={prevButton}
            arrow="back"
          >
            {t("back")}
          </HeaderButton>
          <form>
            <Header className={headerPadding} headingLevel="h1" size="lg">
              {t("feedback.page_header")}
            </Header>
            <RadioSelector
              className={radioStyle}
              legend={
                t("current-language-code") === "en"
                  ? question.display_text_english
                  : question.display_text_french
              }
              t={t}
              selectorType="betaFeedback"
              options={question.multiple_choice_options}
              store={store}
            />
            <TextArea
              className={textAreaStyle}
              name="group1"
              maxLength={500}
              t={t}
              onChange={this.handleChange("what_did_you_think")}
            >
              {t("feedback.tell_us_more")}
            </TextArea>
            <Details
              summary={t("feedback.details_question")}
              className={detailsStyle}
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
              <Button
                id="send"
                arrow={true}
                size="big"
                onClick={() => {
                  this.sendFeedback();
                  Router.push({
                    pathname: "/feedback_submitted",
                    query: url.query
                  });
                }}
              >
                {t("send")}{" "}
              </Button>
            </div>
          </form>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    questions: reduxState.questions,
    betaFeedback: reduxState.betaFeedback
  };
};

Feedback.propTypes = {
  t: PropTypes.func.isRequired,
  betaFeedback: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default withI18N(connect(mapStateToProps)(Feedback));
