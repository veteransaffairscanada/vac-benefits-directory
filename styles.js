import { css } from "react-emotion";

/*This function is usually for hover events and such
  col: is the color in hex
  amt: is how much you want to darken or lighten, 20 is a good start.
*/

export const breakpoints = {
  xs: 481,
  sm: 578,
  md: 764,
  base: 764,
  lg: 992,
  xl: 1325
};

export const theme = {
  spacing: {
    xxs: "0.17rem",
    xs: "0.33rem",
    sm: "0.5rem",
    md: "1.0rem",
    base: "1.0rem",
    lg: "1.3rem",
    xl: "2rem",
    xxl: "3rem",
    xxxl: "4.5rem"
  }
};

/* eslint-disable security/detect-object-injection */

export const mediaQuery = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    let prefix = typeof breakpoints[label] === "string" ? "" : "max-width:";
    let suffix = typeof breakpoints[label] === "string" ? "" : "px";
    accumulator[label] = cls =>
      css`
        @media screen and (${prefix + breakpoints[label] + suffix}) {
          ${cls};
        }
      `;
    return accumulator;
  },
  {}
);
