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
`;
const small = css`
  font-size: 18px;
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
      disabled,
      useLink,
      otherProps
    } = this.props;

    const anchor = (
      <a
        disabled={disabled}
        className={
          size === "small" ? cx(style, small, className) : cx(style, className)
        }
        href={href}
        target={target}
        id={"a-" + id}
        onMouseOver={this.props.onMouseOver}
        {...otherProps}
      >
        {arrow === "back" ? <ArrowBack /> : null}
        {children}
        {arrow === "forward" ? <ArrowForward /> : null}
      </a>
    );
    // If the useLink prop is specified, wrap the anchor in a next Link to preserve data in Redux
    if (useLink) {
      return <Link href={this.props.href}>{anchor}</Link>;
    } else {
      return anchor;
    }
  }
}

HeaderButton.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
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
