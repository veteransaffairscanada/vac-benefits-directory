import React, { Component } from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { css } from "react-emotion";

const formControl = css`
  min-width: 120;
`;
const sortByBox = css`
  background-color: white;
  padding: 6px 10px 6px 10px;
  border-style: solid;
  border-width: 1px;
  border-radius: 1px;
`;
const sortByLabel = css`
  color: #434343 !important;
  vertical-align: text-top;
`;

export class Dropdown extends Component {
  render() {
    const { t, sortBy, handleSortByChange } = this.props;
    return (
      <React.Fragment>
        <InputLabel htmlFor="sortBySelector" className={sortByLabel}>
          {t("B3.Sort By")}
        </InputLabel>
        &nbsp;&nbsp;
        <FormControl id="sortBySelector" className={formControl}>
          <Select
            value={sortBy}
            onChange={handleSortByChange}
            className={sortByBox}
            disableUnderline={true}
          >
            <MenuItem value={"relevance"}>{t("B3.Popularity")}</MenuItem>
            <MenuItem value={"alphabetical"}>{t("B3.Alphabetical")}</MenuItem>
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

Dropdown.propTypes = {
  t: PropTypes.func.isRequired,
  handleSortByChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};
export default Dropdown;
