import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core/";
import { logEvent } from "../utils/analytics";
import Raven from "raven-js";
import TextField from "@material-ui/core/TextField";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { css } from "react-emotion";
require("isomorphic-fetch");

const CommentBox = css`
  height: 350px;
  background-color: #505050;
  color: #fff;
  text-align: left;
  font-size: 14px;
  padding: 5px 0 0 0;
`;

const Div = css`
  background-color: #505050;
  width: 100%;
  height: 53px;
  color: #fff;
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
  color: #fff;
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
  background-color: #505050;
  padding: 10px 0;
  width: 400px;
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
        <div style={{ marginLeft: "15px", marginRight: "15px" }}>
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
                  style={{ color: "white" }}
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
              <Button
                id="sendComment"
                variant="contained"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={() => this.sendComment()}
              >
                {t("send")}
                &nbsp; &nbsp;
                <ArrowForward />
              </Button>
              &nbsp; &nbsp;
              <Button
                id="cancelComment"
                style={{ color: "#fff", textTransform: "none" }}
                onClick={() => this.cancelComment()}
              >
                {t("cancel")}
              </Button>
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
                <Button
                  variant="flat"
                  style={{ color: "#fff", textTransform: "none" }}
                  id="feedbackYes"
                  onClick={() => this.sendFeedback("Yes")}
                >
                  {t("yes")}
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="flat"
                  style={{ color: "#fff", textTransform: "none" }}
                  id="feedbackNo"
                  onClick={() => this.sendFeedback("No")}
                >
                  {t("no")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

FeedbackBar.propTypes = {
  t: PropTypes.func.isRequired
};

export default FeedbackBar;
