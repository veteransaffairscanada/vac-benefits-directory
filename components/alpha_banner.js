import React from "react";
import PropTypes from "prop-types";
import { PhaseBadge } from "@cdssnc/gcui";
import { css } from "react-emotion";
import { globalTheme } from "../theme";

const Banner = css`
  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  padding: 0.4rem 0 0.4rem 0;
  margin: 0px;
  min-width: 20em;
  color: ${globalTheme.colour.white};
  font: 0.694rem sans-serif;
  span:first-child {
    background-color: ${globalTheme.colour.alphaPink};
  }
`;

const Text = css`
  margin-left: 10px;
`;
/**
 * Renders an alpha banner and renders passed children in the `Text` container
 */
export const AlphaBanner = ({ children, ...rest }) => (
  <aside {...rest} className={Banner}>
    <PhaseBadge phase="alpha" />
    <div className={Text}>{children}</div>
  </aside>
);

AlphaBanner.propTypes = {
  /**
   * Heirarchy of child components to render within thr `Text` container
   */
  children: PropTypes.any
};
