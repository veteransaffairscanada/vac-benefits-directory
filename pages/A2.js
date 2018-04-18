// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";
import { Card, Button } from "material-ui";

import withRedux from "next-redux-wrapper";
import { initStore } from "../store";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { logEvent } from "../utils/analytics";
import Link from "next/link";
import SelectButton from "../components/select_button";

type Props = {
  i18n: mixed,
  t: mixed,
  userStatuses: mixed
};

export class App extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      selectedOptions: []
    };
  }

  toggleButton = id => {
    let selected = this.state.selectedOptions;
    const index = selected.indexOf(id);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    this.setState({
      selectedOptions: selected
    });
  };

  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  throwError = () => {
    throw new Error("test");
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <p style={{ textAlign: "center", fontSize: "1.5em" }}>
                {t("A2.What best describes your status?")}
              </p>
            </Grid>
          </Grid>

          {this.props.userStatuses.map((service, i) => (
            <Grid
              container
              key={i}
              justify="center"
              spacing={24}
              style={{ marginTop: "1em" }}
            >
              <Grid item sm={4} xs={12}>
                <SelectButton
                  t={t}
                  id={service}
                  text={"A2." + service}
                  onClick={this.toggleButton}
                  isDown={this.state.selectedOptions.indexOf(service) >= 0}
                />
              </Grid>
            </Grid>
          ))}

          <Grid
            container
            justify="center"
            spacing={24}
            style={{ marginTop: "3em" }}
          >
            <Grid item sm={4} xs={12}>
              <Card>
                <Button fullWidth={true}>{t("A2.See Results")}</Button>
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            spacing={24}
            style={{ marginTop: "1em" }}
          >
            <Grid item sm={4} xs={12}>
              <p style={{ textAlign: "center", fontSize: "1em" }}>
                <Link href="all-benefits">
                  <a>{t("Show All Benefits")}</a>
                </Link>
              </p>
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userStatuses: state.userStatuses
  };
};

export default withRedux(initStore, mapStateToProps, null)(withI18next()(App));
