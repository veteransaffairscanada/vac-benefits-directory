import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { globalTheme } from "../theme";

const Label = styled("label")(
  {
    display: "block",
    position: "relative",
    padding: "0 0 0 38px",
    marginBottop: "2px"
  },
  ({ inline }) => ({
    float: inline ? "left" : undefined,
    clear: inline ? "none" : undefined,
    marginRight: inline ? "30px" : "0"
  })
);

const Input = styled("input")(
  {
    position: "absolute",
    cursor: "pointer",
    left: 0,
    top: 0,
    width: "38px",
    height: "38px",
    zIndex: 1,
    margin: 0,
    zoom: 1,
    opacity: 0,
    ":checked + span::after": {
      opacity: 1
    },
    ":focus + span::before": {
      boxShadow: `0 0 0 3px ${globalTheme.colour.focusColour};`
    }
  },
  ({ disabled }) => ({
    cursor: disabled ? "auto" : "pointer",
    " + span": {
      opacity: disabled ? ".4" : "1",
      pointerEvents: disabled ? "none" : "auto"
    }
  })
  // ({ checked }) => ({
  //   "+ span::after": {
  //     opacity: checked ? "1" : "0",
  //   }
  // })
);

const LabelText = styled("span")({
  fontFamily: globalTheme.fontFamily,
  fontWeight: 400,
  textTransform: "none",
  fontSize: "16px",
  lineHeight: "1.25",
  cursor: "pointer",
  padding: "8px 10px 9px 12px",
  display: "block",
  ":before": {
    content: "''",
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    left: 0,
    width: "33px",
    height: "33px",
    border: "2px solid black",
    borderRadius: "50%",
    background: "transparent"
  },
  ":after": {
    content: "''",
    position: "absolute",
    top: "8px",
    left: "8px",
    width: 0,
    height: 0,
    border: "8.5px solid",
    borderRadius: "50%",
    opacity: 0
  }
});

const Radio = ({ inline, children, className, ...input }) => (
  <Label inline={inline} className={className}>
    <Input type="radio" {...input} />
    <LabelText>{children}</LabelText>
  </Label>
);

Radio.defaultProps = {
  inline: false,
  className: undefined
};

Radio.propTypes = {
  inline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Radio;
