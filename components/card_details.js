import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "emotion";
import { globalTheme } from "../theme";
import ExpandMore from "./icons/ExpandMore";

const StyledDetails = styled("details")({
  display: "block",
  fontSize: "inherit",
  fontFamily: globalTheme.fontFamilySansSerif,
  color: globalTheme.colour.textColour,
  borderTop: "1px solid black"
});

const StyledSummary = styled("summary")({
  display: "inline-block",
  width: "100%",
  position: "relative",
  padding: 5,
  color: globalTheme.colour.textColour,
  cursor: "pointer",
  // ":hover": {
  //   background: globalTheme.colour.focusColour
  // },
  ":focus": {
    outline: `2px solid ${globalTheme.colour.focusColour}`
    // outlineOffset: -1,
  },
  "::-webkit-details-marker": {
    display: "none"
  },
  "[open]": {
    // transform: "rotate(90deg)"
    backgroundColor: "red"
  }
});

const DetailsText = styled("div")({
  paddingTop: 5,
  paddingBottom: 10,
  paddingLeft: 0,
  p: {
    marginTop: 0,
    marginBottom: 4 * 5
  },

  "> :last-child, p:last-child": {
    marginBottom: 0
  }
});
//
// const icon = css`
//
// `;

const CardDetails = ({ summary, children, ...props }) => (
  <StyledDetails {...props}>
    <StyledSummary>
      {summary}
      <ExpandMore className="icon" />
    </StyledSummary>
    <DetailsText>{children}</DetailsText>
  </StyledDetails>
);

CardDetails.defaultProps = {
  children: undefined,
  open: false
};

CardDetails.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  summary: PropTypes.node.isRequired
};

export default CardDetails;
