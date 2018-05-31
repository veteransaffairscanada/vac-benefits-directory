import React, { Component } from "react";

import { Grid } from "material-ui";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    width: 500
  }
});

let id = 0;
function createData(name, status) {
  id += 1;
  return { id, name, status };
}

const failingLinks = links => {
  return 0;
};

export class DataValidation extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  render() {
    const { i18n, t, classes, benefits } = this.props; // eslint-disable-line no-unused-vars
    const { error, isLoaded, items } = this.state;

    const data = [createData("Number of Benefits", benefits.length)];

    const failingLinksEn = failingLinks(benefits.map(b => b.benefitPageEn));
    const failingLinksFr = failingLinks(benefits.map(b => b.benefitPageFr));

    return (
      <Layout i18n={i18n} t={t} hideNoscript={true}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell numeric>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell numeric>{n.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    benefits: state.benefits
  };
};

export default withStyles(styles)(
  connect(mapStateToProps)(withI18next()(DataValidation))
);
