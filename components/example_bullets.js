import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "emotion";
import { globalTheme } from "../theme";
import Highlighter from "react-highlight-words";
import CardDetails from "./card_details";

const margin = css`
  padding-left: 5px;
  font-family: ${globalTheme.fontFamilySansSerif};
  @media only screen and (min-width: ${globalTheme.max.sm}) {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }
  li {
    margin-bottom: 10px;
    margin-left: 6px; // this is so bullets appear in 2nd column in IE
    list-style: disc;
    overflow: hidden; // fixes a bug with text wrapping in IE
    list-style: inside;
    text-indent: -1.4em;
    padding-left: 1.4em;
  }
  margin: 16px 0px 16px -6px;
`;

const root = css`
  color: ${globalTheme.colour.greyishBrown};
`;
export class ExampleBullets extends React.Component {
  getExampleBullets = () => {
    const { benefitExamples, benefit, t, searchString } = this.props;
    const searchWords = searchString.split(/\s+/);
    const lang = t("current-language-code") === "en" ? "english" : "french";
    return benefitExamples
      .filter(x => {
        if ("linked_benefits" in x) {
          return x.linked_benefits.indexOf(benefit.vacNameEn) > -1;
        }
        return false;
      })
      .map((x, i) => {
        return (
          <li key={i}>
            <Highlighter
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={x[lang]}
            />
          </li>
        );
      });
  };

  render() {
    const { benefit, t } = this.props;
    const bullets = this.getExampleBullets();
    if (bullets.length === 0) {
      return null;
    }
    return (
      <div className={root}>
        <CardDetails
          summary={
            t("current-language-code") === "en"
              ? benefit.seeMoreSentenceEn
              : benefit.seeMoreSentenceFr
          }
        >
          <ul className={margin}>{bullets}</ul>
        </CardDetails>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefitExamples: reduxState.benefitExamples,
    searchString: reduxState.searchString
  };
};

ExampleBullets.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired, // not used, just to trigger re-render
  searchString: PropTypes.string.isRequired,
  benefitExamples: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(ExampleBullets);
