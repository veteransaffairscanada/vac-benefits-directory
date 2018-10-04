import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { logEvent } from "../utils/analytics";

const headerUrl = css`
  color: #006cc9;
`;

export class CardHeaderParentInfo extends Component {
  logExit = url => {
    logEvent("Exit", url);
  };

  benefitUrl = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.benefitPageEn
      : benefit.benefitPageFr;
  };

  benefitTitle = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.vacNameEn
      : benefit.vacNameFr;
  };

  get_benefit_a_elements = parentBenefits => {
    let a_elements = parentBenefits.map((b, i) => (
      <a
        key={"a" + i}
        className={headerUrl}
        href={this.benefitUrl(b)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => this.logExit(this.benefitUrl(b))}
      >
        {this.benefitTitle(b)}
      </a>
    ));

    let a_elements_with_ors = [];
    a_elements.forEach((value, index) => {
      if (a_elements.length - 1 !== index) {
        a_elements_with_ors = a_elements_with_ors.concat([
          value,
          <span key={"b" + index}> {" " + this.props.t("index.or")} </span>
        ]);
      } else {
        a_elements_with_ors = a_elements_with_ors.concat([
          value,
          <span key={"c" + index}> </span>
        ]);
      }
    });
    return a_elements_with_ors;
  };

  render() {
    const { parentBenefits, benefit, t } = this.props;

    return (
      <React.Fragment>
        <span>{t("benefits_b.card_header_1") + " "}</span>
        {this.get_benefit_a_elements(parentBenefits)}{" "}
        <span>
          {t("benefits_b.card_header_2") +
            " " +
            this.benefitTitle(benefit) +
            "."}
        </span>
      </React.Fragment>
    );
  }
}

CardHeaderParentInfo.propTypes = {
  benefit: PropTypes.object.isRequired,
  parentBenefits: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
};

export default CardHeaderParentInfo;
