import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import "babel-polyfill/dist/polyfill";
import BenefitList from "../components/benefit_list";
import ProfileNeedsSelector from "./profile_needs_selector";
import { connect } from "react-redux";
import { getFilteredBenefits } from "../selectors/benefits";
import Bookmark from "@material-ui/icons/Bookmark";
import Print from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";

const styles = () => ({
  benefitsCount: {
    fontSize: "24px"
  },
  buttonBarButton: {
    fontSize: "20px",
    fontWeight: "100",
    marginRight: "20px",
    marginTop: "20px",
    paddingLeft: "0px",
    paddingRight: "0px",
    textDecoration: "none",
    textTransform: "none"
  },
  checkEligibility: {
    fontWeight: "100"
  },
  collapse: {
    textAlign: "right",
    textDecoration: "underline",
    marginTop: "34px"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%"
  },
  formControl: {
    minWidth: 120
  },
  input: {
    marginRight: "10px",
    marginTop: "5px"
  },
  searchField: {
    width: "100%",
    maxWidth: "400px"
  },
  sortByBox: {
    backgroundColor: "white"
  },
  subTitle: {
    fontSize: "20px",
    fontWeight: "100"
  },
  title: {
    fontSize: "36px",
    padding: "15px 0"
  },
  topMatter: {
    backgroundColor: "#fff",
    borderBottom: "solid 1px lightgrey",
    marginBottom: "30px"
  }
});

export class BB extends Component {
  state = {
    sortByValue: "relevance"
  };

  handleSortByChange = event => {
    this.setState({ sortByValue: event.target.value });
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

  getFavouritesURL = () => {
    let href = "/favourites?";
    if (Object.keys(this.props.selectedNeeds).length > 0) {
      href += "&selectedNeeds=" + Object.keys(this.props.selectedNeeds).join();
    }
    ["patronType", "serviceType", "statusAndVitals"].forEach(selection => {
      if (this.props[selection] !== "") {
        href += `&${selection}=${this.props.selectedEligibility[selection]}`;
      }
    });
    href += "&lng=" + this.props.t("current-language-code");
    return href;
  };

  getPrintUrl = (
    filteredBenefits,
    selectedEligibility,
    selectedNeeds,
    sortby,
    language
  ) => {
    const filteredBenefitsIDs = filteredBenefits.map(b => b.id);
    const needsIDs = Object.keys(selectedNeeds);
    const selectedEligibilityKeys = Object.keys(selectedEligibility);
    let url = "print";
    url += "?lng=" + language;
    if (selectedEligibilityKeys.length > 0) {
      Object.keys(selectedEligibility).forEach(k => {
        url += "&" + k + "=" + selectedEligibility[k];
      });
    }
    if (needsIDs.length > 0) {
      url += "&needs=" + needsIDs.join(",");
    }
    url += "&sortBy=" + sortby;
    if (filteredBenefitsIDs.length > 0) {
      url += "&benefits=" + filteredBenefitsIDs.join(",");
    }
    return url;
  };

  render() {
    const { t, pageWidth, classes } = this.props; // eslint-disable-line no-unused-vars

    const filteredBenefits = this.props.filteredBenefits;

    const printUrl = this.getPrintUrl(
      filteredBenefits,
      this.props.selectedEligibility,
      this.props.selectedNeeds,
      this.state.sortByValue,
      t("current-language-code")
    );

    return (
      <div
        id={this.props.id}
        style={{ padding: "16px" }}
        ref={el => (this.componentRef = el)}
      >
        <Grid container spacing={32}>
          <Grid item xs={12} className={classes.topMatter}>
            <Grid container spacing={32} className={classes.container}>
              <Grid item xs={12}>
                <Typography className={classes.title}>
                  {t("B3.title")}
                </Typography>
                <Typography className={classes.subTitle}>
                  {t("B3.subtitle1")} <br />
                  {t("B3.subtitle2")}
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Link href={this.getFavouritesURL()}>
                  <Button
                    id="Favourites Page"
                    variant="flat"
                    size="large"
                    className={classes.buttonBarButton}
                  >
                    <Bookmark style={{ fontSize: "20px" }} />
                    &nbsp;
                    {t("B3.favouritesButtonText") +
                      " (" +
                      this.props.favouriteBenefits.length +
                      ")"}
                  </Button>
                </Link>
                <Link href={printUrl}>
                  <Button
                    variant="flat"
                    size="large"
                    target="dan"
                    className={classes.buttonBarButton}
                    id="printButton"
                  >
                    <Print style={{ fontSize: "20px" }} />
                    &nbsp;
                    {pageWidth > 600 ? t("Print") : ""}
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="bbSearchField"
                  label={t("search")}
                  placeholder=""
                  value={this.props.searchString}
                  onChange={this.handleSearchChange}
                  className={classes.searchField}
                  InputProps={{
                    classes: {
                      input: classes.input
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className={this.props.classes.inputIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={32} className={classes.container}>
              <Grid item lg={4} md={4} sm={5} xs={12}>
                <ProfileNeedsSelector t={t} store={this.props.store} />
              </Grid>
              <Grid item lg={8} md={8} sm={7} xs={12}>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <Typography
                      className={"BenefitsCounter " + classes.benefitsCount}
                    >
                      {this.countString(filteredBenefits.length, t)}
                    </Typography>
                    {filteredBenefits.length > 0 ? (
                      <Typography className={classes.checkEligibility}>
                        {t("B3.check eligibility")}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      id="sortBySelector"
                      className={classes.formControl}
                    >
                      <InputLabel>{t("B3.Sort By")}</InputLabel>
                      <Select
                        value={this.state.sortByValue}
                        onChange={this.handleSortByChange}
                        className={classnames(classes.sortByBox)}
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
                  <Grid item xs={12}>
                    <Grid container spacing={24}>
                      <BenefitList
                        t={t}
                        filteredBenefits={filteredBenefits}
                        sortByValue={this.state.sortByValue}
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
    needs: reduxState.needs,
    searchString: reduxState.searchString,
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals,
      serviceHealthIssue: reduxState.serviceHealthIssue
    },
    selectedNeeds: reduxState.selectedNeeds,
    pageWidth: reduxState.pageWidth
  };
};

BB.propTypes = {
  benefits: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  filteredBenefits: PropTypes.array,
  id: PropTypes.string.isRequired,
  needs: PropTypes.array.isRequired,
  searchString: PropTypes.string.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setSearchString: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  store: PropTypes.object,
  pageWidth: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BB));
