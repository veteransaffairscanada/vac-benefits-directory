import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "material-ui";
import styled from "react-emotion";
import { logEvent } from "../utils/analytics";

const Div = styled("div")`
  width: 100%;
  height: 40px;
  background-color: #eee;
  color: #000;
  text-align: center;
  font-size: 14px;
  padding-top: 5px;
`;

const Inner = styled("div")`
  width: 100%;
  background-color: #eee;
  color: #000;
  text-align: center;
  font-size: 14px;
  padding-top: 10px;
`;

class FeedbackBar extends Component {
  state = {
    feedbackSubmitted: false
  };

  sendFeedback = answer => {
    this.setState({ feedbackSubmitted: true });
    logEvent("Page Feedback (" + this.props.t("feedback-prompt") + ")", answer);
  };

  render() {
    const { t } = this.props;

    if (this.state.feedbackSubmitted) {
      return (
        <Div role="navigation">
          <Typography style={{ flex: 1 }} />
          <Inner>{t("feedback-response")}</Inner>
          <Typography style={{ flex: 1 }} />
        </Div>
      );
    } else {
      return (
        <Div role="navigation">
          <Typography style={{ flex: 1 }} />
          {t("feedback-prompt")} &nbsp;
          <Button id="feedbackYes" onClick={() => this.sendFeedback("Yes")}>
            {t("yes")}
          </Button>
          <Button id="feedbackNo" onClick={() => this.sendFeedback("No")}>
            {t("no")}
          </Button>
          <Typography style={{ flex: 1 }} />
        </Div>
      );
    }
  }
}

FeedbackBar.propTypes = {
  t: PropTypes.func
};

export default FeedbackBar;
