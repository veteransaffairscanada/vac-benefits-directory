import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { connect } from "react-redux";
import { css } from "react-emotion";

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
`;

export class BenefitCardHeaderMoreInfo extends Component {
  componentDidMount() {
    this.forceUpdate();
  }

  benefitNote = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.noteEn
      : benefit.noteFr;
  };

  render() {
    const { benefit } = this.props;

    if (benefit.noteEn !== undefined && benefit.noteFr !== undefined) {
      return (
        <div className={cardTop}>
          <ErrorOutlineIcon className={parentIcon} />
          <span className={headerDesc}>{this.benefitNote(benefit)}</span>
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

BenefitCardHeaderMoreInfo.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitCardHeaderMoreInfo);
