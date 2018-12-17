/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { css, jsx } from "@emotion/core";
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

const grey = css`
  font-size: 18px;
  color: ${globalTheme.colour.brownishGrey};
  text-decoration: underline !important;
  padding: 0.526315em 0.789473em !important;
`;

class HeaderLink extends Component {
  render() {
    const {
      id,
      arrow,
      className,
      children,
      href,
      size,
      altStyle,
      onClick,
      otherProps
    } = this.props;

    return (
      <Link href={href}>
        <a
          css={
            size === "small"
              ? [style, small, className]
              : altStyle === "grey"
              ? [style, grey, className]
              : [style, className]
          }
          href={href}
          id={"a-" + id}
          onClick={onClick}
          {...otherProps}
        >
          {arrow === "back" ? <ArrowBack /> : null}
          {children}
          {arrow === "forward" ? <ArrowForward /> : null}
        </a>
      </Link>
    );
  }
}

HeaderLink.propTypes = {
  id: PropTypes.string,
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
