import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BenefitList from "../components/benefit_list";
import { css } from "react-emotion";
import Container from "../components/container";
import Header1 from "../components/typography/header1";

const root = css`
  margin-left: 15px;
  margin-right: 15px;
`;

export class AllBenefits extends Component {
  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={true}
        showRefreshCache={false}
        title={t("titles.all_benefits")}
      >
        <Container>
          <div className={root}>
            <Header1>{t("all-benefits.List of all benefits")}</Header1>
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
        </Container>
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
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18next()(AllBenefits));
