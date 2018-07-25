import React, { Component } from "react";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
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
  filterMerged = () => {
    return this.props.githubData.filter(pr => pr.merged_at);
  };

  render() {
    const { classes, i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
      >
        <div className={classes.root}>
          <h1> {t("stats.title")} </h1>
          <Paper>
            <Table className={classes.table}>
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "40%" }} />
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
                {this.filterMerged().map((pr, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <Moment format="DD/MM/YYYY hh:mm A">
                          {pr.merged_at}
                        </Moment>
                      </TableCell>
                      <TableCell>{pr.title}</TableCell>
                      <TableCell>{pr.user.login}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
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
