import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "react-emotion";
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
  text-decoration: none !important;
  padding: 0px !important;
  :hover {
    text-decoration: underline !important;
    cursor: pointer;
  }
  svg {
    margin-top: -4px;
    vertical-align: middle;
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;
const small = css`
  font-size: 18px;
`;

const grey = css`
  font-size: 18px;
  color: ${globalTheme.colour.brownishGrey};
  text-decoration: underline !important;
  padding: 0.526315em 0.789473em !important;
`;

class HeaderButton extends Component {
  render() {
    const {
      id,
      arrow,
      className,
      children,
      href,
      target,
      size,
      altStyle,
      disabled,
      useLink,
      otherProps
    } = this.props;

    // If the useLink prop is specified, wrap an anchor in a next Link to preserve data in Redux
    // If no useLink, it should render as a button
    if (useLink) {
      return (
        <Link href={this.props.href}>
          <a
            className={
              size === "small"
                ? cx(style, small, className)
                : altStyle === "grey"
                  ? cx(style, grey, className)
                  : cx(style, className)
            }
            href={href}
            onClick={this.props.onClick}
            target={target}
            id={"a-" + id}
            onMouseOver={this.props.onMouseOver}
            {...otherProps}
          >
            {arrow === "back" ? <ArrowBack /> : null}
            {children}
            {arrow === "forward" ? <ArrowForward /> : null}
          </a>
        </Link>
      );
    } else {
      return (
        <button
          aria-label={this.props.ariaLabel}
          disabled={disabled}
          className={
            size === "small"
              ? cx(style, small, className)
              : altStyle === "grey"
                ? cx(style, grey, className)
                : cx(style, className)
          }
          href={href}
          onClick={this.props.onClick}
          target={target}
          id={"a-" + id}
          onMouseOver={this.props.onMouseOver}
          {...otherProps}
        >
          {arrow === "back" ? <ArrowBack /> : null}
          {children}
          {arrow === "forward" ? <ArrowForward /> : null}
        </button>
      );
    }
  }
}

HeaderButton.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
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
  onMouseOver: PropTypes.func,
  disabled: PropTypes.bool,
  useLink: PropTypes.bool
};

export default HeaderButton;
