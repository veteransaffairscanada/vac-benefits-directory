import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "react-emotion";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";

const style = css`
  display: block;
  font-family: ${globalTheme.fontFamily};
  font-size: 21px;
  font-weight: bold;
  color: ${globalTheme.colour.cerulean};
  text-decoration: none !important;
`;

class HeaderAnchorLink extends Component {
  render() {
    const { arrow, className, children } = this.props;
    let propsCopy = JSON.parse(JSON.stringify(this.props));
    delete propsCopy.className;
    return (
      <a className={cx(style, className)} {...propsCopy}>
        {arrow === "left" ? <ArrowBack /> : ""}
        {children}
        {arrow === "right" ? <ArrowForward /> : ""}
      </a>
    );
  }
}

HeaderAnchorLink.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  arrow: PropTypes.string
};

export default HeaderAnchorLink;
