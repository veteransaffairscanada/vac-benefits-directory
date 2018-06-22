import React, { Component } from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

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

export class DataValidation extends Component {
  createData = (name, value, status) => {
    return { name, value, status };
  };

  checkIfMissingText(b) {
    return (
      !(b.vacNameEn && b.vacNameEn != "") ||
      !(b.vacNameFr && b.vacNameFr != "") ||
      !(b.oneLineDescriptionEn && b.oneLineDescriptionEn != "") ||
      !(b.oneLineDescriptionFr && b.oneLineDescriptionFr != "") ||
      !(b.benefitPageEn && b.benefitPageEn != "") ||
      !(b.benefitPageFr && b.benefitPageFr != "")
    );
  }

  render() {
    const {
      i18n,
      t,
      classes,
      benefits,
      eligibilityPaths,
      needs,
      examples
    } = this.props; // eslint-disable-line no-unused-vars

    const data = [
      this.createData(
        "Size of Benefits Table",
        benefits.length,
        benefits.length > 0 ? "Pass" : "Fail"
      ),
      this.createData(
        "Size of Eligibility Paths Table",
        eligibilityPaths.length,
        eligibilityPaths.length > 0 ? "Pass" : "Fail"
      ),
      this.createData(
        "Size of Needs Table",
        needs.length,
        needs.length > 0 ? "Pass" : "Fail"
      ),
      this.createData(
        "Size of Examples Table",
        examples.length,
        examples.length > 0 ? "Pass" : "Fail"
      ),
      this.createData(
        "Benefits with Empty Fields",
        benefits.filter(this.checkIfMissingText).length,
        benefits.filter(this.checkIfMissingText).length == 0 ? "Pass" : "Fail"
      )
    ];

    return (
      <Layout
        title={t("dv.pageTitle")}
        i18n={i18n}
        t={t}
        hideNoscript={true}
        showRefreshCache={true}
      >
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>{t("dv.name")}</TableCell>
                <TableCell>{t("dv.value")}</TableCell>
                <TableCell>{t("dv.status")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((n, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{t("dv." + n.name)}</TableCell>
                    <TableCell>{n.value}</TableCell>
                    <TableCell>{t("dv." + n.status)}</TableCell>
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
    benefits: state.benefits,
    eligibilityPaths: state.eligibilityPaths,
    needs: state.needs,
    examples: state.examples
  };
};

DataValidation.propTypes = {
  benefits: PropTypes.array,
  eligibilityPaths: PropTypes.array,
  needs: PropTypes.array,
  examples: PropTypes.array,
  i18n: PropTypes.object,
  t: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(
  connect(mapStateToProps)(withI18next()(DataValidation))
);
