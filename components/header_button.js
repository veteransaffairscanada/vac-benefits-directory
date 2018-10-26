import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import Router from "next/router";
import { cx, css } from "react-emotion";
import ArrowBack from "./icons/ArrowBack";
import ArrowForward from "./icons/ArrowForward";

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
  buttonOnClick = (e, href, target, useLink, onClick) => {
    if (href) {
      if (target) {
        window.open(href, target);
      } else if (useLink) {
        Router.push(href);
      } else {
        window.location.assign(href);
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  render() {
    const {
      id,
      arrow,
      className,
      children,
      onClick,
      href,
      target,
      size,
      disabled,
      useLink,
      otherProps
    } = this.props;

    return (
      <a
        disabled={disabled}
        className={
          size === "small" ? cx(style, small, className) : cx(style, className)
        }
        href={href}
        target={target}
        id={"a-" + id}
        onClick={e => this.buttonOnClick(e, href, target, useLink, onClick)}
        onMouseOver={this.props.onMouseOver}
        {...otherProps}
      >
        {arrow === "back" ? <ArrowBack /> : null}
        {children}
        {arrow === "forward" ? <ArrowForward /> : null}
      </a>
    );
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
