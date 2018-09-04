import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "react-emotion";

const root = css`
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #434343;
  margin-bottom: 25px;
`;

export class Body extends Component {
  render() {
    return (
      <div className={cx(root, this.props.classname)}>
        {this.props.children}
      </div>
    );
  }
}

Body.propTypes = {
  children: PropTypes.object,
  classname: PropTypes.string
};

export default Body;
