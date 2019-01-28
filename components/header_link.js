import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "emotion";
import ArrowBack from "./icons/ArrowBack";
import ArrowForward from "./icons/ArrowForward";
import Link from "next/link";

const style = css`
  display: inline-block;
  text-align: left;
  font-family: ${globalTheme.fontFamily};
  font-size: 21px;
  font-weight: bold;
  color: ${globalTheme.colour.cerulean};
  background-color: transparent;
  border: none;
  text-decoration: none;
  padding: 0px !important;
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
const fullWidth = css`
  width: 100%;
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

    let cName;
    if (size === "small") cName = cx(style, small, className);
    else if (size === "fullWidth") cName = cx(style, fullWidth, className);
    else if (altStyle === "grey") cName = cx(style, grey, className);
    else cName = cx(style, className);

    return (
      <Link href={href}>
        <a className={cName} href={href} onClick={onClick} {...otherProps}>
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
  disabled: PropTypes.bool
};

export default HeaderLink;
