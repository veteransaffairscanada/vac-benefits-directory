// https://github.com/alphagov/govuk-frontend/tree/master/src/components/textarea

import React from "react";
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
    color: `${globalTheme.colour.black}`,
    paddingBottom: "2px"
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
    border: `2px solid ${globalTheme.colour.black}`,
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
 * ### References:
 * - https://github.com/alphagov/govuk-frontend/tree/master/src/components/textarea
 *
 */
const TextArea = ({ children, hint, meta, input, ...props }) => (
  <Label error={meta.touched && meta.error} {...props}>
    <LabelText>{children}</LabelText>
    {hint && <HintText>{hint}</HintText>}
    {meta.touched && meta.error && <ErrorText>{meta.error}</ErrorText>}
    <TextAreaField
      type="text"
      rows="5"
      error={meta.touched && meta.error}
      {...input}
    />
  </Label>
);

TextArea.defaultProps = {
  hint: undefined,
  input: {},
  meta: {}
};

TextArea.propTypes = {
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
