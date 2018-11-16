import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { globalTheme } from "../theme";

const Label = styled("label")(
  {
    display: "block",
    position: "relative",
    padding: "0 0 0 28px",
    marginBottom: "2px"
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
    width: "25px",
    height: "25px",
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
);

const LabelText = styled("span")({
  fontFamily: globalTheme.fontFamily,
  fontWeight: 400,
  textTransform: "none",
  fontSize: "16px",
  lineHeight: "1.25",
  cursor: "pointer",
  padding: "5px 10px 9px 12px",
  display: "block",
  ":before": {
    content: "''",
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    left: 0,
    width: "28px",
    height: "28px",
    border: "2px solid black",
    borderRadius: "50%",
    background: "transparent"
  },
  ":after": {
    content: "''",
    position: "absolute",
    top: "7px",
    left: "7px",
    width: 0,
    height: 0,
    border: "7px solid",
    borderRadius: "50%",
    opacity: 0
  }
});

const Radio = ({ inline, children, className, value, ...input }) => (
  <Label inline={inline} className={className} htmlFor={value}>
    <Input type="radio" {...input} id={value} />
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
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Radio;
