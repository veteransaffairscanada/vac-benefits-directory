import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "emotion";

const style = css`
  display: inline-block;
  padding: 0 1.2em;
  text-align: center;
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 24px;
  line-height: 44px;
  font-weight: bold;
  color: ${globalTheme.colour.slateGrey};
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
  color: ${globalTheme.colour.brownishGrey};
  margin-left: 20px;
  text-decoration: underline !important;
  padding: 0;
`;

class HeaderButton extends Component {
  render() {
    const {
      id,
      className,
      children,
      size,
      altStyle,
      disabled,
      hasBorder,
      onClick,
      ariaLabel,
      ...otherProps
    } = this.props;

    let cName = [className];
    if (size === "small") cName.unshift(small);
    if (altStyle === "grey") cName.unshift(grey);
    if (hasBorder === true) cName.unshift(borderStyle);
    cName.unshift(style);

    return (
      <button
        aria-label={ariaLabel}
        disabled={disabled}
        className={cx(cName)}
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
  className: PropTypes.string,
  label: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default HeaderButton;
