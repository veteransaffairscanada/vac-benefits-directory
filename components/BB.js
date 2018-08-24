import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "babel-polyfill/dist/polyfill";
import BenefitList from "../components/benefit_list";
import ProfileNeedsSelector from "./profile_needs_selector";
import ProfileNeedsSelectorMobile from "./profile_needs_selector_mobile";
import { connect } from "react-redux";
import { getFilteredBenefits } from "../selectors/benefits";
import { getFavouritesUrl, getPrintUrl } from "../selectors/urls";
import Bookmark from "@material-ui/icons/Bookmark";
import Print from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";
import { globalTheme } from "../theme";
import { css } from "react-emotion";

const buttonBarButton = css`
    font-weight: 100 !important;
    margin-right: 20px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
    text-decoration: none !important;
    text-transform: none !important;
    color: #3e57e2 !important;
`;
  const container = css`
    max-width: ${globalTheme.maxWidth} !important;
    margin: ${globalTheme.margin} !important;
    width: 100% !imporant;
`;
  const formControl = css`
    min-width: 120
`;
  const sortByBox = css`
    background-color: white;
    padding: 6px 10px 6px 10px;
    border-style: solid;
    border-width: 1px;
    border-radius: 1px;
`;
  const subTitle = css`
    font-size: 20px;
    font-weight: 100;
  `;
  const title = css`
    font-size: 36px;
    padding-bottom: 15px;
`;
  const topMatter = css`
    background-color: #fff;
    border-bottom: solid 1px lightgrey;
`;
  const searchWrap = css`
    width: 100%;
    display: inline-flex;
    border-style: solid;
    border-width: 1px;
    border-radius: 1px;
    background-color: white;
`;
  const searchBox = css`
    display: inline-flex;
    padding: 10px;
    fontSize: 15px;
    flex: 1;
    border-width: 0px;
    width: 100%;
    font-family: Merriweather;
`;
  const searchInputField = css`
    display: inline-flex;
    font-size: 15px;
    flex: 1;
    border-width: 0px;
    width: 100%;
    font-family: Merriweather;
`;
  const sortByLabel = css`
    color: #434343 !important;
    vertical-align: text-top;
`;
  const inputIcon = css`
    padding-right: 10px;
    margin-left: 5px;
`;

export class BB extends Component {
  handleSortByChange = event => {
    this.props.setSortBy(event.target.value);
  };

  countSelection = () => {
    const reducer = (acc, obj) => acc + (Object.values(obj)[0] == null ? 0 : 1);
    let count = Object.values(this.props.selectedEligibility).reduce(
      reducer,
      0
    );
    return count + Object.values(this.props.selectedNeeds).length;
  };

  countString = (x, t) => {
    switch (true) {
      case this.countSelection() === 0 && this.props.searchString.trim() === "":
        return t("B3.All benefits to consider");
      case x === 0:
        return t("B3.No benefits");
      case x === 1:
        return t("B3.One benefit");
      default:
        return t("B3.x benefits to consider", { x: x });
    }
  };

  handleSearchChange = event => {
    this.props.setSearchString(event.target.value);
  };

  render() {
    const { t, pageWidth, classes } = this.props; // eslint-disable-line no-unused-vars
    const filteredBenefits = this.props.filteredBenefits;

    return (
      <div
        id={this.props.id}
        style={{ padding: "16px" }}
        ref={el => (this.componentRef = el)}
      >
        <Grid container spacing={32}>
          <Grid item xs={12} className={topMatter}>
            <Grid container spacing={24} className={container}>
              <Grid item xs={12} md={9}>
                <Button
                  id="Favourites Page"
                  variant="flat"
                  size="medium"
                  className={buttonBarButton}
                  href={this.props.favouritesUrl}
                >
                  <Bookmark style={{ fontSize: "20px" }} />
                  &nbsp;
                  {t("B3.favouritesButtonText") +
                    " (" +
                    this.props.favouriteBenefits.length +
                    ")"}
                </Button>
                <Button
                  href={this.props.printUrl}
                  variant="flat"
                  size="medium"
                  target="print_page"
                  className={buttonBarButton}
                  id="printButton"
                >
                  <Print style={{ fontSize: "20px" }} />
                  &nbsp;
                  {pageWidth > 600 ? t("Print") : ""}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <h1 className={"BenefitsCounter " + title}>
                  {this.countString(filteredBenefits.length, t)}
                </h1>
                {filteredBenefits.length > 0 ? (
                  <h2 className={subTitle}>
                    {t("B3.check eligibility")}
                  </h2>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={32} className={container}>
              <Grid item lg={4} md={4} sm={5} xs={12}>
                <ProfileNeedsSelectorMobile t={t} store={this.props.store} />
                <ProfileNeedsSelector t={t} store={this.props.store} />
              </Grid>
              <Grid item lg={8} md={8} sm={7} xs={12}>
                <Grid container spacing={16}>
                  <Grid item xs={12} md={6}>
                    <InputLabel
                      htmlFor="sortBySelector"
                      className={sortByLabel}
                    >
                      {t("B3.Sort By")}
                    </InputLabel>
                    &nbsp;&nbsp;
                    <FormControl
                      id="sortBySelector"
                      className={formControl}
                    >
                      <Select
                        value={this.props.sortBy}
                        onChange={this.handleSortByChange}
                        className={sortByBox}
                        disableUnderline={true}
                      >
                        <MenuItem value={"relevance"}>
                          {t("B3.Popularity")}
                        </MenuItem>
                        <MenuItem value={"alphabetical"}>
                          {t("B3.Alphabetical")}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className={searchWrap}>
                      <div className={searchBox}>
                        <SearchIcon className={inputIcon} />
                        <input
                          id="bbSearchField"
                          aria-label="search"
                          type="text"
                          placeholder={this.props.t("search")}
                          className={searchInputField}
                          value={this.props.searchString}
                          onChange={this.handleSearchChange}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={24}>
                      <BenefitList
                        t={t}
                        filteredBenefits={filteredBenefits}
                        sortByValue={this.props.sortBy}
                        searchString={this.props.searchString}
                        showFavourites={true}
                        store={this.props.store}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchString: searchString => {
      dispatch({ type: "SET_SEARCH_STRING", data: searchString });
    },
    setSortBy: sortBy => {
      dispatch({ type: "SET_SORT_BY", data: sortBy });
    }
  };
};

const mapStateToProps = (reduxState, props) => {
  return {
    benefits: reduxState.benefits,
    favouriteBenefits: reduxState.favouriteBenefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    examples: reduxState.examples,
    filteredBenefits: getFilteredBenefits(reduxState, props),
    favouritesUrl: getFavouritesUrl(reduxState, props),
    needs: reduxState.needs,
    searchString: reduxState.searchString,
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals,
      serviceHealthIssue: reduxState.serviceHealthIssue
    },
    selectedNeeds: reduxState.selectedNeeds,
    sortBy: reduxState.sortBy,
    pageWidth: reduxState.pageWidth,
    printUrl: getPrintUrl(reduxState, props, {}),
    selectedAreaOffice: reduxState.selectedAreaOffice,
    closestAreaOffice: reduxState.closestAreaOffice
  };
};

BB.propTypes = {
  benefits: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  filteredBenefits: PropTypes.array,
  favouritesUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  needs: PropTypes.array.isRequired,
  printUrl: PropTypes.string,
  searchString: PropTypes.string.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setSearchString: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  store: PropTypes.object,
  pageWidth: PropTypes.number.isRequired,
  selectedAreaOffice: PropTypes.object.isRequired,
  closestAreaOffice: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BB);
