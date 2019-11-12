import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { globalTheme } from "../theme";

const Green = css`
  border-top: 8px solid ${globalTheme.colour.borderGreen};
`;

export class GreenBanner extends Component {
  render() {
    return <div className={Green} />;
  }
}

export default GreenBanner;
