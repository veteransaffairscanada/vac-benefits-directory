// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { BenefitCard } from "../components/benefit_cards";

type Props = {
  benefits: mixed,
  i18n: mixed,
  loadDataStore: mixed,
  storeHydrated: boolean,
  t: mixed,
  corporaEn: mixed,
  corporaFr: mixed,
  benefitTypes: mixed
};

export class AllBenefits extends Component<Props> {
  props: Props;

  static getInitialProps(ctx) {
    let data = ctx.req.data;
    return {
      benefitTypes: data.benefitTypes,
      patronTypes: data.patronTypes,
      benefits: data.benefits,
      corporaEn: data.corporaEn,
      corporaFr: data.corporaFr
    };
  }

  enrichBenefit = (benefit, benefitTypes, corporaEn, corporaFr) => {
    let corporas = corporaEn.filter(corp => corp.benefits.includes(benefit.id));
    benefit.linkEn =
      corporas.length > 0 ? corporas[0].full_description_link : undefined;
    benefit.descriptionEn =
      corporas.length > 0 ? corporas[0].one_line_description : undefined;

    corporas = corporaFr.filter(corp => corp.benefits.includes(benefit.id));
    benefit.linkFr =
      corporas.length > 0 ? corporas[0].full_description_link : undefined;
    benefit.descriptionFr =
      corporas.length > 0 ? corporas[0].one_line_description : undefined;

    let bts = benefitTypes.filter(bt => bt.benefits.includes(benefit.id));
    benefit.benefitTypeEn = bts.length > 0 ? bts[0].name_en : "";
    benefit.benefitTypeFr = bts.length > 0 ? bts[0].name_fr : "";
    return benefit;
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    let benefits = this.props.benefits.map(benefit =>
      this.enrichBenefit(
        benefit,
        this.props.benefitTypes,
        this.props.corporaEn,
        this.props.corporaFr
      )
    );

    return (
      <Layout i18n={i18n} t={t} hideNoscript={true}>
        <div style={{ padding: 12 }} className="allBenefitsList">
          <h1>{t("all-benefits.List of all benefits")}</h1>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                {benefits.map((benefit, i) => (
                  <BenefitCard
                    id={"bc" + i}
                    benefit={benefit}
                    t={this.props.t}
                    key={i}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default withI18next()(AllBenefits);
