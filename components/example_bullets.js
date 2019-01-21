import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "emotion";
import { globalTheme } from "../theme";
import Highlighter from "react-highlight-words";

const margin = css`
  padding-left: 20px;
  @media only screen and (min-width: ${globalTheme.max.sm}) {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }
  li {
    margin-bottom: 10px;
    margin-left: 6px; // this is so bullets appear in 2nd column in IE
  }
  margin-left: -6px;
`;

const root = css`
  border-bottom: thin dashed ${globalTheme.colour.lineGrey};
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
    const { t } = this.props;
    const bullets = this.getExampleBullets();

    if (bullets.length === 0) {
      return null;
    }
    return (
      <div className={root}>
        {t("benefit_card.examples")}
        <ul className={margin}>{bullets}</ul>
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
  searchString: PropTypes.string.isRequired,
  benefitExamples: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(ExampleBullets);
