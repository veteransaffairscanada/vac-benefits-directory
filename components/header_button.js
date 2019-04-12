import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const style = css`
  display: inline-block;
  padding: 0 1.2em;
  text-align: center;
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 24px;
  font-weight: bold;
  color: ${globalTheme.colour.charcoalGrey};
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
  margin-left: 20px;
  text-decoration: underline !important;
  padding: 0;
`;

class HeaderButton extends Component {
  render() {
    const {
      id,
      children,
      size,
      altStyle,
      disabled,
      hasBorder,
      onClick,
      ariaLabel,
      ...otherProps
    } = this.props;

    let cName = [this.props.styles];
    if (size === "small") cName.unshift(small);
    if (altStyle === "grey") cName.unshift(grey);
    if (hasBorder === true) cName.unshift(borderStyle);
    cName.unshift(style);

    return (
      <button
        aria-label={ariaLabel}
        disabled={disabled}
        css={cName}
        id={"a-" + id}
        onClick={onClick}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

HeaderButton.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  styles: PropTypes.object,
  label: PropTypes.object,
  disabled: PropTypes.bool,
  hasBorder: PropTypes.bool,
  altStyle: PropTypes.string,
  onClick: PropTypes.func
};

export default HeaderButton;
