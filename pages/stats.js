import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import PrChart from "../components/stats/prChart";
import PrDurationChart from "../components/stats/pr_duration_chart";
import Container from "../components/container";

const marginTop = css`
  margin-top: 24px;
`;

export class Stats extends Component {
  render() {
    const { i18n, t } = this.props;

    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        showRefreshCache={false}
        title={t("titles.stats")}
      >
        <Container className={marginTop}>
          <h1>{t("stats.title")}</h1>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Paper>
                <PrChart t={t} store={this.props.store} id="PrChart" />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <PrDurationChart
                  t={t}
                  store={this.props.store}
                  id="PrDurationChart"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

Stats.propTypes = {
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default withI18next()(Stats);
