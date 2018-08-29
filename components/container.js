import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";

const style = css`
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
`;

class Container extends Component {
  render() {
    return <div className={style}>{this.props.children}</div>;
  }
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Container;
