import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import { withI18next } from "../lib/withI18next";
import { withStyles } from "@material-ui/core/styles";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BenefitList from "../components/benefit_list";

const styles = theme => ({
  container: {
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  root: {
    marginLeft: "15px",
    marginRight: "15px"
  }
});

export class AllBenefits extends Component {
  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout i18n={i18n} t={t} hideNoscript={true} showRefreshCache={false}>
        <div className={this.props.classes.container}>
          <div className={this.props.classes.root}>
            <h1>{t("all-benefits.List of all benefits")}</h1>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <BenefitList
                  t={t}
                  filteredBenefits={this.props.benefits}
                  sortByValue={this.props.sortBy}
                  searchString={this.props.searchString}
                  showFavourites={true}
                  store={this.props.store}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    searchString: reduxState.searchString,
    sortBy: reduxState.sortBy
  };
};

AllBenefits.propTypes = {
  benefits: PropTypes.array.isRequired,
  searchString: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default withStyles(styles)(
  connect(mapStateToProps)(withI18next()(AllBenefits))
);
