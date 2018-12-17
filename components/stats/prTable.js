import { Component } from "react";
import Moment from "moment";
import ReactMoment from "react-moment";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";

export class PrTable extends Component {
  filterMerged = () => {
    return this.props.githubData.pullRequests
      .filter(pr => pr.merged_at)
      .sort(this.sortByMergedAt);
  };

  sortByMergedAt = (a, b) => {
    if (Moment(a.merged_at).valueOf() > Moment(b.merged_at).valueOf()) {
      return 1;
    }
    if (Moment(a.merged_at).valueOf() < Moment(b.merged_at).valueOf()) {
      return -1;
    }
    return 0;
  };

  render() {
    const { t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Table>
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "50%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>Merged on</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.filterMerged().map((pr, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <ReactMoment format="llll">{pr.merged_at}</ReactMoment>
                </TableCell>
                <TableCell>{pr.title}</TableCell>
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
  githubData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(PrTable);
