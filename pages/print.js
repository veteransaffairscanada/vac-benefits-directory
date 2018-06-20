import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "material-ui";
import { connect } from "react-redux";
import { withI18next } from "../lib/withI18next";
import BenefitList from "../components/benefit_list";

export class Print extends Component {
  componentDidMount() {
    window.print();
  }

  render() {
    const { i18n, t, benefits, needs } = this.props; // eslint-disable-line no-unused-vars
    const query = this.props.url.query;
    const filteredBenefitsIDs =
      Object.keys(query).indexOf("benefits") > -1
        ? query.benefits.split(",")
        : [];
    const filteredBenefits = benefits.filter(
      x => filteredBenefitsIDs.indexOf(x.id) > -1
    );

    const selectedNeedsIDs =
      Object.keys(query).indexOf("needs") > -1 ? query.needs.split(",") : [];
    const selectedNeeds = needs.filter(
      x => selectedNeedsIDs.indexOf(x.id) > -1
    );
    return (
      <div style={{ padding: 12 }} className="allBenefitsList">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="title">Benefits for:</Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li>patronType: {query["patronType"]}</li>
              <li>serviceType: {query["serviceType"]}</li>
              <li>statusAndVitals: {query["statusAndVitals"]}</li>
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="title">Interested in:</Typography>
          </Grid>

          <Grid item xs={12}>
            <ul>{selectedNeeds.map((n, i) => <li key={i}>{n.nameEn}</li>)}</ul>
          </Grid>
          <Grid item xs={12}>
            <BenefitList
              t={t}
              filteredBenefits={filteredBenefits}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    benefits: state.benefits,
    examples: state.examples,
    sortByValue: state.sortByValue,
    eligibilityPaths: state.eligibilityPaths,
    needs: state.needs
  };
};

Print.propTypes = {
  benefits: PropTypes.array,
  examples: PropTypes.array,
  needs: PropTypes.array,
  eligibilityPaths: PropTypes.array,
  i18n: PropTypes.object,
  t: PropTypes.func,
  sortByValue: PropTypes.string
};

export default connect(mapStateToProps)(withI18next()(Print));
