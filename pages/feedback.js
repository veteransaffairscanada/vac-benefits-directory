import React, { Component } from "react";
import Header from "../components/typography/header";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { globalTheme } from "../theme";
import Container from "../components/container";
import { css } from "emotion";
import RadioSelector from "../components/radio_selector";
import { connect } from "react-redux";
import HeaderLink from "../components/header_link";
import Button from "../components/button";
import PropTypes from "prop-types";
import TextArea from "../components/text_area";
require("isomorphic-fetch");
import Raven from "raven-js";
import { mutateUrl } from "../utils/common";
import Router from "next/router";

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
const textAreaPadding = css`
  padding: 30px 0px 60px;
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
        backgroundColor={globalTheme.colour.white}
        skipLink="#mainContent"
      >
        <Container className={padding} id="mainContent">
          <HeaderLink
            href={"/benefits-directory"} // will need to change
            className={prevButton}
            arrow="back"
          >
            {t("back")}
          </HeaderLink>

          <Header className={headerPadding} headingLevel="h1" size="lg">
            {t("feedback.page_header")}
          </Header>
          <RadioSelector
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
            className={textAreaPadding}
            name="group1"
            maxLength={"500"}
            t={t}
            onChange={this.handleChange("what_did_you_think")}
          >
            {t("feedback.tell_us_more")}
          </TextArea>
          <div className={padding}>
            <Button
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
