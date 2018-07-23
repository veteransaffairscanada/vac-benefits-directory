import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";

import fetch from "isomorphic-fetch";
import { withStyles } from "@material-ui/core/styles/index";

const access_token = process.env.GITHUB_PUBLIC_ACCESS_TOKEN;
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
  constructor() {
    super();
    this.state = {
      pullRequests: []
    };
  }

  componentDidMount() {
    Promise.resolve(this.getData()).then(data => {
      this.setState({
        pullRequests: data
      });
    });
  }

  getData = async function fetchTableFromAirtable() {
    let offset = undefined;
    let jsonRecords = [];

    do {
      let url =
        "https://api.github.com/repos/cds-snc/vac-benefits-directory/pulls?per_page=20&access_token=" +
        access_token +
        "&state=closed";
      if (offset) {
        url = url + "&page=" + offset;
      }
      const resp = await fetch(url, {});
      const json = await resp.json();
      jsonRecords = jsonRecords.concat(json);
      // offset = json.offset;
    } while (offset);

    return jsonRecords.map(pr => {
      let day = new Date(pr.merged_at);
      day.setHours(0, 0, 0);
      return {
        created_at: pr.created_at,
        closed_at: pr.closed_at,
        merged_at: pr.merged_at,
        merged_day: day,
        title: pr.title,
        user: pr.user.login
      };
    });
  };

  render() {
    const { classes, i18n, t } = this.props; // eslint-disable-line no-unused-vars

    let dailyPRs = [];
    this.state.pullRequests.forEach(pr => {
      dailyPRs[pr.merged_day] =
        1 + (dailyPRs[pr.merged_day] ? dailyPRs[pr.merged_day] : 0);
    });

    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
      >
        <div className={classes.root}>
          <Table className={classes.table}>
            <colgroup>
              <col style={{ width: "10%" }} />
              {/*<col style={{ width: "10%" }}/>*/}
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
              {this.state.pullRequests.map((pr, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{pr.merged_at}</TableCell>
                    <TableCell>{pr.title}</TableCell>
                    <TableCell>{pr.user}</TableCell>
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

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withStyles(styles)(withI18next()(Stats));
