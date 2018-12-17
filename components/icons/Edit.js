/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../../theme";

export class EditIcon extends Component {
  inner = css`
    height: ${this.props.height};
    width: ${this.props.width} !important;
  `;

  render() {
    return (
      <svg
        role="img"
        aria-label={this.props.t("alt_text.edit")}
        width={this.props.width}
        height={this.props.height}
        xmlns="http://www.w3.org/2000/svg"
        css={this.inner}
      >
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          fill={this.props.colour}
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    );
  }
}

EditIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  colour: PropTypes.string,
  t: PropTypes.func.isRequired
};

EditIcon.defaultProps = {
  height: "22px",
  width: "26px",
  colour: globalTheme.colour.cerulean
};

export default EditIcon;
