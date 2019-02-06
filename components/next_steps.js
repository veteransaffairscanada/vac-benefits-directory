import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { globalTheme } from "../theme";
import Header from "./typography/header";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import JsxParser from "react-jsx-parser";
import { getFilteredNextSteps } from "../selectors/benefits";

const outerDiv = css`
  padding: 0px 12px;
  margin-right: 10px;
  width: 100%;
`;

const innerDiv = css`
  border-top: 5px solid ${globalTheme.colour.blackish};
  margin-top: 30px;
  margin-bottom: 12px;
  width: 10%;
`;

const whatsNextList = css`
  padding-left: 20px;
  width: 100%;
  color: ${globalTheme.colour.greyishBrown};
  font-family: Merriweather;
  font-size: 18px;
`;

const liItem = css`
  padding-bottom: 20px;
`;

const header = css`
  width: 100%;
`;

export class NextSteps extends Component {
  md = new MarkdownIt({ breaks: true });

  getBullets = () => {
    const { filteredNextSteps, t } = this.props;
    const lang = t("current-language-code") === "en" ? "english" : "french";

    return filteredNextSteps.map((x, n) => {
      let jsxString = this.md
        .render(x[lang])
        .replace("<p>", "<span>")
        .replace("</p>", "</span>");
      return (
        <li key={n} className={liItem}>
          <JsxParser jsx={jsxString} />
        </li>
      );
    });
  };

  render() {
    const { t } = this.props;
    const bullets = this.getBullets();
    console.log(JSON.stringify(this.props.reduxState.nextSteps));
    return (
      <div className={outerDiv}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Header
              className={header}
              size="md"
              headingLevel="h2"
              paddingTop="25"
              id="next-steps"
            >
              {t("nextSteps.whats_next")}
            </Header>

            <div className={innerDiv} />

            <ul id="nextStepsList" className={whatsNextList}>
              {bullets}
            </ul>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    filteredNextSteps: getFilteredNextSteps(reduxState, props),
    reduxState: reduxState
  };
};

NextSteps.propTypes = {
  t: PropTypes.func.isRequired,
  filteredNextSteps: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(NextSteps);
