import PropTypes from "prop-types";
import styled from "@emotion/styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import Icon from "./icon";
// import ExpandMore from "./icons/ExpandMore";

const StyledDetails = styled("details")({
  display: "block",
  fontSize: "inherit",
  fontFamily: globalTheme.fontFamilySansSerif,
  color: globalTheme.colour.textColour
});

const StyledSummary = styled("summary")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  position: "relative",
  padding: 15,
  paddingLeft: 25,
  paddingRight: 25,
  color: globalTheme.colour.textColour,
  cursor: "pointer",
  ":hover": {
    backgroundColor: globalTheme.colour.blueish
  },
  ":focus": {
    outline: `2px solid ${globalTheme.colour.focusColour}`
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
  paddingLeft: 25,
  paddingRight: 25,
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
  paddingTop: 5,
  order: 2,
  color: globalTheme.colour.textColour
});
const SidebarDetails = ({ children, summary, ...props }) => (
  <StyledDetails {...props}>
    <StyledSummary>
      {summary}
      <div css={flex2}>
        {/* <ExpandMore className="icon" /> */}
        <Icon className="icon" icon="expand" flip={true} />
      </div>
    </StyledSummary>
    <DetailsText>{children}</DetailsText>
  </StyledDetails>
);

SidebarDetails.defaultProps = {
  children: undefined
};

SidebarDetails.propTypes = {
  children: PropTypes.node,
  summary: PropTypes.node
};

export default SidebarDetails;
