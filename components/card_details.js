import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import ExpandMore from "./icons/ExpandMore";

const StyledDetails = styled("details")({
  display: "block",
  fontSize: "inherit",
  fontFamily: globalTheme.fontFamilySansSerif,
  color: globalTheme.colour.textColour,
  borderTop: `1px solid ${globalTheme.colour.darkPaleGrey}`
});

const StyledSummary = styled("summary")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  position: "relative",
  padding: 5,
  color: globalTheme.colour.textColour,
  cursor: "pointer",
  ":hover": {
    backgroundColor: globalTheme.colour.blueish
  },
  ":focus": {
    outline: `2px solid ${globalTheme.colour.focusColour}`,
    outlineOffset: -3
  },
  "::-webkit-details-marker": {
    display: "none"
  },
  "[open] > &": {
    ".icon": {
      transform: "rotate(180deg)"
    }
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
const flex2 = css({
  marginLeft: "auto",
  paddingRight: "10px",
  order: 2,
  color: globalTheme.colour.textColour
});
const CardDetails = ({ summary, children, ...props }) => (
  <StyledDetails {...props}>
    <StyledSummary>
      <div>{summary}</div>
      <div className={flex2}>
        <ExpandMore className="icon" />
      </div>
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
  summary: PropTypes.node
};

export default CardDetails;
