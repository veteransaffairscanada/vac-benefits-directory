import React, { Component } from "react";
import PropTypes from "prop-types";
import { SelectButton } from "../components/select_button";

import { Grid } from "material-ui";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";

export class App extends Component {
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
            <Grid item xs={3}>
              <SelectButton
                fullWidth={true}
                href={"A?section=BB&lng=" + t("current-language-code")}
                text="B"
              />
            </Grid>
            <Grid item xs={3}>
              <SelectButton
                fullWidth={true}
                href={"data-validation"}
                text={t("index.data validation")}
              />
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

App.propTypes = {
  i18n: PropTypes.object,
  t: PropTypes.func
};

export default withI18next(["common"])(App);
