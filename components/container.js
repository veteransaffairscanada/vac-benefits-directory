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
    padding-left: 0px;
    padding-right: 0px;
  }
`;

class Container extends Component {
  render() {
    return (
      <div
        className={
          this.props.className ? cx(style, this.props.className) : style
        }
        id={this.props.id ? this.props.id : ""}
      >
        {this.props.children}
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  id: PropTypes.string,
  className: PropTypes.string
};

export default Container;
