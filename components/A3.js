// @flow

import React, { Component } from "react";
import { Grid } from "material-ui";
import Link from "next/link";
import SelectedOptionsCard from "../components/selected_options_card";
import { BenefitTitleCardList } from "../components/benefit_cards";

type Props = {
  i18n: mixed,
  t: mixed,
  storeHydrated: boolean,
  benefitTypes: mixed,
  patronTypes: mixed,
  benefits: mixed,
  corporaEn: mixed,
  corporaFr: mixed,
  selectedBenefitTypes: mixed,
  selectedPatronTypes: mixed,
  switchSection: mixed
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
    });
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

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
    benefits = benefits.map(benefit => {
      let links = this.props.corporaEn.filter(corp =>
        corp.benefits.includes(benefit.id)
      );
      benefit.linkEn =
        links.length > 0 ? links[0].full_description_link : undefined;
      links = this.props.corporaFr.filter(corp =>
        corp.benefits.includes(benefit.id)
      );
      benefit.linkFr =
        links.length > 0 ? links[0].full_description_link : undefined;
      return benefit;
    });

    return (
      <div>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <p
                id="benefitCountString"
                style={{ textAlign: "left", fontSize: "1.5em" }}
              >
                {this.countBenefitsString(benefits, t)}
              </p>
            </Grid>
          </Grid>
        </div>

        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item sm={3} xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <div style={{ textAlign: "left", fontSize: "1em" }}>
                    {t("A3.Your Selection") + ":"}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <SelectedOptionsCard
                    id="vacServicesCard"
                    page="A1"
                    options={benefitTypes.map(
                      bt =>
                        t("current-language-code") === "en"
                          ? bt.name_en
                          : bt.name_fr
                    )}
                    action={() => this.props.switchSection("A1", {})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectedOptionsCard
                    id="userStatusesCard"
                    page="A2"
                    options={patronTypes.map(
                      pt =>
                        t("current-language-code") === "en"
                          ? pt.name_en
                          : pt.name_fr
                    )}
                    action={() => this.props.switchSection("A2", {})}
                  />
                </Grid>
                <Grid item>
                  <p style={{ textAlign: "center", fontSize: "1em" }}>
                    <Link href="all-benefits">
                      <a>{t("Show All Benefits")}</a>
                    </Link>
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={9} xs={12}>
              <Grid container spacing={24}>
                <BenefitTitleCardList benefits={benefits} t={t} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
