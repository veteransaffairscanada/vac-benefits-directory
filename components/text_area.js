// https://github.com/alphagov/govuk-frontend/tree/master/src/components/textarea

import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { globalTheme } from "../theme";

const ErrorText = styled("span")(
  //typography.font({ size: 19, weight: 'bold' }),
  {
    display: "block",
    // NB non-responsive spacing
    marginBottom: "5px",
    clear: "both",
    color: globalTheme.colour.tornadoRed
  }
);

const HintText = styled("span")(
  //typography.font({ size: 19 }),
  {
    display: "block",
    // NB non-responsive marginBottom here
    marginBottom: "5px",
    color: `${globalTheme.colour.blackish}`
  }
);

const LabelText = styled("span")(
  {
    fontFamily: globalTheme.fontFamily,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    display: "block",
    clear: "none",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "1.5",
    //   [MEDIA_QUERIES.LARGESCREEN]: {
    //     fontSize: FONT_SIZE.SIZE_19,
    //     lineHeight: LINE_HEIGHT.SIZE_19,
    //   },
    color: `${globalTheme.colour.greyishBrown}`,
    paddingBottom: "5px"
  },
  ({ error }) => ({
    fontWeight: error ? 700 : undefined
  })
);

const FooterText = styled("span")(
  {
    fontFamily: globalTheme.fontFamily,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    display: "block",
    clear: "none",
    fontWeight: 400,
    fontSize: "10px",
    lineHeight: "1.5",
    //   [MEDIA_QUERIES.LARGESCREEN]: {
    //     fontSize: FONT_SIZE.SIZE_19,
    //     lineHeight: LINE_HEIGHT.SIZE_19,
    //   },
    color: `${globalTheme.colour.greyishBrown}`,
    paddingTop: "3px"
  },
  ({ error }) => ({
    fontWeight: error ? 700 : undefined
  })
);

const Label = styled("label")(
  {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    ":after": {
      content: "''",
      display: "table",
      clear: "both"
    }
  },
  ({ error }) => ({
    borderLeft: error
      ? `4px solid ${globalTheme.colour.tornadoRed}`
      : undefined,
    marginRight: error ? "3px" : undefined,
    paddingLeft: error ? "2px" : undefined
  })
);

const TextAreaField = styled("textarea")(
  {
    boxSizing: "border-box",
    fontFamily: globalTheme.fontFamily,
    fontWeight: 400,
    textTransform: "none",
    fontSize: "18px",
    lineHeight: "1.5",
    // [MEDIA_QUERIES.LARGESCREEN]: {
    //   fontSize: FONT_SIZE.SIZE_19,
    //   lineHeight: LINE_HEIGHT.SIZE_19,
    //   width: '75%',
    // },
    width: "100%",
    padding: "5px 4px 4px",
    border: `1px solid ${globalTheme.colour.warmGrey}`,
    ":focus": {
      outline: `3px solid ${globalTheme.colour.focusColour}`,
      outlineOffset: 0
    }
  },
  ({ error }) => ({
    border: error ? `4px solid ${globalTheme.colour.tornadoRed}` : undefined
  })
);

/**
 *
 * ### Usage
 *
 * Simple
 * ```jsx
 * <TextArea name="group1">Description of what you saw</TextArea>
 * ```
 *
 * TextArea with hint text
 * ```jsx
 * <TextArea name="group1" hint={['Enter as many words as you like']}>
 *   Description of what you saw
 * </TextArea>
 * ```
 *
 * TextArea with hint text & error
 * ```jsx
 * const meta = {
 *   touched: true,
 *   error: 'Example',
 * };
 *
 * <TextArea
 *    name="group1"
 *    hint={['Enter as many words as you like']}
 *    meta={meta}
 *  >
 *    Description of what you saw
 *  </TextArea>
 * ```
 *
 * With Footer for VAC content
 * ```jsx
 * <TextArea name="group1" footer={t("feedback.character_warning", {x: t("feedback.max_char")})}>{t("feedback.tell_us_more")}</TextArea>
 * ```
 *
 * ### References:
 * - https://github.com/alphagov/govuk-frontend/tree/master/src/components/textarea
 *
 */

export class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.state = { charsLeft: this.props.t("feedback.max_char") };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    //console.log(this.state.value);
    const charsUsed = this.state.value ? this.state.value.length : 1;
    const charsLeft = parseFloat(this.props.t("feedback.max_char")) - charsUsed;
    //console.log(charsLeft);
    this.setState({ charsLeft: charsLeft });
  }

  render() {
    const {
      t,
      children,
      hint,
      footer,
      meta,
      input,
      inputId,
      ...props
    } = this.props;
    return (
      <Label error={meta.touched && meta.error} {...props}>
        <LabelText>{children}</LabelText>
        {hint && <HintText>{hint}</HintText>}
        {meta.touched && meta.error && <ErrorText>{meta.error}</ErrorText>}
        <TextAreaField
          type="text"
          maxLength="10"
          rows="5"
          id={this.props.inputId}
          onChange={this.handleChange}
          value={this.state.value}
          error={meta.touched && meta.error}
          {...input}
        />
        <FooterText id={this.props.inputId + "-footer"}>
          {t("feedback.character_warning", { x: this.state.charsLeft })}
        </FooterText>
      </Label>
    );
  }
}

TextArea.defaultProps = {
  hint: undefined,
  input: {},
  meta: {}
};

TextArea.propTypes = {
  t: PropTypes.func.isRequired,
  inputId: PropTypes.string,
  footer: PropTypes.string,
  hint: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.any
  }),
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    dirtySinceLastSubmit: PropTypes.bool,
    error: PropTypes.any,
    initial: PropTypes.any,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitError: PropTypes.any,
    submitFailed: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    visited: PropTypes.bool
  }),
  children: PropTypes.node.isRequired
};

/** Component is not exported withWhitespace because Label
 *  is also exported withWhitespace and therefore takes precedence.
 */
export default TextArea;
export { TextAreaField };
