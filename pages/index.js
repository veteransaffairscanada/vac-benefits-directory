// @flow

import React, { Component } from "react";

import { AppBar, Button, Grid, Toolbar, Typography } from "material-ui";

import { withI18next } from "../lib/withI18next";
import withSentry from "../lib/withSentry";
import { GoCSignature } from "@cdssnc/gcui";
import Head from "../components/head";
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

  render() {
    const { i18n, t } = this.props, // eslint-disable-line no-unused-vars
      envDetails = process.env.CIRCLE_SHA1
        ? process.env.CIRCLE_SHA1
        : process.env.NODE_ENV;

    return (
      <div>
        <Head />
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
      </div>
    );
  }
}

export default withSentry(withI18next(["home"])(App));
