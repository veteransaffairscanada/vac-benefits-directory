// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import BenefitCardList, {
  BenefitTitleCardList
} from "../components/benefit_cards";
import SelectedOptions from "../components/selected_options_card";
import { logEvent } from "../utils/analytics";

type Props = {
  i18n: mixed,
  t: mixed
};

class App extends Component<Props> {
  props: Props;

  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    const benefitList = [
      {
        type: "Support for Families",
        title: "Survivor's Pension",
        description: "Survivor's Pension Description"
      },
      {
        type: "Financial",
        title: "Disability Award",
        description: "Disability Award Description"
      }
    ];
    const selected_options = [
      "Financial Support",
      "Mental Health Services",
      "Career Transition"
    ];
    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p style={{ textAlign: "left", fontSize: "1em" }}>
                {t("A3.Your Selection") + ":"}
              </p>
            </Grid>

            <Grid item>
              <SelectedOptions page="A1" options={selected_options} t={t} />
            </Grid>
          </Grid>
        </div>

        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <BenefitTitleCardList benefitList={benefitList} t={t} />
          </Grid>
        </div>

        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <BenefitCardList benefitList={benefitList} t={t} />
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default withI18next()(App);
