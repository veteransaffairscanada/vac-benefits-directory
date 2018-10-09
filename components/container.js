import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "react-emotion";

const style1 = css`
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
`;
const style2 = css`
  margin-left: 15px;
  margin-right: 15px;
`;

class Container extends Component {
  render() {
    return (
      <div className={style1}>
        <div
          className={
            this.props.className ? cx(style2, this.props.className) : style2
          }
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string
};

export default Container;
