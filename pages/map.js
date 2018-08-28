import React, { Component } from "react";
import PropTypes from "prop-types";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import AreaOfficeMap from "../components/area_office_map";
import AreaOfficeTable from "../components/area_office_table";
import PlaceSearch from "../components/place_search";
import { Grid, Button } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Paper from "@material-ui/core/Paper/index";
import Link from "next/link";
import { globalTheme } from "../theme";
import { css } from "react-emotion";
import Container from "../components/container";

const paper = css`
  margin-top: ${globalTheme.marginTop};
`;

const mapTitle = css`
  font-size: 36px !important;
`;

const backLink = css`
  font-size: 20px !important;
  font-weight: 100 !important;
  margin-bottom: 15px !important;
  padding-left: 0px !important;
  text-decoration: none !important;
  text-transform: none !important;
`;

const topMatter = css`
  margin-top: 30px !important;
`;

const root = css`
  margin-left: 15px;
  margin-right: 15px;
`;

export class Map extends Component {
  getLocation() {
    this.props.setUserLocation({
      lat: 49,
      lng: -104
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let coords = {
          lat: +position.coords.latitude,
          lng: +position.coords.longitude
        };
        this.props.setUserLocation(coords);
        this.props.setMapView({ lat: coords.lat, lng: coords.lng, zoom: 10 });
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
    const { i18n, t } = this.props;
    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={true}
        showRefreshCache={false}
        title={t("titles.map")}
      >
        <Container>
          <div className={root}>
            <Grid container spacing={24}>
              <Grid item xs={12} md={8} className={topMatter}>
                <Link href={this.get_link("favourites")}>
                  <Button
                    variant="flat"
                    size="large"
                    className={backLink}
                    id="backButton"
                  >
                    <ArrowBack />
                    &nbsp; &nbsp;
                    {t("back")}
                  </Button>
                </Link>
                <h1 className={mapTitle}>{t("map.vacOffices")}</h1>
              </Grid>
              <Grid item xs={12} md={4} className={topMatter} id="contactInfo">
                <p>
                  <a href={"tel:" + t("contact.phone")}>{t("contact.phone")}</a>
                </p>
                <p>{t("favourites.call_time")}</p>
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                className={this.placeSearch}
                id="placeSearchHold"
              >
                <PlaceSearch
                  id="PlaceSearch"
                  containerElement={
                    <div style={{ height: "0px", marginRight: "50px" }} />
                  }
                  loadingElement={<div style={{ height: "100%" }} />}
                  store={this.props.store}
                  t={t}
                />
              </Grid>
            </Grid>

            <Paper className={paper}>
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
        </Container>
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
  areaOffices: PropTypes.array.isRequired,
  setUserLocation: PropTypes.func.isRequired,
  setMapView: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18next()(Map));
