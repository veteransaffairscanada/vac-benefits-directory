import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pin from "@material-ui/icons/Place";

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  distanceCell: {
    textAlign: "right",
    verticalAlign: "top",
    width: "20px"
  },
  distanceCellTitle: {
    textAlign: "right",
    width: "20px"
  },
  officeCell: {
    paddingRight: "10px"
  },
  officeTitle: {
    fontWeight: "bold"
  },
  pin: {
    color: "#ea4335",
    float: "left",
    fontSize: "60px",
    marginBottom: "30px",
    paddingTop: "10px"
  },
  provinceCell: {
    color: "#000",
    fontSize: "18px"
  },
  selectedRow: {
    backgroundColor: "#e4e8fe"
  }
});

export class AreaOfficeTable extends Component {
  computeDistanceKm = (lat1, long1, lat2, long2) => {
    const R = 6371; // kilometres
    const Radians = degrees => (degrees * Math.PI) / 180;
    const lat1Rad = Radians(lat1);
    const long1Rad = Radians(long1);
    const lat2Rad = Radians(lat2);
    const long2Rad = Radians(long2);
    const x = (long2Rad - long1Rad) * Math.cos((lat1Rad + lat2Rad) / 2);
    const y = lat2Rad - lat1Rad;
    return Math.sqrt(x * x + y * y) * R;
  };

  defaultAreaOffices = () => {
    const reducer = (acc, office) => {
      const key = [office.province_en, office.province_fr];
      if (acc[key]) {
        acc[key].push(office);
      } else {
        acc[key] = [office];
      }
      return acc;
    };
    return this.props.areaOffices.reduce(reducer, {});
  };

  isDefaultLocation = () => {
    const defaultLocation = { lat: 49, lng: -104 };
    return (
      JSON.stringify(defaultLocation) ===
      JSON.stringify(this.props.userLocation)
    );
  };

  officeDistance = () => {
    let officeDistance = {};
    this.props.areaOffices.forEach(ae => {
      officeDistance[ae.id] = this.computeDistanceKm(
        this.props.userLocation.lat,
        this.props.userLocation.lng,
        ae.lat,
        ae.lng
      );
    });
    return officeDistance;
  };

  sortedAreaOffices = () => {
    let officeDistance = this.officeDistance();
    let sortedOffices = this.props.areaOffices.sort((a, b) => {
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
    if (Object.values(officeDistance)[0]) {
      this.props.setClosestAreaOffice(sortedOffices[0]);
    }
    return sortedOffices;
  };

  sortProvinces = provinces => {
    let index = this.props.t("current-language-code") == "en" ? 0 : 1;
    return provinces.sort((a, b) =>
      a.split(",")[index].localeCompare(b.split(",")[index])
    );
  };

  tableRow = ae => {
    const language = this.props.t("current-language-code");
    const distances = this.officeDistance();
    return (
      <TableRow
        key={ae.id}
        id={"tableRow" + ae.id}
        className={
          ae.id === this.props.selectedAreaOffice.id
            ? this.props.classes.selectedRow
            : ""
        }
        onClick={() => {
          this.props.setMapView({
            lat: ae.lat,
            lng: ae.lng,
            zoom: 10
          });
          this.props.setSelectedAreaOffice(ae);
        }}
      >
        <TableCell className={this.props.classes.officeCell}>
          <Pin className={this.props.classes.pin} />
          <p className={this.props.classes.officeTitle}>
            {language === "en" ? ae.name_en : ae.name_fr}
          </p>
          {language === "en" ? ae.address_en : ae.address_fr}
        </TableCell>
        <TableCell className={this.props.classes.distanceCell}>
          {this.isDefaultLocation() ? (
            ""
          ) : (
            <p className={this.props.classes.officeTitle}>
              {Math.round(distances[ae.id]) + " km"}
            </p>
          )}
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { t, classes } = this.props;
    const defaultOffices = this.defaultAreaOffices();
    return (
      <div>
        <div style={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow id="tableHeader">
                <TableCell className={classes.officeCell}>
                  {t("map.office")}
                </TableCell>
                <TableCell className={classes.distanceCellTitle}>
                  {this.isDefaultLocation() ? "" : t("map.distance")}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </div>

        <div style={{ height: "400px", width: "100%", overflowY: "scroll" }}>
          <Table>
            <TableBody>
              {this.isDefaultLocation()
                ? this.sortProvinces(Object.keys(defaultOffices)).map(
                    (name, index) => {
                      return (
                        <div key={index}>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                className={classes.provinceCell}
                                colSpan="2"
                              >
                                {t("current-language-code") == "en"
                                  ? name.split(",")[0]
                                  : name.split(",")[1]}{" "}
                                ({defaultOffices[name].length})
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          {defaultOffices[name].map(ae => this.tableRow(ae))}
                        </div>
                      );
                    }
                  )
                : this.sortedAreaOffices().map(ae => this.tableRow(ae))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setClosestAreaOffice: closestAreaOffice => {
      dispatch({ type: "SET_CLOSEST_OFFICE", data: closestAreaOffice });
    },
    setSelectedAreaOffice: selectedAreaOffice => {
      dispatch({ type: "SET_SELECTED_OFFICE", data: selectedAreaOffice });
    },
    setMapView: mapView => {
      dispatch({ type: "SET_MAP_VIEW", data: mapView });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    areaOffices: reduxState.areaOffices,
    selectedAreaOffice: reduxState.selectedAreaOffice,
    userLocation: reduxState.userLocation
  };
};

AreaOfficeTable.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  selectedAreaOffice: PropTypes.object.isRequired,
  setClosestAreaOffice: PropTypes.func.isRequired,
  setSelectedAreaOffice: PropTypes.func.isRequired,
  setMapView: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  userLocation: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AreaOfficeTable));
