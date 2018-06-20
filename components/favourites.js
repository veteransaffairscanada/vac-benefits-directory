import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "material-ui";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import TextField from "material-ui/TextField";
import lunr from "lunr";

import "babel-polyfill/dist/polyfill";

import BenefitList from "../components/benefit_list";

const styles = theme => ({
  benefitsCount: {
    fontSize: "24px"
  },
  checkEligibility: {
    fontWeight: "100"
  },
  collapse: {
    textAlign: "right",
    textDecoration: "underline",
    marginTop: "34px"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  sortBy: {
    textAlign: "left",
    marginLeft: "-7px"
  },
  sortByBox: {
    backgroundColor: "white"
  },
  subTitle: {
    fontSize: "20px",
    fontWeight: "100",
    paddingBottom: "25px"
  },
  title: {
    fontSize: "36px",
    padding: "15px 0"
  },
  topMatter: {
    borderBottom: "solid 1px lightgrey",
    marginBottom: "30px"
  }
});

export class Favourites extends Component {
  state = {
    enIdx: null,
    frIdx: null,
    searchString: "",
    sortByValue: "relevance"
  };

  componentWillMount() {
    const { benefits } = this.props;

    const enIdx = lunr(function() {
      this.pipeline.remove(lunr.stemmer);
      this.pipeline.remove(lunr.stopWordFilter);
      this.ref("id");
      this.field("vacNameEn");
      this.field("oneLineDescriptionEn");
      benefits.forEach(function(doc) {
        this.add(doc);
      }, this);
    });

    const frIdx = lunr(function() {
      this.pipeline.remove(lunr.stemmer);
      this.pipeline.remove(lunr.stopWordFilter);
      this.ref("id");
      this.field("vacNameFr");
      this.field("oneLineDescriptionFr");
      benefits.forEach(function(doc) {
        this.add(doc);
      }, this);
    });

    this.setState({ enIdx: enIdx, frIdx: frIdx });
  }

  children = [];

  collapseAllBenefits = () => {
    this.children.forEach(c => {
      if (c) {
        c.setState({ open: false });
        c.children.forEach(cc => {
          if (cc) {
            cc.setState({ open: false });
          }
        });
      }
    });
  };

  filterBenefits = (benefits, bookmarkedBenefits) => {
    if (benefits.length === 0) {
      return benefits;
    }
    return benefits.filter(b => bookmarkedBenefits.indexOf(b.id) > -1);
  };

  handleSortByChange = event => {
    this.setState({ sortByValue: event.target.value });
  };

  countString = (x, t) => {
    switch (true) {
      case x === 0:
        return t("B3.No benefits");
      case x === 1:
        return t("B3.One benefit");
      default:
        return t("B3.x benefits to consider", { x: x });
    }
  };

  handleSearchChange = event => {
    this.setState({
      searchString: event.target.value
    });
  };

  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars

    const filteredBenefits = this.filterBenefits(
      this.props.benefits,
      this.props.bookmarkedBenefits
    );

    return (
      <div id={this.props.id}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.topMatter}>
              <Typography className={classes.title}>{t("B3.title")}</Typography>
            </Grid>
            <Grid item lg={9} md={8} sm={7} xs={12}>
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

              <Grid container spacing={24}>
                <Grid item xs={3} className={classnames(classes.sortBy)}>
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
                    {this.props.url.query.show_search ? (
                      <TextField
                        id="bbSearchField"
                        label={t("search")}
                        placeholder=""
                        value={this.state.searchString}
                        onChange={this.handleSearchChange}
                        margin="normal"
                      />
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={9} className={classnames(classes.collapse)}>
                  <Button
                    id="CollapseBenefits"
                    variant="flat"
                    size="small"
                    onClick={this.collapseAllBenefits}
                  >
                    {t("Close all")}
                  </Button>
                </Grid>
                <BenefitList
                  t={t}
                  filteredBenefits={filteredBenefits}
                  eligibilityPaths={this.props.eligibilityPaths}
                  benefits={this.props.benefits}
                  onRef={ref => this.children.push(ref)}
                  examples={this.props.examples}
                  sortByValue={this.state.sortByValue}
                  toggleBookmark={this.props.toggleBookmark}
                  bookmarkedBenefits={this.props.bookmarkedBenefits}
                  showBookmarks={true}
                  searchString={this.state.searchString}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Favourites.propTypes = {
  benefits: PropTypes.array,
  classes: PropTypes.object,
  eligibilityPaths: PropTypes.array,
  examples: PropTypes.array,
  id: PropTypes.string,
  needs: PropTypes.array,
  setUserProfile: PropTypes.func,
  t: PropTypes.func,
  pageWidth: PropTypes.number,
  bookmarkedBenefits: PropTypes.array,
  toggleBookmark: PropTypes.func,
  url: PropTypes.object,
  setSection: PropTypes.func
};

export default withStyles(styles)(Favourites);
