import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { globalTheme } from "../theme";

const cerulean = globalTheme.colour.cerulean.replace("#", "%23"); //The character # is reserved in URLs as the start of a fragment identifier. You must encode this as %23 for the URL to be valid.

const wrapper = css`
  display: flex;
`;
const left = css`
  vertical-align: middle;
  color: ${globalTheme.colour.greyishBrown};
  font-size: 18px;
  padding-top: 11px;
`;
const right = css`
  flex: 1;
  max-width: 200px;
`;
const selectStyle = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill="${cerulean}"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  padding-right: 1.5em;
  padding-left: 19px;
  padding-top: 11px;
  padding-bottom: 10px;
  background-color: white;
  border-radius: 0;
  box-sizing: border-box;
  font-family: ${globalTheme.fontFamily};
  color: ${globalTheme.colour.greyishBrown};
  font-weight: normal;
  text-transform: none;
  font-size: 18px;
  line-height: normal;
  width: 100%;
  height: 44px;
  box-shadow: ${globalTheme.boxShadowMui};
  border: 0px;
  :focus {
    outline: 3px solid ${globalTheme.colour.govukYellow};
    outline-offset: 0;
  }
`;

export class Dropdown extends Component {
  render() {
    const { value, onChange, children, label, id } = this.props;
    return (
      <div className={wrapper}>
        <label htmlFor={id} className={left}>
          {label}
          &nbsp;&nbsp;
        </label>
        <div className={right}>
          <select
            className={selectStyle}
            value={value}
            id={id}
            onChange={onChange}
          >
            {children}
          </select>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default Dropdown;
