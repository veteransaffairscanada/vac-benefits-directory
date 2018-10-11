import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { globalTheme } from "../theme";

const padding = 16;

class Tooltip extends Component {
  tooltipTextStyle = css`
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    visibility: hidden;
    width: ${this.props.width}px;
    background-color: ${globalTheme.colour.paleGrey};
    color: ${globalTheme.colour.greyishBrown};
    padding: ${padding}px;
    // border-radius: 6px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    margin-bottom: 10px;
    left: 50%;
    margin-left: -${0.5 * this.props.width + padding}px;
  `;

  tooltipStyle = css`
    position: relative;
    display: inline-block;
    :hover {
      .${this.tooltipTextStyle} {
        visibility: visible;
      }
     .${this.tooltipTextStyle}::after {
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

  render() {
    const { children, disabled, tooltipText } = this.props;
    return (
      <div className={this.tooltipStyle}>
        {children}
        {!disabled ? (
          <span className={this.tooltipTextStyle}>{tooltipText}</span>
        ) : null}
      </div>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  tooltipText: PropTypes.string,
  className: PropTypes.string
};

Tooltip.defaultProps = {
  disabled: false,
  width: 200,
  tooltipText: "tooltip text"
};

export default Tooltip;
