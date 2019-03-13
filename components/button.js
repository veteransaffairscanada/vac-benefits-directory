/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import { globalTheme } from "../theme";

const StyledButton = styled("button")(
  {
    backgroundColor: globalTheme.colour.blackBlue,
    border: "none",
    color: "white",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: globalTheme.fontFamilySansSerif,
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "44px",
    outlineOffset: "-1px",
    outline: "1px solid transparent",
    padding: "0 1.2em",
    textDecoration: "none",
    WebkitAppearance: "none",
    WebkitFontSmoothing: "antialiased",
    ":hover": {
      backgroundColor: globalTheme.colour.navy,
      color: "white"
    },
    ":focus": {
      color: "white",
      backgroundColor: globalTheme.colour.navy
    },
    ":active": {
      position: "relative",
      top: "2px",
      boxShadow: `0 0 0 ${globalTheme.colour.navy}`
    },
    ":visited": {
      color: "white"
    },
    " svg": {
      verticalAlign: "middle"
    }
  },
  ({ isBig, hasArrow }) => ({
    fontSize: isBig ? "24px" : undefined,
    lineHeight: isBig ? "31px" : undefined,
    padding: isBig ? "14.5px 20px 12px 20px" : undefined,
    " svg": {
      height: isBig ? "31px" : undefined,
      width: isBig ? "36px" : undefined,
      marginRight: isBig && hasArrow ? "-8px" : undefined
    }
  }),
  ({ isSmall }) => ({
    fontSize: isSmall ? "14px" : undefined,
    lineHeight: isSmall ? "normal" : undefined,
    padding: isSmall ? "6px 10px 4px 12px" : undefined
  }),
  ({ isSecondary }) => ({
    backgroundColor: isSecondary ? globalTheme.colour.cerulean : undefined,
    ":hover": {
      backgroundColor: isSecondary ? globalTheme.colour.darkGreyBlue : undefined
    },
    ":focus": {
      backgroundColor: isSecondary
        ? globalTheme.colour.darkGreyBlue
        : undefined,
      outline: `3px solid ` + globalTheme.colour.focusColour
    },
    ":active": {
      boxShadow: isSecondary
        ? `0 0 0 ${globalTheme.colour.darkGreyBlue}`
        : undefined
    }
  })
);
const mobileFullWidth = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    width: 100%;
    margin-bottom: 6px;
  }
`;

// from: https://github.com/UKHomeOffice/govuk-react/blob/master/components/button/src/index.js

const Button = ({ size, secondary, children, icon, ...props }) => (
  <StyledButton
    icon={icon}
    isBig={size === "big"}
    isSmall={size === "small"}
    isSecondary={secondary}
    className={props.mobileFullWidth ? mobileFullWidth : ""}
    {...props}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  /**
   * Button text
   */
  children: PropTypes.node,
  /**
   * Button icon
   */
  icon: PropTypes.node,
  /**
   * Renders a large button if set to true
   */
  size: PropTypes.string,
  /**
   * Renders a disabled button and removes pointer events if set to true
   */
  secondary: PropTypes.bool,
  mobileFullWidth: PropTypes.bool
};

Button.defaultProps = {
  children: "Button",
  icon: undefined,
  size: "medium",
  secondary: false
};

export default Button;
