import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import CardHeaderParentInfo from "./card_header_parent_info";
import CardHeaderImportantInfo from "./card_header_important_info";

const thing = css`
  background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>');
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
`;

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
  color: ${globalTheme.colour.greyishBrown};
`;
const headerDesc = css`
  flex-grow: 1;
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
          <span className={thing} />
          <span className={headerDesc}>
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
