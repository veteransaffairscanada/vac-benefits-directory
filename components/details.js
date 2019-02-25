import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { globalTheme } from "../theme";

const StyledDetails = styled("details")({
  display: "block",
  fontSize: "inherit",
  fontFamily: globalTheme.fontFamilySansSerif,
  color: globalTheme.colour.textColour
});

const StyledSummary = styled("summary")({
  display: "inline-block",
  position: "relative",
  padding: 5,
  color: globalTheme.colour.linkColour,
  cursor: "pointer",
  ":hover": {
    color: globalTheme.colour.linkHoverColour
  },

  ":focus": {
    outline: `2px solid ${globalTheme.colour.focusColour}`,
    outlineOffset: -1,
    color: globalTheme.colour.black,
    background: globalTheme.colour.focusColour
  }
});

const DetailsText = styled("div")({
  padding: 3 * 5,
  paddingLeft: 0,
  p: {
    marginTop: 0,
    marginBottom: 4 * 5
  },

  "> :last-child, p:last-child": {
    marginBottom: 0
  }
});
const SummaryText = styled("span")({
  ":hover": {
    textDecoration: "underline"
  }
});

const Details = ({ summary, children, ...props }) => (
  <StyledDetails {...props}>
    <StyledSummary>
      <SummaryText>{summary}</SummaryText>
    </StyledSummary>
    <DetailsText>{children}</DetailsText>
  </StyledDetails>
);

Details.defaultProps = {
  children: undefined,
  open: false
};

Details.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  summary: PropTypes.node.isRequired
};

export default Details;
