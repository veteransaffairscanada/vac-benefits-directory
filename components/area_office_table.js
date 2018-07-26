import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

export class AreaOfficeTable extends Component {
  computeDistanceKm = (lat1, long1, lat2, long2) => {
    const R = 6371; // kilometres
    const Radians = degrees => (degrees * Math.PI) / 180;
    if (!lat1 || !lat2 || !long1 || !long2) return undefined;
    const lat1Rad = Radians(lat1);
    const long1Rad = Radians(long1);
    const lat2Rad = Radians(lat2);
    const long2Rad = Radians(long2);
    const x = (long2Rad - long1Rad) * Math.cos((lat1Rad + lat2Rad) / 2);
    const y = lat2Rad - lat1Rad;
    return Math.sqrt(x * x + y * y) * R;
  };

  officeDistance = () => {
    let officeDistance = {};
    this.props.areaOffices.forEach(ae => {
      officeDistance[ae.id] = this.computeDistanceKm(
        this.props.lat,
        this.props.lng,
        ae.lat,
        ae.lng
      );
    });
    return officeDistance;
  };

  sortedAreaOffices = () => {
    let officeDistance = this.officeDistance();
    return this.props.areaOffices.sort((a, b) => {
      const diff = officeDistance[a.id]
        ? officeDistance[a.id] - officeDistance[b.id]
        : a.name_en.toUpperCase().localeCompare(b.name_en.toUpperCase());
      switch (true) {
        case diff > 0:
          return 1;
        case diff < 0:
          return -1;
        default:
          return 0;
      }
    });
  };

  render() {
    const { t } = this.props;
    const language = t("current-language-code");
    const officeDistance = this.officeDistance();
    return (
      <Table>
        <TableHead>
          <TableRow id="tableHeader">
            <TableCell>{t("map.office")}</TableCell>
            <TableCell>{t("map.address")}</TableCell>
            <TableCell>{t("map.distance")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.sortedAreaOffices().map(ae => {
            return (
              <TableRow key={ae.id} id={"tableRow" + ae.id}>
                <TableCell>
                  {language === "en" ? ae.name_en : ae.name_fr}
                </TableCell>
                <TableCell>
                  {language === "en" ? ae.address_en : ae.address_fr}
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  {Math.round(officeDistance[ae.id]) + " km"}
                </TableCell>
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
    areaOffices: reduxState.areaOffices
  };
};

AreaOfficeTable.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  lat: PropTypes.any,
  lng: PropTypes.any,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(AreaOfficeTable)
);
