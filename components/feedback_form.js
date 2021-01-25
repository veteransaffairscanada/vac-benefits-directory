import { Component } from "react";
import Header from "../components/typography/header";
import withI18N from "../lib/i18nHOC";
import { globalTheme } from "../theme";
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
import HeaderLink from "../components/header_link";

const padding = css`
  padding-top: 15px;
  padding-bottom: 15px;
`;
const prevButton = css`
  margin-top: 50px;
  margin-bottom: 15px;
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

export class FeedbackForm extends Component {
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

    if (payload.how_was_your_experience || payload.what_did_you_think) {
      fetch("/submitBetaFeedback", {
        body: JSON.stringify(payload),
        cache: "no-cache",
        headers: {
          "content-type": "application/json"
        },
        method: "POST"
      }).catch(err => Raven.captureException(err));
    }
  };

  render() {
    const { t, questions, store, url } = this.props;
    const question = questions.filter(x => x.variable_name === "feedback")[0];

    console.log("question", question);
    console.log("t", t("current-language-code"));
    console.log("store", store);
    console.log("url", url);

    return (
      <form>
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
        <Details summary={t("feedback.details_question")} css={detailsStyle}>
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
          <Button
            id="send"
            arrow={true}
            css={leftMargin}
            onClick={() => {
              this.sendFeedback();
              this.props.onSend();
            }}
          >
            {t("send")}{" "}
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    questions: reduxState.questions,
    betaFeedback: reduxState.betaFeedback
  };
};

FeedbackForm.propTypes = {
  t: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  betaFeedback: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default withI18N(connect(mapStateToProps)(FeedbackForm));
