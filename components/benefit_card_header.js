import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import CardHeaderParentInfo from "./card_header_parent_info";
import CardHeaderImportantInfo from "./card_header_important_info";
import AlertIcon from "./icons/alert_icon";

const cardTop = css`
  border-bottom: 1px solid #8b8b8b;
  padding-bottom: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start; //center;
  align-items: center;
`;
const headerDesc = css`
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  margin-left: 20px;
  color: ${globalTheme.colour.greyishBrown};
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 12px;
  }
`;

export class BenefitCardHeader extends Component {
  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const { t, benefit, benefits } = this.props;
    const parentBenefits = benefits.filter(
      b => b.childBenefits && b.childBenefits.includes(benefit.id)
    );
    const includeParentInfo =
      parentBenefits.length > 0 &&
      benefit.availableIndependently === "Requires Gateway Benefit";
    const includeImportantInfo = benefit.noteEn && benefit.noteFr;

    if (includeParentInfo || includeImportantInfo) {
      return (
        <div className={cardTop}>
          <AlertIcon />
          <div className={headerDesc}>
            {includeParentInfo ? (
              <CardHeaderParentInfo
                t={t}
                benefit={benefit}
                parentBenefits={parentBenefits}
              />
            ) : null}
            {includeImportantInfo ? (
              <CardHeaderImportantInfo t={t} benefit={benefit} />
            ) : null}
          </div>
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
