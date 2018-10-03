import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { logEvent } from "../utils/analytics";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { globalTheme } from "../theme";

const cardTop = css`
  border-bottom: 1px solid #8b8b8b;
  padding-bottom: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const parentIcon = css`
  margin-right: 15px;
  font-size: 40px !important;
  transform: scale(0.9);
  color: #434343;
`;
const headerDesc = css`
  flex-grow: 1;
  color: #434343;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 12px;
  }
`;
const headerUrl = css`
  color: #006cc9;
`;

export class BenefitCardHeader extends Component {
  logExit = url => {
    logEvent("Exit", url);
  };

  componentDidMount() {
    this.forceUpdate();
  }

  benefitTitle = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.vacNameEn
      : benefit.vacNameFr;
  };

  benefitUrl = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.benefitPageEn
      : benefit.benefitPageFr;
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
    const { t, benefit, benefits } = this.props;
    const parentBenefits = benefits.filter(
      b => b.childBenefits && b.childBenefits.includes(benefit.id)
    );

    if (
      parentBenefits.length > 0 &&
      benefit.availableIndependently === "Requires Gateway Benefit"
    ) {
      return (
        <div className={cardTop}>
          <ErrorOutlineIcon className={parentIcon} />
          <span className={headerDesc}>
            <span>{t("benefits_b.card_header_1") + " "}</span>
            {this.get_benefit_a_elements(parentBenefits)}{" "}
            <span>
              {t("benefits_b.card_header_2") +
                " " +
                this.benefitTitle(benefit) +
                "."}
            </span>
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits
  };
};

BenefitCardHeader.propTypes = {
  benefits: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitCardHeader);
