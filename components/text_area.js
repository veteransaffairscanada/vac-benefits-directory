// https://github.com/alphagov/govuk-frontend/tree/master/src/components/textarea

import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { globalTheme } from "../theme";

const HintText = styled("span")({
  display: "block",
  marginBottom: "5px",
  color: `${globalTheme.colour.blackish}`
});

const LabelText = styled("span")({
  fontFamily: globalTheme.fontFamily,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  display: "block",
  clear: "none",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "1.5",
  color: `${globalTheme.colour.greyishBrown}`,
  paddingBottom: "5px"
});

const FooterText = styled("span")({
  fontFamily: globalTheme.fontFamily,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  display: "block",
  clear: "none",
  fontWeight: 400,
  fontSize: "10px",
  lineHeight: "1.5",
  color: `${globalTheme.colour.greyishBrown}`,
  paddingTop: "3px"
});

const Label = styled("label")({
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  ":after": {
    content: "''",
    display: "table",
    clear: "both"
  }
});

const TextAreaField = styled("textarea")({
  boxSizing: "border-box",
  fontFamily: globalTheme.fontFamily,
  fontWeight: 400,
  textTransform: "none",
  fontSize: "18px",
  lineHeight: "1.5",
  width: "100%",
  padding: "5px 4px 4px",
  border: `1px solid ${globalTheme.colour.warmGrey}`,
  ":focus": {
    outline: `3px solid ${globalTheme.colour.focusColour}`,
    outlineOffset: 0
  }
});

export class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      charsLeft: this.props.maxLength
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      const charCount = this.state.value.length;
      const charsLeft = parseFloat(this.props.maxLength) - charCount;
      this.setState({ charsLeft: charsLeft });
    });
  }

  render() {
    const { t, maxLength, children, hint, input, ...props } = this.props;
    return (
      <Label {...props}>
        <LabelText>{children}</LabelText>
        {hint && <HintText>{hint}</HintText>}
        <TextAreaField
          type="text"
          maxLength={maxLength}
          rows="5"
          value={this.state.value}
          onChange={this.handleChange}
          {...input}
        />
        <FooterText>
          {t("feedback.character_limit_warning", { x: this.state.charsLeft })}
        </FooterText>
      </Label>
    );
  }
}

TextArea.defaultProps = {
  hint: undefined,
  input: {}
};

TextArea.propTypes = {
  maxLength: PropTypes.string,
  t: PropTypes.func.isRequired,
  hint: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.any
  }),
  children: PropTypes.node.isRequired
};

export default TextArea;
export { TextAreaField };
