import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "react-emotion";
import { globalTheme } from "../theme";

class Paper extends Component {
  padding = { sm: "24px", md: "35px", lg: "63px", xl: "96px" };
  paddingMobile = { sm: "15px", md: "19px", lg: "35px", xl: "45px" };
  style = css`
    box-shadow: ${globalTheme.boxShadowMui};
    padding: ${this.padding[this.props.padding]};
    background-color: white;
    box-sizing: border-box;
    width: 100%;
    @media only screen and (max-width: ${globalTheme.max.xs}) {
      padding: ${this.paddingMobile[this.props.padding]};
    }
  `;
  render() {
    return (
      <div
        className={
          this.props.className
            ? cx(this.style, this.props.className)
            : this.style
        }
      >
        {this.props.children}
      </div>
    );
  }
}

Paper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  padding: PropTypes.string,
  className: PropTypes.string
};

export default Paper;
