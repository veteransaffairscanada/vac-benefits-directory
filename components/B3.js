// @flow

import React, { Component } from "react";
import { Grid } from "material-ui";
import { BenefitTitleCard } from "../components/benefit_cards";
import FilterSelector from "../components/filter_selector";

type Props = {
  id: string,
  t: mixed,
  benefitTypes: mixed,
  patronTypes: mixed,
  benefits: mixed,
  corporaEn: mixed,
  corporaFr: mixed,
  selectedBenefitTypes: mixed,
  selectedPatronTypes: mixed,
  toggleSelectedPatronType: mixed,
  toggleSelectedBenefitType: mixed
};

export class App extends Component<Props> {
  props: Props;

  countBenefitsString = (benefits, t) => {
    switch (benefits.length) {
      case 0:
        return t(
          "A3.At this time there are no benefits that match your selections"
        );
      case 1:
        return t("A3.Here is a benefit that may apply to you") + ":";
      default:
        return (
          t("A3.Here are NNN benefits that may apply to you", {
            value: benefits.length
          }) + ":"
        );
    }
  };

  filterBenefits = (benefits, benefitTypes, patronTypes) => {
    return benefits.filter(benefit => {
      const matchingBenefitTypes = benefit.benefit_types.filter(
        bt => benefitTypes.indexOf(bt) > -1
      );
      const matchingPatronTypes = benefit.patron_types.filter(
        pt => patronTypes.indexOf(pt) > -1
      );
      return matchingBenefitTypes.length > 0 && matchingPatronTypes.length > 0;
      return matchingPatronTypes.length > 0;
    });
  };

  enrichBenefit = (benefit, corporaEn, corporaFr) => {
    let links = corporaEn.filter(corp => corp.benefits.includes(benefit.id));
    benefit.linkEn =
      links.length > 0 ? links[0].full_description_link : undefined;
    links = corporaFr.filter(corp => corp.benefits.includes(benefit.id));
    benefit.linkFr =
      links.length > 0 ? links[0].full_description_link : undefined;
    return benefit;
  };

  render() {
    const { t } = this.props; // eslint-disable-line no-unused-vars

    const benefitTypes = this.props.benefitTypes.filter(bt =>
      this.props.selectedBenefitTypes.includes(bt.id)
    );
    const patronTypes = this.props.patronTypes.filter(pt =>
      this.props.selectedPatronTypes.includes(pt.id)
    );

    let benefits = this.filterBenefits(
      this.props.benefits,
      this.props.selectedBenefitTypes,
      this.props.selectedPatronTypes
    );

    // add links to benefits
    benefits = benefits.map(benefit =>
      this.enrichBenefit(benefit, this.props.corporaEn, this.props.corporaFr)
    );

    return (
      <div id={this.props.id}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h1 id="benefitCountString" style={{ textAlign: "left" }}>
                {this.countBenefitsString(benefits, t)}
              </h1>
            </Grid>
          </Grid>
        </div>

        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item sm={3} xs={12}>
              <Grid container spacing={8}>
                <Grid item>
                  <FilterSelector
                    t={t}
                    legend={"Status"}
                    filters={this.props.patronTypes}
                    selectedFilters={this.props.selectedPatronTypes}
                    handleChange={this.props.toggleSelectedPatronType}
                  />
                </Grid>
                <Grid item>
                  <FilterSelector
                    t={t}
                    legend={"Need"}
                    filters={this.props.benefitTypes}
                    selectedFilters={this.props.selectedBenefitTypes}
                    handleChange={this.props.toggleSelectedBenefitType}
                  />
                </Grid>
                `
                <Grid item>
                  <p style={{ textAlign: "center", fontSize: "1em" }}>
                    <a
                      className="AllBenefits"
                      href={"all-benefits?lng=" + t("current-language-code")}
                      target="_blank"
                    >
                      {t("Show All Benefits")}
                    </a>
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={9} xs={12}>
              <Grid container spacing={24}>
                {benefits.map((benefit, i) => (
                  <BenefitTitleCard
                    id={"bc" + i}
                    className="BenefitCards"
                    benefit={benefit}
                    t={this.props.t}
                    key={i}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
