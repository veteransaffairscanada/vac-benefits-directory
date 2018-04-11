// @flow

import React, { Component } from "react";

import { AppBar, Button, Grid, Toolbar, Typography } from "material-ui";

import { withI18next } from "../lib/withI18next";
import { GoCSignature } from "@cdssnc/gcui";
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
    const { i18n, t } = this.props, // eslint-disable-line no-unused-vars
      envDetails = process.env.CIRCLE_SHA1
        ? process.env.CIRCLE_SHA1
        : process.env.NODE_ENV;

    return (
      <Layout>
        <AppBar style={{ backgroundColor: "#000" }} position="static">
          <Toolbar>
            <GoCSignature width="20em" text="#fff" flag="#fff" />
            <Typography style={{ flex: 1 }} />
            <Button style={{ color: "#fff" }} onClick={this.changeLanguage}>
              {t("other-language")}
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <p
              id="TextDescription"
              name="TextDescription"
              className={styles.example}
            >
              {t("poc-description")}
            </p>
          </Grid>
        </Grid>
        <div className={styles.footer}>{envDetails}</div>
      </Layout>
    );
  }
}

export default withI18next(["home"])(App);
