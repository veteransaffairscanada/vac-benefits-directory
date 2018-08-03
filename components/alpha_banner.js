import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";
import { PhaseBadge } from "@cdssnc/gcui";
import { mediaQuery } from "../styles";

const Banner = styled("aside")`
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
  ${mediaQuery.sm(css`
    display: block;
  `)};
`;

export const AlphaBanner = ({ children, ...rest }) => (
  <Banner {...rest}>
    <PhaseBadge phase="alpha" />
    <span style={{ marginLeft: "10px" }}>{children}</span>
  </Banner>
);

AlphaBanner.propTypes = {
  children: PropTypes.any
};
