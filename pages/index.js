// @flow

import React, { Component } from "react";
import { SelectButton } from "../components/select_button";

import { Grid } from "material-ui";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";

type Props = {
  i18n: mixed,
  t: mixed
};

export class App extends Component<Props> {
  props: Props;

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h1 id="TextDescription" name="TextDescription">
                {t("home.poc-description")}
              </h1>
            </Grid>
            {/*<Grid item xs={3}>*/}
            {/*<SelectButton*/}
            {/*fullWidth={true}*/}
            {/*href={"A?lng=" + t("current-language-code")}*/}
            {/*text="A"*/}
            {/*/>*/}
            {/*</Grid>*/}
            <Grid item xs={3}>
              <SelectButton
                fullWidth={true}
                href={"A?section=BB&lng=" + t("current-language-code")}
                text="B"
              />
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default withI18next(["common"])(App);
