import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "react-emotion";

const style = css`
  max-width: 1170px;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;
`;

class Container extends Component {
  render() {
    return (
      <div
        className={
          this.props.className ? cx(style, this.props.className) : style
        }
      >
        {this.props.children}
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string
};

export default Container;
