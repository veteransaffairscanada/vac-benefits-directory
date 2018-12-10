import React from "react";
import PropTypes from "prop-types";
import { PhaseBadge } from "@cdssnc/gcui";
import { css } from "emotion";
import { globalTheme } from "../theme";

const Banner = css`
  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  padding: 1rem 0 1rem 0;
  margin: 0px;
  min-width: 20em;
  color: ${globalTheme.colour.white};
  font: 0.694rem sans-serif;
  span:first-of-type {
    font-weight: 700 !important;
    padding: 0.2rem 0.7rem;
    border-radius: 5px;
    background-color: ${globalTheme.colour.betaBlue};
  }
`;

const Text = css`
  margin-left: 10px;
  font-family: ${globalTheme.fontFamily};
  font-size: 12px;
`;
/**
 * Renders an alpha banner and renders passed children in the `Text` container
 */
export const AlphaBanner = ({ children, t, ...rest }) => (
  <aside {...rest} className={Banner}>
    <PhaseBadge phase={t("header.beta")} />
    <div className={Text}>{children}</div>
  </aside>
);

AlphaBanner.propTypes = {
  /**
   * Heirarchy of child components to render within thr `Text` container
   */
  t: PropTypes.func.isRequired,
  children: PropTypes.any
};
