import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { globalTheme } from "../../theme";

export class AlertIcon extends Component {
  outer = css`
    height: ${this.props.height};
    width: ${this.props.height};
  `;
  inner = css`
    height: ${this.props.height};
    width: ${this.props.height} !important;
  `;

  render() {
    return (
      <div className={this.outer}>
        <svg
          role="img"
          aria-label={this.props.t("alt_text.important")}
          width={this.props.height}
          height={this.props.height}
          viewBox="0 0 25 22"
          xmlns="http://www.w3.org/2000/svg"
          className={this.inner}
        >
          <path
            d="M11,0 C4.928,0 0,4.928 0,11 C0,17.072 4.928,22 11,22 C17.072,22 22,17.072 22,11 C22,4.928 17.072,0 11,0 L11,0 Z M12.1,16.5 L9.9,16.5 L9.9,14.3 L12.1,14.3 L12.1,16.5 L12.1,16.5 Z M12.1,12.1 L9.9,12.1 L9.9,5.5 L12.1,5.5 L12.1,12.1 L12.1,12.1 Z"
            fill={globalTheme.colour.alertYellow}
          />
          <rect fill="black" x="9.9" y="5.5" width="2.2" height="6.6" />
          <rect fill="black" x="9.9" y="14.3" width="2.2" height="2.2" />
        </svg>
      </div>
    );
  }
}

AlertIcon.propTypes = {
  height: PropTypes.string,
  t: PropTypes.func.isRequired
};

AlertIcon.defaultProps = {
  height: "30px"
};

export default AlertIcon;
