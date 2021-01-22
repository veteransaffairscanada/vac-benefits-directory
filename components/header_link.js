import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Link from "next/link";

const style = css`
  display: inline-block;
  padding: 0 1.2em;
  text-align: center;
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 24px;
  font-weight: bold;
  color: ${globalTheme.colour.greyishBrown};
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

const borderStyle = css`
  border: thin solid ${globalTheme.colour.warmGrey};
  line-height: 42px;
`;

const small = css`
  font-size: 18px;
  padding: 0;
`;

const grey = css`
  font-size: 18px;
  text-decoration: underline !important;
  padding: 0;
`;

class HeaderLink extends Component {
  render() {
    const {
      css,
      children,
      href,
      size,
      hasBorder,
      altStyle,
      onClick,
      ...otherProps
    } = this.props;

    let cName = [css];
    if (size === "small") cName.unshift(small);
    if (altStyle === "grey") cName.unshift(grey);
    if (hasBorder === true) cName.unshift(borderStyle);
    cName.unshift(style);

    return (
      <Link href={href}>
        <a css={cName} href={href} onClick={onClick} {...otherProps}>
          {children}
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
  css: PropTypes.string,
  label: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  hasBorder: PropTypes.bool,
  altStyle: PropTypes.string,
  href: PropTypes.string
};

export default HeaderLink;
