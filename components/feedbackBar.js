import React, { Component } from "react";
import PropTypes from "prop-types";
import SubmitButton from "./button";
import { logEvent } from "../utils/analytics";
import Raven from "raven-js";
import TextField from "@material-ui/core/TextField";
import { css } from "react-emotion";
import FooterButton from "./footer_button";
import { globalTheme } from "../theme";
require("isomorphic-fetch");

const CommentBox = css`
  height: 350px;
  background-color: ${globalTheme.colour.greyishBrownTwo};
  color: ${globalTheme.colour.white};
  text-align: left;
  font-size: 14px;
  padding: 5px 0 0 0;
`;
const Div = css`
  background-color: ${globalTheme.colour.greyishBrownTwo};
  width: 100%;
  height: 53px;
  color: ${globalTheme.colour.white};
  text-align: left;
  font-size: 14px;
  display: table;
  @media (max-width: 400px) {
    height: 100px;
  }
`;
const FeedbackWrapper = css`
  margin-top: 25px;
`;
const Inner = css`
  color: ${globalTheme.colour.white};
  font-size: 14px;
  padding-top: 10px;
  @media (max-width: 400px) {
    font-size: 16px;
    button {
      margin-top: 10px;
    }
  }
`;
const TextHold = css`
  background-color: ${globalTheme.colour.greyishBrownTwo};
  padding: 10px 0;
`;
const white = css`
  color: white;
`;
export class FeedbackBar extends Component {
  state = {
    action: "",
    commentFormToggled: false,
    commentSubmitted: false,
    failure: "",
    feedbackSubmitted: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  cancelComment = () => {
    this.setState({ commentFormToggled: false });
  };

  sendComment = () => {
    this.setState({ commentFormToggled: false });
    this.setState({ commentSubmitted: true });
    let payload = {
      whatWereYouDoing: this.state.action,
      whatWentWrong: this.state.failure,
      url: window.location.href,
      time: new Date().toUTCString()
    };

    fetch("/submitComment", {
      body: JSON.stringify(payload),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    }).catch(err => Raven.captureException(err));
  };

  sendFeedback = answer => {
    this.setState({ feedbackSubmitted: true });
    logEvent("Page Feedback (" + this.props.t("feedback-prompt") + ")", answer);
    if (answer == "No") {
      this.setState({ commentFormToggled: true });
    }
  };

  toggleCommentForm = () => {
    this.setState({ commentFormToggled: !this.state.commentFormToggled });
  };

  render() {
    const { t } = this.props;

    return (
      <div className={FeedbackWrapper} role="navigation">
        {this.state.commentFormToggled ? (
          <div className={CommentBox}>
            <h2>{t("comment-help-us-improve")}</h2>
            <p>{t("comment-privacy-disclaimer")}</p>
            <div className={TextHold}>
              <TextField
                inputProps={{
                  style: {
                    backgroundColor: "white",
                    marginTop: "10px",
                    padding: "10px"
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                  style: { color: "white", fontSize: "18px" }
                }}
                id="commentWhatWereYouDoing"
                label={t("comment-what-were-you-doing")}
                margin="normal"
                fullWidth={true}
                onChange={this.handleChange("action")}
                className={white}
                value={this.state.action}
                autoFocus
              />
              <TextField
                inputProps={{
                  style: {
                    backgroundColor: "white",
                    marginTop: "10px",
                    padding: "10px"
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                  style: { color: "white", fontSize: "18px" }
                }}
                id="commentWhatWentWrong"
                label={t("comment-what-went-wrong")}
                margin="normal"
                fullWidth={true}
                onChange={this.handleChange("failure")}
                value={this.state.failure}
              />
            </div>
            <br />
            <SubmitButton
              id="sendComment"
              arrow={true}
              size="big"
              onClick={() => this.sendComment()}
            >
              {t("send")}
            </SubmitButton>
            &nbsp; &nbsp;
            <FooterButton
              id="cancelComment"
              onClick={() => this.cancelComment()}
            >
              {t("cancel")}
            </FooterButton>
          </div>
        ) : null}
        <div className={Div}>
          {this.state.feedbackSubmitted ? (
            <div className={Inner}>
              <p>{t("feedback-response")}</p>
            </div>
          ) : (
            <div className={Inner}>
              {t("feedback-prompt")} &nbsp;
              <FooterButton
                id="feedbackYes"
                onClick={() => this.sendFeedback("Yes")}
              >
                {t("yes")}
              </FooterButton>
              &nbsp; &nbsp;
              <FooterButton
                id="feedbackNo"
                onClick={() => this.sendFeedback("No")}
              >
                {t("no")}
              </FooterButton>
            </div>
          )}
        </div>
      </div>
    );
  }
}

FeedbackBar.propTypes = {
  t: PropTypes.func.isRequired
};

export default FeedbackBar;
