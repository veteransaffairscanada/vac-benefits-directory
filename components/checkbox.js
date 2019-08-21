import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { globalTheme } from "../theme";
import { uuidv4 } from "../utils/common";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const StyledCheckbox = styled("label")({
  display: "inline-block",
  position: "relative",
  padding: "0 0 0 38px",
  marginBottom: "10px",
  marginRight: "10px"
});

const StyledInput = styled("input")(
  {
    position: "absolute",
    left: 0,
    top: 0,
    width: "24px",
    height: "24px",
    zIndex: 1,
    margin: 0,
    zoom: 1,
    opacity: 0,
    ":checked + span:after": {
      opacity: 1
    },
    ":focus + span:before": {
      boxShadow: `0 0 0 3px ${globalTheme.colour.focusColour}`
    }
  },
  ({ disabled }) => ({
    cursor: disabled ? "auto" : "pointer",
    " + span": {
      pointerEvents: disabled ? "none" : "auto",
      fontSize: disabled ? "16px" : "24px"
    }
  })
);

const StyledLabel = styled("span")({
  fontFamily: globalTheme.fontFamilySansSerif,
  fontWeight: 400,
  textTransform: "none",
  fontSize: "24px",
  cursor: "pointer",
  padding: "0px 0px 14px 8px",
  display: "block",
  color: `${globalTheme.colour.greyishBrown}`,
  "::before": {
    content: "''",
    display: "block",
    border: `2px solid ${globalTheme.colour.greyishBrown}`,
    background: "transparent",
    overflow: "hidden",
    width: "24px",
    height: "24px",
    position: "absolute",
    top: 0,
    left: 0
  },
  "::after": {
    content: "''",
    border: "solid",
    color: globalTheme.colour.greyishBrown,
    borderWidth: "0 0 4px 4px",
    background: "transparent",
    borderTopColor: "transparent",
    width: "11px",
    height: "5px",
    position: "absolute",
    top: "8px",
    left: "6px",
    transform: "rotate(-45deg)",
    zoom: 1,
    opacity: 0
  }
});

const mobileLabelStyle = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    font-size: 16px;
  }
`;
const modalLabelStyle = css({
  fontSize: "14px !important",
  padding: "6px 10px 15px 12px !important"
});

const Checkbox = ({ children, modal, ...props }) => {
  const guid = uuidv4();
  return (
    <StyledCheckbox htmlFor={guid}>
      <StyledInput type="checkbox" {...props} id={guid} />
      <StyledLabel css={[mobileLabelStyle, modal ? modalLabelStyle : null]}>
        {children}
      </StyledLabel>
    </StyledCheckbox>
  );
};

Checkbox.defaultProps = {
  styles: undefined
};

Checkbox.propTypes = {
  children: PropTypes.node.isRequired,
  modal: PropTypes.bool
};

export default Checkbox;
