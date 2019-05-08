import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { globalTheme } from "../theme";

const Badge = styled.span`
  font-family: ${globalTheme.fontFamilySansSerif};
  line-height: 1.8;
  color: #fff;
  padding: 0.125rem 1rem;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding: 0.33rem 1.1rem;
  }
`;
export const PhaseBadge = ({ phase, ...rest }) => (
  <Badge {...rest} phase={phase}>
    {phase.toUpperCase()}
  </Badge>
);

PhaseBadge.propTypes = {
  phase: PropTypes.string.isRequired
};
