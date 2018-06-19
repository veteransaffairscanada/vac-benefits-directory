import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "material-ui";
import { connect } from "react-redux";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import BenefitList from "../components/benefit_list";
import Router from "next/router";

export class Print extends Component {
  componentDidMount() {
    window.print();
  }

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    console.log(this.props.benefits);
    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }} className="allBenefitsList">
          <h1>{t("all-benefits.List of all benefits")}</h1>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              Show me benefits for:
            </Grid>
            <Grid item xs={12}>
              My needs are:
            </Grid>
            <Grid item xs={12}>
              <BenefitList
                t={t}
                filteredBenefits={this.props.benefits}
                eligibilityPaths={this.props.eligibilityPaths}
                benefits={this.props.benefits}
                onRef={foo => foo}
                examples={this.props.examples}
                sortByValue={"popularity"}
                searchString={""}
              />
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredBenefits: state.filteredBenefits,
    benefits: state.benefits,
    examples: state.examples,
    sortByValue: state.sortByValue,
    eligibilityPaths: state.eligibilityPaths
  };
};

Print.propTypes = {
  benefits: PropTypes.array,
  examples: PropTypes.array,
  eligibilityPaths: PropTypes.array,
  i18n: PropTypes.object,
  filteredBenefits: PropTypes.array,
  t: PropTypes.func,
  sortByValue: PropTypes.string
};

export default connect(mapStateToProps)(withI18next()(Print));
