import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "emotion";
import { globalTheme } from "../theme";

const style = css`
  max-width: 1170px;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const mobileFullWidth = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

class Container extends Component {
  render() {
    let className = style;
    if (this.props.className)
      className = this.props.mobileFullWidth
        ? cx(style, mobileFullWidth, this.props.className)
        : cx(style, this.props.className);
    else if (this.props.mobileFullWidth) className = cx(style, mobileFullWidth);
    return (
      <div className={className} id={this.props.id ? this.props.id : ""}>
        {this.props.children}
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  id: PropTypes.string,
  mobileFullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default Container;
