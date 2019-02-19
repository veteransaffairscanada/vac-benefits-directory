import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "emotion";
import ArrowBack from "./icons/ArrowBack";
import ArrowForward from "./icons/ArrowForward";
import Link from "next/link";

const style = css`
  display: inline-block;
  padding: 0.526315em 0;
  text-align: left;
  font-family: ${globalTheme.fontFamily};
  font-size: 21px;
  font-weight: bold;
  color: ${globalTheme.colour.cerulean};
  background-color: transparent;
  border: none;
  text-decoration: none;
  :hover {
    text-decoration: underline !important;
    cursor: pointer;
  }
  svg {
    margin-top: -4px;
    vertical-align: middle;
    padding-right: 10px;
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;
const small = css`
  font-size: 18px;
`;

const nowrap = css`
  white-space: nowrap;
`;

const grey = css`
  font-size: 18px;
  color: ${globalTheme.colour.brownishGrey};
  text-decoration: underline !important;
  padding: 0.526315em 0.789473em !important;
`;

class HeaderLink extends Component {
  render() {
    const {
      arrow,
      className,
      children,
      href,
      size,
      altStyle,
      onClick,
      ...otherProps
    } = this.props;

    return (
      <Link href={href}>
        <a
          className={
            size === "small"
              ? cx(style, small, className)
              : altStyle === "grey"
              ? cx(style, grey, className)
              : cx(style, className)
          }
          href={href}
          onClick={onClick}
          {...otherProps}
        >
          {arrow === "back" ? <ArrowBack /> : null}
          {children}
          {arrow === "forward" ? (
            <span className={nowrap}>
              &nbsp;
              <ArrowForward />
            </span>
          ) : null}
        </a>
      </Link>
    );
  }
}

HeaderLink.propTypes = {
  size: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  className: PropTypes.string,
  arrow: PropTypes.string,
  label: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  href: PropTypes.string
};

export default HeaderLink;
