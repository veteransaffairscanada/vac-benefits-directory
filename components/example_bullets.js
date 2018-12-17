import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";
import { globalTheme } from "../theme";

const margin = css`
  padding-left: 20px;
  @media only screen and (min-width: ${globalTheme.max.sm}) {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }
  li {
    margin-bottom: 10px;
  }
`;
const colour = css`
  color: ${globalTheme.colour.greyishBrown};
`;

class ExampleBullets extends Component {
  getExampleBullets = () => {
    const { benefitExamples, benefit, t } = this.props;
    const lang = t("current-language-code") === "en" ? "english" : "french";
    return benefitExamples
      .filter(x => x.linked_benefits.indexOf(benefit.vacNameEn) > -1)
      .map((x, i) => {
        return <li key={i}>{x[lang]}</li>;
      });
  };

  render() {
    const { t } = this.props;
    const bullets = this.getExampleBullets();
    return (
      <div className={colour}>
        {t("benefit_card.examples")}
        <ul className={margin}>{bullets}</ul>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefitExamples: reduxState.benefitExamples
  };
};

ExampleBullets.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  benefitExamples: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default connect(mapStateToProps)(ExampleBullets);
