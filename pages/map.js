import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { redux2i18n } from "../utils/redux2i18n";
import AreaOfficeMap from "../components/area_office_map";
import TableHead from "@material-ui/core/TableHead/index";
import Paper from "@material-ui/core/Paper/index";
import TableCell from "@material-ui/core/TableCell/index";
import Table from "@material-ui/core/Table/index";
import TableBody from "@material-ui/core/TableBody/index";
import TableRow from "@material-ui/core/TableRow/index";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});
const google_maps_key = process.env.GOOGLE_MAPS_KEY;
export class Map extends Component {
  constructor() {
    super();
    this.state = {
      lat: undefined,
      lng: undefined,
      zoom: undefined
    };
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 10
        });
      });
    } else {
      //browser doesn't support geolocation
      this.setState({
        lat: undefined,
        lng: undefined,
        zoom: undefined
      });
    }
  }

  componentWillMount() {
    redux2i18n(this.props.i18n, this.props.text);
  }

  componentDidMount() {
    this.getLocation();
  }

  computeDistanceKm(lat1, long1, lat2, long2) {
    const R = 6371; // kilometres
    const Radians = degrees => degrees * Math.PI / 180;
    if (!lat1 || !lat2 || !long1 || !long2) return undefined;
    const lat1Rad = Radians(lat1);
    const long1Rad = Radians(long1);
    const lat2Rad = Radians(lat2);
    const long2Rad = Radians(long2);
    const x = (long2Rad - long1Rad) * Math.cos((lat1Rad + lat2Rad) / 2);
    const y = lat2Rad - lat1Rad;
    return Math.sqrt(x * x + y * y) * R;
  }

  render() {
    const { i18n, t, classes } = this.props;
    const language = t("current-language-code");
    let officeDistance = {};
    this.props.areaOffices.forEach(ae => {
      officeDistance[ae.id] = this.computeDistanceKm(
        this.state.lat,
        this.state.lng,
        ae.lat,
        ae.lng
      );
    });
    const sortedAreaOffices = this.props.areaOffices.sort((a, b) => {
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
    return (
      <Layout
        title={"Map"}
        i18n={i18n}
        t={t}
        hideNoscript={true}
        showRefreshCache={false}
      >
        <div>
          <AreaOfficeMap
            id="AreaOfficeMap"
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?key=" +
              google_maps_key +
              "&language=" +
              t("current-language-code") +
              "&v=3.exp&libraries=geometry,drawing,places"
            }
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "400px" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom}
            t={t}
          />

          <Paper className={classes.root}>
            <Table>
              <TableHead>
                <TableRow id="tableHeader">
                  <TableCell>{t("map.office")}</TableCell>
                  <TableCell>{t("map.address")}</TableCell>
                  <TableCell>{t("map.distance")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAreaOffices.map(ae => {
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
          </Paper>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    text: state.text,
    areaOffices: state.areaOffices
  };
};

Map.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  areaOffices: PropTypes.array.isRequired,
  text: PropTypes.array.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(withI18next()(Map)));
