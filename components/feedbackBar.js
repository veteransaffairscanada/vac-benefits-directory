import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";
import styled from "react-emotion";
import { logEvent } from "../utils/analytics";
import TextField from "material-ui/TextField";
require("isomorphic-fetch");

const CommentBox = styled("div")`
  height: 300px;
  background-color: #eee;
  color: #000;
  text-align: left;
  font-size: 14px;
  padding: 5px 0 0 15px;
  border-bottom: 1px solid #ddd;
`;

const Div = styled("div")`
  width: 100%;
  height: 50px;
  background-color: #eee;
  color: #000;
  text-align: left;
  font-size: 14px;
  padding-top: 5px;
  display: table;
`;

const Inner = styled("div")`
  background-color: #eee;
  color: #000;
  text-align: left;
  font-size: 14px;
  float: left;
  padding-left: 15px;
`;

const InnerRight = styled("div")`
  background-color: #eee;
  color: #000;
  text-align: right;
  font-size: 14px;
  padding: 10px 40px 0 0;
  float: right;
`;

const TextHold = styled("div")`
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
    });
  };

  sendFeedback = answer => {
    this.setState({ feedbackSubmitted: true });
    logEvent("Page Feedback (" + this.props.t("feedback-prompt") + ")", answer);
  };

  toggleCommentForm = () => {
    this.setState({ commentFormToggled: !this.state.commentFormToggled });
  };

  render() {
    const { t } = this.props;

    return (
      <div role="navigation">
        {this.state.commentFormToggled ? (
          <CommentBox>
            <h2>{t("comment-help-us-improve")}</h2>
            <p>{t("comment-privacy-disclaimer")}</p>
            <TextHold>
              <TextField
                id="commentWhatWereYouDoing"
                label={t("comment-what-were-you-doing")}
                margin="normal"
                fullWidth={true}
                onChange={this.handleChange("action")}
                value={this.state.action}
              />
            </TextHold>
            <TextHold>
              <TextField
                id="commentWhatWentWrong"
                label={t("comment-what-went-wrong")}
                margin="normal"
                fullWidth={true}
                onChange={this.handleChange("failure")}
                value={this.state.failure}
              />
            </TextHold>
            <br />
            <Button
              id="sendComment"
              variant="raised"
              onClick={() => this.sendComment()}
            >
              {t("send")}
            </Button>
          </CommentBox>
        ) : null}
        <Div>
          {this.state.feedbackSubmitted ? (
            <Inner>
              <p>{t("feedback-response")}</p>
            </Inner>
          ) : (
            <Inner>
              {t("feedback-prompt")} &nbsp;
              <Button id="feedbackYes" onClick={() => this.sendFeedback("Yes")}>
                {t("yes")}
              </Button>
              <Button id="feedbackNo" onClick={() => this.sendFeedback("No")}>
                {t("no")}
              </Button>
            </Inner>
          )}
          {this.state.commentSubmitted ? (
            <InnerRight>{t("comment-response")}</InnerRight>
          ) : (
            <InnerRight>
              <span
                id="commentToggle"
                style={{ cursor: "pointer" }}
                onClick={() => this.toggleCommentForm()}
              >
                {t("comment-prompt")}
              </span>
            </InnerRight>
          )}
        </Div>
      </div>
    );
  }
}

FeedbackBar.propTypes = {
  t: PropTypes.func
};

export default FeedbackBar;
