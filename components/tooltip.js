import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { globalTheme } from "../theme";

const tooltipTextStyle = css`
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  visibility: hidden;
  width: 160px;
  background-color: ${globalTheme.colour.paleGrey};
  color: ${globalTheme.colour.greyishBrown};
  padding: 10px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 140%;
  left: 50%;
  margin-left: -80px;
`;

const tooltipStyle = css`
  position: relative;
  display: inline-block;
  :hover {
    .${tooltipTextStyle} {
      visibility: visible;
    }
   .${tooltipTextStyle}::after {
      content: " ";
      position: absolute;
      top: 100%; /* At the bottom of the tooltip */
      left: 50%;
      margin-left: -7px;
      border-width: 7px;
      border-style: solid;
      border-color: ${
        globalTheme.colour.paleGrey
      } transparent transparent transparent;
  }
`;

class Tooltip extends Component {
  render() {
    const { children, disabled, tooltipText } = this.props;
    return (
      <div className={tooltipStyle}>
        {children}
        {!disabled ? (
          <span className={tooltipTextStyle}>{tooltipText}</span>
        ) : null}
      </div>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  disabled: PropTypes.bool.isRequired,
  tooltipText: PropTypes.string,
  className: PropTypes.string
};

export default Tooltip;
