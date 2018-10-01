import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Print from "@material-ui/icons/Print";
import Bookmark from "@material-ui/icons/Bookmark";
import BenefitList from "../components/benefit_list";
import ProfileNeedsSelector from "./profile_needs_selector";
import ProfileNeedsSelectorMobile from "./profile_needs_selector_mobile";
import { connect } from "react-redux";
import { getFilteredBenefits } from "../selectors/benefits";
import { getFavouritesUrl, getPrintUrl } from "../selectors/urls";
import { css } from "react-emotion";
import Container from "../components/container";
import Header2 from "../components/typography/header2";
import HeaderButton from "./header_button";
import Body from "../components/typography/body";
import SearchBox from "./search_box";
import { globalTheme } from "../theme";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled } from "../utils/common";

const outerDiv = css`
  padding-bottom: 16px !important;
`;
const topPadding = css`
  padding-top: 30px;
`;
const container2 = css`
  margin-right: 15px;
  margin-left: 15px;
`;
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
const title = css`
  padding-bottom: 15px;
`;
const topMatter = css`
  background-color: #fff;
  border-bottom: solid 1px lightgrey;
  width: 100%;
  padding-bottom: 20px;
`;
const sortByLabel = css`
  color: #434343 !important;
  vertical-align: text-top;
`;
const anchors = css`
  margin-right: 20px;
`;
const nonMobileStyle = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none;
  }
`;

export class BB extends Component {
  state = { showDisabledCookieBanner: false };

  componentDidMount() {
    this.props.setCookiesDisabled(areCookiesDisabled());
    this.setState({ showDisabledCookieBanner: areCookiesDisabled() });
  }

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
    const { t } = this.props; // eslint-disable-line no-unused-vars
    const filteredBenefits = this.props.filteredBenefits;

    return (
      <div
        id={this.props.id}
        className={outerDiv}
        ref={el => (this.componentRef = el)}
      >
        <div className={topMatter}>
          <Container className={topPadding}>
            <div className={container2}>
              {this.state.showDisabledCookieBanner ? (
                <DisabledCookiesBanner
                  t={t}
                  onClose={() =>
                    this.setState({ showDisabledCookieBanner: false })
                  }
                />
              ) : null}

              <Grid container spacing={24}>
                <Grid item xs={12} md={9}>
                  <HeaderButton
                    className={anchors}
                    href={this.props.favouritesUrl}
                  >
                    <Bookmark />
                    {t("B3.favouritesButtonText") +
                      " (" +
                      this.props.favouriteBenefits.length +
                      ")"}
                  </HeaderButton>

                  <HeaderButton
                    className={anchors}
                    href={this.props.printUrl}
                    target="print_page"
                    id="printButton"
                  >
                    <Print />{" "}
                    <span className={nonMobileStyle}> {t("Print")} </span>
                  </HeaderButton>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={topPadding}>
          <div className={container2}>
            <Grid container spacing={32}>
              <Grid item lg={4} md={4} sm={5} xs={12}>
                <ProfileNeedsSelectorMobile t={t} store={this.props.store} />
                <ProfileNeedsSelector t={t} store={this.props.store} />
              </Grid>
              <Grid item lg={8} md={8} sm={7} xs={12}>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <Header2 className={"BenefitsCounter " + title}>
                      {this.countString(filteredBenefits.length, t)}
                    </Header2>
                    {filteredBenefits.length > 0 ? (
                      <Body>{t("B3.check eligibility")}</Body>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel
                      htmlFor="sortBySelector"
                      className={sortByLabel}
                    >
                      {t("B3.Sort By")}
                    </InputLabel>
                    &nbsp;&nbsp;
                    <FormControl id="sortBySelector" className={formControl}>
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
                    <SearchBox
                      inputId="bbSearchField"
                      buttonId="searchButtonLink"
                      placeholder={this.props.t("search")}
                      value={this.props.searchString}
                      onChange={this.handleSearchChange}
                      disableButton={true}
                    />
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
          </div>
        </Container>
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
    },
    setCookiesDisabled: areDisabled => {
      dispatch({ type: "SET_COOKIES_DISABLED", data: areDisabled });
    }
  };
};

const mapStateToProps = (reduxState, props) => {
  return {
    cookiesDisabled: reduxState.cookiesDisabled,
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
    printUrl: getPrintUrl(reduxState, props, {}),
    selectedAreaOffice: reduxState.selectedAreaOffice,
    closestAreaOffice: reduxState.closestAreaOffice
  };
};

BB.propTypes = {
  cookiesDisabled: PropTypes.bool.isRequired,
  benefits: PropTypes.array.isRequired,
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
  setCookiesDisabled: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  store: PropTypes.object,
  selectedAreaOffice: PropTypes.object.isRequired,
  closestAreaOffice: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BB);
