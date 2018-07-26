import React, { Component } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

const styles = () => ({
  table: {
    // width: 1000
  }
});

export class PrTable extends Component {
  filterMerged = () => {
    return this.props.githubData.filter(pr => pr.merged_at);
  };

  render() {
    const { classes, t } = this.props; // eslint-disable-line no-unused-vars

    return (
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
                  <Moment format="DD/MM/YYYY hh:mm A">{pr.merged_at}</Moment>
                </TableCell>
                <TableCell>{pr.title}</TableCell>
                <TableCell>{pr.user.login}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    githubData: reduxState.githubData
  };
};

PrTable.propTypes = {
  classes: PropTypes.object.isRequired,
  githubData: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(PrTable)
);
