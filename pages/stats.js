import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    maxWidth: "1200px",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    margin: "0 auto"
  },
  table: {
    // width: 1000
  }
});

export class Stats extends Component {
  render() {
    const { classes, i18n, t } = this.props; // eslint-disable-line no-unused-vars

    const pullRequests = this.props.githubData;

    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
      >
        <div className={classes.root}>
          <h1> {t("stats.title")} </h1>
          <Table className={classes.table}>
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "60%" }} />
              <col style={{ width: "30%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>Merged At</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pullRequests.map((pr, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{pr.merged_at}</TableCell>
                    <TableCell>{pr.title}</TableCell>
                    <TableCell>{pr.user.login}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    githubData: state.githubData
  };
};

Stats.propTypes = {
  githubData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps)(withI18next()(Stats))
);
