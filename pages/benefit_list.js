// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { initStore, addCount } from "../store";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import BenefitCardList, {
  BenefitTitleCardList
} from "../components/benefit_cards";
import SelectedOptions from "../components/selected_options_card";
import { logEvent } from "../utils/analytics";

type Props = {
  i18n: mixed,
  t: mixed,
  benefitList: mixed,
  count: number,
  addCount: mixed
};

class App extends Component<Props> {
  props: Props;

  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    const selected_options = [
      "Financial Support",
      "Mental Health Services",
      "Career Transition"
    ];

    const add = () => {
      this.props.addCount();
    };

    return (
      <Layout i18n={i18n} t={t}>
        <p>Count: {this.props.count}</p>
        <button onClick={add}>Add To Count</button>

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
            <BenefitTitleCardList benefitList={this.props.benefitList} t={t} />
          </Grid>
        </div>

        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <BenefitCardList benefitList={this.props.benefitList} t={t} />
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    count: state.count,
    benefitList: state.benefitList
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withI18next()(App)
);
