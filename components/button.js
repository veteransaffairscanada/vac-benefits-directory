import { css } from "emotion";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import { globalTheme } from "../theme";
import KeyboardBackspace from "./icons/KeyboardBackspace";

const rightArrowIcon = css`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  filter: FlipH;
  -ms-filter: fliph;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    display: none !important;
  }
`;

const StyledButton = styled("button")(
  {
    backgroundColor: globalTheme.colour.fernGreen,
    border: "none",
    borderRadius: "3px",
    color: "white",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: globalTheme.fontFamily,
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "23px",
    outlineOffset: "-1px",
    outline: "1px solid transparent",
    padding: ".526315em .789473em",
    textDecoration: "none",
    WebkitAppearance: "none",
    WebkitFontSmoothing: "antialiased",
    verticalAlign: "middle",
    ":hover": {
      backgroundColor: globalTheme.colour.darkGreen,
      color: "white"
    },
    ":focus": {
      color: "white",
      backgroundColor: globalTheme.colour.darkGreen
    },
    ":active": {
      position: "relative",
      top: "2px",
      boxShadow: `0 0 0 ${globalTheme.colour.darkGreen}`
    },
    ":visited": {
      color: "white"
    },
    " svg": {
      verticalAlign: "middle"
    }
  },
  ({ hasArrow }) => ({
    " svg": {
      height: hasArrow ? "23px" : undefined,
      width: hasArrow ? "25px" : undefined,
      marginLeft: hasArrow ? "10px" : undefined
    }
  }),
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

// from: https://github.com/UKHomeOffice/govuk-react/blob/master/components/button/src/index.js

const Button = ({ size, secondary, arrow, children, icon, ...props }) => (
  <StyledButton
    icon={icon}
    isBig={size === "big"}
    isSmall={size === "small"}
    isSecondary={secondary}
    hasArrow={arrow}
    {...props}
  >
    {children}
    {arrow ? <KeyboardBackspace className={rightArrowIcon} /> : null}
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
  arrow: PropTypes.bool
};

Button.defaultProps = {
  children: "Button",
  icon: undefined,
  size: "medium",
  secondary: false,
  arrow: false
};

export default Button;
