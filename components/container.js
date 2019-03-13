import React, { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const vacStyle = css`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
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

const morePaddingIfBig = css`
  position: relative;
  min-height: 1px;
  @media (min-width: 768px) {
    padding-right: 15px;
    padding-left: 15px;
  }
`;

class Container extends Component {
  render() {
    let className = vacStyle;
    if (this.props.className) className = cx(vacStyle, this.props.className);
    return (
      <div className={className} id={this.props.id ? this.props.id : ""}>
        <div className={morePaddingIfBig}>{this.props.children}</div>
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
