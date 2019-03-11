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

const vacStyle = css`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  :after,
  :before {
    display: table;
    content: " ";
  }
  :after {
    clear: both;
  }
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

const mobileFullWidth = css`
  // @media only screen and (max-width: ${globalTheme.max.xs}) {
  //   padding-left: 0px;
  //   padding-right: 0px;
  // }
`;

class Container extends Component {
  render() {
    let className = vacStyle;
    if (this.props.className)
      className = this.props.mobileFullWidth
        ? cx(vacStyle, mobileFullWidth, this.props.className)
        : cx(vacStyle, this.props.className);
    else if (this.props.mobileFullWidth)
      className = cx(vacStyle, mobileFullWidth);
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
