import React from "react";
import PropTypes from "prop-types";
import { PhaseBadge } from "@cdssnc/gcui";
import { css } from "react-emotion";

const Banner = css`
  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  padding: 0.4rem 1rem 0.4rem 1rem;
  min-width: 20em;
  color: #fff;
  font: 0.694rem sans-serif;
  span:first-child {
    background-color: #d42dc9;
  }
`;

const Text = css`
  margin-left: 10px;
`;

export const AlphaBanner = ({ children, ...rest }) => (
  <aside {...rest} className={Banner}>
    <PhaseBadge phase="alpha" />
    <div className={Text}>{children}</div>
  </aside>
);

AlphaBanner.propTypes = {
  children: PropTypes.any
};
