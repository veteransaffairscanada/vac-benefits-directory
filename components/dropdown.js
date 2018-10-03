import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { globalTheme } from "../theme";

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
  background-position: right 50%;
  background-repeat: no-repeat;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDZFNDEwNjlGNzFEMTFFMkJEQ0VDRTM1N0RCMzMyMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDZFNDEwNkFGNzFEMTFFMkJEQ0VDRTM1N0RCMzMyMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NkU0MTA2N0Y3MUQxMUUyQkRDRUNFMzU3REIzMzIyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NkU0MTA2OEY3MUQxMUUyQkRDRUNFMzU3REIzMzIyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuGsgwQAAAA5SURBVHjaYvz//z8DOYCJgUxAf42MQIzTk0D/M+KzkRGPoQSdykiKJrBGpOhgJFYTWNEIiEeAAAMAzNENEOH+do8AAAAASUVORK5CYII=);
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
