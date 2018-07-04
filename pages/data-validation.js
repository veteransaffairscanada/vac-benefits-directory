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
import { redux2i18n } from "../utils/redux2i18n";

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

  componentWillMount() {
    redux2i18n(this.props.i18n, this.props.text);
  }

  getBrokenBenefits(b, i) {
    if (this.checkMissingNeeds(b) || this.checkIfMissingText(b)) {
      return " " + b.id + " (" + (i + 1) + "),";
    }
  }

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

  checkMissingNeeds(b) {
    return !(b.needs && b.needs != "");
  }

  render() {
    const {
      i18n,
      t,
      classes,
      benefits,
      eligibilityPaths,
      needs,
      examples,
      text
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
        "nameTextTableSize",
        text.length,
        text.length > 0 ? "Pass" : "Fail"
      ),
      this.createData(
        "Benefits with Empty Fields",
        benefits.filter(this.checkIfMissingText).length,
        benefits.filter(this.checkIfMissingText).length == 0 ? "Pass" : "Fail"
      ),
      this.createData(
        "Benefits Without Needs",
        benefits.filter(this.checkMissingNeeds).length,
        benefits.filter(this.checkMissingNeeds).length == 0 ? "Pass" : "Fail"
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
              <TableRow>
                <TableCell> {t("dv.Benefits failing tests")} </TableCell>
                <TableCell>
                  {" "}
                  {benefits.map((b, i) => {
                    return this.getBrokenBenefits(b, i);
                  })}
                </TableCell>
              </TableRow>
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
    examples: state.examples,
    text: state.text
  };
};

DataValidation.propTypes = {
  benefits: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  needs: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  text: PropTypes.array.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps)(withI18next()(DataValidation))
);
