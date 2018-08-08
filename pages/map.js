import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withI18next } from "../lib/withI18next";
import Typography from "@material-ui/core/Typography";
import Layout from "../components/layout";
import { connect } from "react-redux";
import AreaOfficeMap from "../components/area_office_map";
import AreaOfficeTable from "../components/area_office_table";
import PlaceSearch from "../components/place_search";
import { Grid, Button } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Paper from "@material-ui/core/Paper/index";
import Link from "next/link";

// polyfill from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill#Polyfill

if (!Object.entries)
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };

if (typeof Object.assign != "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      "use strict";
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  mapTitle: {
    fontSize: "36px"
  },
  backLink: {
    fontSize: "20px",
    fontWeight: "100",
    marginBottom: "15px",
    paddingLeft: "0px",
    textDecoration: "none",
    textTransform: "none"
  },
  topMatter: {
    marginTop: "30px"
  }
});
export class Map extends Component {
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let coords = {
          lat: +position.coords.latitude,
          lng: +position.coords.longitude
        };
        this.props.setUserLocation(coords);
        this.props.setMapView({ lat: coords.lat, lng: coords.lng, zoom: 10 });
      });
    } else {
      //browser doesn't support geolocation
      this.props.setUserLocation({
        lat: undefined,
        lng: undefined
      });
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  get_link = page => {
    return (
      page +
      "?" +
      Object.entries(this.props.url.query)
        .filter(x => x[0] !== "" && x[1] !== "")
        .map(x => {
          return x[0] + "=" + x[1];
        })
        .join("&")
    );
  };

  render() {
    const { i18n, t, classes } = this.props;
    return (
      <Layout
        title={"Map"}
        i18n={i18n}
        t={t}
        hideNoscript={true}
        showRefreshCache={false}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "16px",
            paddingRight: "16px"
          }}
        >
          <Grid
            container
            spacing={24}
            style={{ paddingLeft: "16px", paddingRight: "16px" }}
          >
            <Grid item xs={12} md={8} className={classes.topMatter}>
              <Link href={this.get_link("favourites")}>
                <Button
                  variant="flat"
                  size="large"
                  className={classes.backLink}
                  id="backButton"
                >
                  <ArrowBack />
                  &nbsp; &nbsp;
                  {t("back")}
                </Button>
              </Link>
              <Typography className={"MapTitle " + classes.mapTitle}>
                {t("map.vacOffices")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className={classes.topMatter}
              id="contactInfo"
            >
              <Typography>
                <a href={"tel:" + t("contact.phone")}>{t("contact.phone")}</a>
              </Typography>
              <Typography>{t("favourites.call_time")}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.placeSearch}
              id="placeSearchHold"
            >
              <PlaceSearch
                id="PlaceSearch"
                containerElement={<div style={{ height: "0px" }} />}
                loadingElement={<div style={{ height: "100%" }} />}
                store={this.props.store}
                t={t}
              />
            </Grid>
          </Grid>

          <Paper className={classes.root}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <AreaOfficeMap
                  id="AreaOfficeMap"
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={<div style={{ height: "456px" }} />}
                  mapElement={<div style={{ height: "100%" }} />}
                  t={t}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AreaOfficeTable
                  id="AreaOfficeTable"
                  store={this.props.store}
                  t={t}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Layout>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUserLocation: userLocation => {
      dispatch({ type: "SET_USER_LOCATION", data: userLocation });
    },
    setMapView: mapView => {
      dispatch({ type: "SET_MAP_VIEW", data: mapView });
    }
  };
};

const mapStateToProps = state => {
  return {
    areaOffices: state.areaOffices
  };
};

Map.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  areaOffices: PropTypes.array.isRequired,
  setUserLocation: PropTypes.func.isRequired,
  setMapView: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withI18next()(Map))
);
