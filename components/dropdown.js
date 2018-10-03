import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import Select from "./select";

const wrapper = css`
  display: flex;
`;
const left = css`
  vertical-align: middle;
  color: ${globalTheme.colour.greyishBrown};
  font-size: 18px;
  padding-top: 9px;
`;
const right = css`
  flex: 1;
`;

export class Dropdown extends Component {
  render() {
    const { t, sortBy, handleSortByChange } = this.props;
    return (
      <div className={wrapper}>
        <div htmlFor="sortBySelector" className={left}>
          {t("B3.Sort By")}
          &nbsp;&nbsp;
        </div>
        <div className={right}>
          <Select
            value={sortBy}
            id="sortBySelector"
            onChange={handleSortByChange}
          >
            <option value="relevance">{t("B3.Popularity")}</option>
            <option value="alphabetical">{t("B3.Alphabetical")}</option>
          </Select>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  t: PropTypes.func.isRequired,
  handleSortByChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};
export default Dropdown;
