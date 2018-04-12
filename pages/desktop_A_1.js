// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";
import { Card, AppBar, Button, Toolbar, Typography } from "material-ui";
import Paper from "material-ui/Paper";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import styles from "../styles/styles.scss";
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

  throwError = () => {
    throw new Error("test");
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    const serviceTypes = [
      "Financial Support",
      "Rehabilitation",
      "Mental Health Services",
      "Health Care",
      "Career Transition",
      "Support for Families"
    ];

    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <p style={{ textAlign: "center", fontSize: "2em" }}>
                {t("A1.What services are you interested in?")}
              </p>
              <p style={{ textAlign: "center", fontSize: "1.5em" }}>
                {t("A1.Select all that apply")}
              </p>
            </Grid>

            {serviceTypes.map((service, i) => (
              <Grid item sm={4} xs={12}>
                <Card>
                  <Button fullWidth={true}>{t("A1." + service)}</Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            justify="center"
            spacing={24}
            style={{ marginTop: "3em" }}
          >
            <Grid item sm={4} xs={12}>
              <Card>
                <Button fullWidth={true}>{t("A1.Next")}</Button>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default withI18next(["common"])(App);
