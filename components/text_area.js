// https://github.com/alphagov/govuk-frontend/tree/master/src/components/textarea

import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { globalTheme } from "../theme";

const HintText = styled("span")(
  //typography.font({ size: 19 }),
  {
    display: "block",
    // NB non-responsive marginBottom here
    marginBottom: "5px",
    color: `${globalTheme.colour.blackish}`
  }
);

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

/**
 *
 * ### Usage
 *
 * Simple
 * ```jsx
 * <TextArea name="group1" t={t}>{t("feedback.tell_us_more")}</TextArea>
 * ```
 *
 * TextArea with hint text
 * ```jsx
 * <TextArea name="group1" hint={['Enter as many words as you like']}>
 *   Description of what you saw
 * </TextArea>
 * ```
 *
 * <TextArea
 *    name="group1"
 *    hint={['Enter as many words as you like']}
 *  >
 *    Description of what you saw
 *  </TextArea>
 * ```
 *
 * ### References:
 * - https://github.com/alphagov/govuk-frontend/tree/master/src/components/textarea
 *
 */

export class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      charsLeft: this.props.t("feedback.text_area_char_limit")
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      const charCount = this.state.value.length;
      const charsLeft =
        parseFloat(this.props.t("feedback.text_area_char_limit")) - charCount;
      this.setState({ charsLeft: charsLeft });
    });
  }

  render() {
    const { t, children, hint, input, ...props } = this.props;
    return (
      <Label {...props}>
        <LabelText>{children}</LabelText>
        {hint && <HintText>{hint}</HintText>}
        <TextAreaField
          type="text"
          maxLength={t("feedback.text_area_char_limit")}
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

/** Component is not exported withWhitespace because Label
 *  is also exported withWhitespace and therefore takes precedence.
 */
export default TextArea;
export { TextAreaField };
