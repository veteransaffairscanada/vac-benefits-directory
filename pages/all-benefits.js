import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BenefitList from "../components/benefit_list";
import Container from "../components/container";
import Header from "../components/typography/header";

export class AllBenefits extends Component {
  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={true}
        title={t("titles.all_benefits")}
        skipLink="#mainContent"
      >
        <Container id="mainContent">
          <Header size="xl" headingLevel="h1">
            {t("all-benefits.List of all benefits")}
          </Header>
          <Grid item xs={12}>
            <Grid container spacing={24}>
              <BenefitList
                t={t}
                currentLanguage={t("current-language-code")}
                filteredBenefits={this.props.benefits}
                searchString={this.props.searchString}
                showFavourites={true}
                store={this.props.store}
              />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    searchString: reduxState.searchString
  };
};

AllBenefits.propTypes = {
  benefits: PropTypes.array.isRequired,
  searchString: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18N(AllBenefits));
