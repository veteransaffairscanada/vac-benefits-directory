import styled, { css } from "react-emotion";
import PropTypes from "prop-types";
import React from "react";
import { globalTheme } from "../theme";
import { KeyboardBackspace } from "@material-ui/icons";

const rightArrowIcon = css`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  filter: FlipH;
  -ms-filter: fliph;
`;

const StyledButton = styled("a")(
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
    ":hover": {
      backgroundColor: globalTheme.colour.darkGreen,
      color: "white"
    },
    ":focus": {
      color: "white",
      backgroundColor: globalTheme.colour.darkGreen,
      outline: `3px solid #FFBF47`
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
  ({ isBig, icon }) => ({
    fontSize: isBig ? "24px" : undefined,
    lineHeight: isBig ? "31px" : undefined,
    padding: isBig ? ".36842em .84211em" : undefined,
    paddingRight: icon ? ".54211em" : ".84211em",
    " svg": {
      height: isBig ? "31px" : undefined,
      width: isBig ? "36px" : undefined
    }
  }),
  ({ isSecondary }) => ({
    backgroundColor: isSecondary ? globalTheme.colour.cerulean : undefined,
    ":hover": {
      backgroundColor: isSecondary ? globalTheme.colour.darkGreyBlue : undefined
    },
    ":focus": {
      backgroundColor: isSecondary ? globalTheme.colour.darkGreyBlue : undefined
    },
    ":active": {
      boxShadow: isSecondary
        ? `0 0 0 ${globalTheme.colour.darkGreyBlue}`
        : undefined
    }
  })
);

/**
 *
 * ### Usage
 *
 * Simple
 * ```jsx
 * <Button>My button text</Button>
 * ```
 *
 * With Icon
 * ```jsx
 * import { ButtonArrow } from '@govuk-react/icons';
 *
 * <Button icon={<ButtonArrow />}>My button text</Button>
 * ```
 *
 * ### References:
 * - https://govuk-elements.herokuapp.com/buttons/
 * - https://github.com/alphagov/govuk_frontend_toolkit/blob/master/stylesheets/design-patterns/_buttons.scss
 * - https://github.com/alphagov/govuk-frontend/blob/master/src/components/button/_button.scss
 * - https://github.com/alphagov/govuk_elements/blob/master/packages/govuk-elements-sass/public/sass/elements/_buttons.scss
 *
 * ### TODO:
 * - Use constants for some of the values cssinjs values
 * - Remove cascade styling for nested elements such as `svg`
 */
const Button = ({ big, secondary, arrow, children, icon, ...props }) => (
  <StyledButton
    icon={icon}
    isBig={big}
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
  big: PropTypes.bool,
  /**
   * Renders a disabled button and removes pointer events if set to true
   */
  secondary: PropTypes.bool,
  arrow: PropTypes.bool
};

Button.defaultProps = {
  children: "Button",
  icon: undefined,
  big: false,
  secondary: false,
  arrow: false
};

export default Button;
