import { Component } from "react";
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
    let css = vacStyle;
    if (this.props.className) css = [vacStyle, this.props.className];
    return (
      <div css={css} id={this.props.id ? this.props.id : ""}>
        <div css={morePaddingIfBig}>{this.props.children}</div>
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  id: PropTypes.string,
  mobileFullWidth: PropTypes.bool,
  className: PropTypes.object
};

export default Container;
