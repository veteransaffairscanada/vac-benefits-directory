import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import lunr from "lunr";
import "babel-polyfill/dist/polyfill";
import BenefitList from "../components/benefit_list";
import { connect } from "react-redux";

const styles = theme => ({
  benefitsCount: {
    fontSize: "24px"
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

  filterBenefits = (benefits, favouriteBenefits) => {
    if (benefits.length === 0) {
      return benefits;
    }
    return benefits.filter(b => favouriteBenefits.indexOf(b.id) > -1);
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

  getPrintUrl = (
    filteredBenefits,
    selectedEligibility,
    selectedNeeds,
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
    if (filteredBenefitsIDs.length > 0) {
      url += "&benefits=" + filteredBenefitsIDs.join(",");
    }
    return url;
  };

  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars

    const filteredBenefits = this.filterBenefits(
      this.props.benefits,
      this.props.favouriteBenefits
    );

    const printUrl = this.getPrintUrl(
      filteredBenefits,
      this.props.selectedEligibility,
      this.props.selectedNeeds,
      t("current-language-code")
    );

    return (
      <div>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.topMatter}>
              <Typography className={classes.title}>
                {t("B3.favouritesButtonText")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
                  </FormControl>
                </Grid>

                <Grid item xs={9} className={classnames(classes.collapse)}>
                  <Button
                    variant="flat"
                    size="small"
                    target="dan"
                    href={printUrl}
                    className="printButton"
                  >
                    {t("Print")}
                  </Button>
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
                  onRef={ref => this.children.push(ref)}
                  sortByValue={this.state.sortByValue}
                  toggleFavourite={this.props.toggleFavourite}
                  showFavourites={true}
                  searchString=""
                  store={this.props.store}
                  favouriteBenefits={this.props.favouriteBenefits}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    examples: reduxState.examples,
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals
    },
    selectedNeeds: reduxState.selectedNeeds
  };
};

Favourites.propTypes = {
  benefits: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  needs: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withStyles(styles)(Favourites));
