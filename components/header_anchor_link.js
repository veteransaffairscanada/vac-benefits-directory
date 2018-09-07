import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "react-emotion";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";

const style = css`
  display: inline-block;
  font-family: ${globalTheme.fontFamily};
  font-size: 21px;
  font-weight: bold;
  color: ${globalTheme.colour.cerulean};
  text-decoration: none !important;
  :hover {
    text-decoration: underline !important;
    cursor: pointer;
  }
  svg {
    margin-top: -4px;
    vertical-align: middle;
  }
`;
const small = css`
  font-size: 18px;
`;

class HeaderAnchorLink extends Component {
  render() {
    const {
      id,
      arrow,
      className,
      children,
      onClick,
      href,
      rel,
      target,
      size
    } = this.props;
    return (
      <a
        className={
          size === "small" ? cx(style, small, className) : cx(style, className)
        }
        id={"a-" + id}
        aria-label={this.props["aria-label"]}
        href={href}
        onClick={onClick}
        rel={rel}
        target={target}
      >
        {arrow === "back" ? <ArrowBack /> : null}
        {children}
        {arrow === "forward" ? <ArrowForward /> : null}
      </a>
    );
  }
}

HeaderAnchorLink.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  "aria-label": PropTypes.string,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  className: PropTypes.string,
  arrow: PropTypes.string,
  label: PropTypes.object,
  onClick: PropTypes.func
};

export default HeaderAnchorLink;
