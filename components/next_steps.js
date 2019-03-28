import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import JsxParser from "react-jsx-parser";
import { getFilteredNextSteps } from "../selectors/benefits";

const whatsNextList = css`
  padding-left: 20px;
  margin-top: 10px;
  width: 100%;
  font-family: ${globalTheme.fontFamilySansSerif};
  color: ${globalTheme.colour.slateGrey};
  font-size: 18px;
`;

const liItem = css`
  padding-bottom: 20px;
  padding-right: 20px;
`;

export class NextSteps extends Component {
  md = new MarkdownIt({ breaks: true });

  getBullets = () => {
    const { filteredNextSteps, t } = this.props;
    const lang = t("current-language-code") === "en" ? "english" : "french";
    const utm = "?utm_source=fbas&utm_medium=referral&utm_content=next-steps";

    return filteredNextSteps.map((x, n) => {
      let jsxString = this.md
        .render(x[lang].replace(")", utm + ")"))
        .replace("<p>", "<span>")
        .replace("</p>", "</span>");
      return (
        <li key={n} css={liItem}>
          <JsxParser jsx={jsxString} />
        </li>
      );
    });
  };

  render() {
    const bullets = this.getBullets();
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ul id="nextStepsList" css={whatsNextList}>
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
    filteredNextSteps: getFilteredNextSteps(reduxState, props)
  };
};

NextSteps.propTypes = {
  t: PropTypes.func.isRequired,
  filteredNextSteps: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(NextSteps);
