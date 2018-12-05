import React, { Component } from "react";
import PropTypes from "prop-types";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { connect } from "react-redux";
import AreaOfficeMap from "../components/area_office_map";
import AreaOfficeTable from "../components/area_office_table";
import PlaceSearch from "../components/place_search";
import { Grid } from "@material-ui/core";
import Paper from "../components/paper";
import { globalTheme } from "../theme";
import { css } from "react-emotion";
import Container from "../components/container";
import Header from "../components/typography/header";
import Body from "../components/typography/body";
import AnchorLink from "../components/typography/anchor_link";
import BreadCrumbs from "../components/breadcrumbs";
import { mutateUrl } from "../utils/common";

const mapPaper = css`
  margin-top: ${globalTheme.marginTop};
`;
const topMatter = css`
  margin-top: 30px !important;
`;
const mapContainer = css`
  height: 800px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    height: 230px;
  }
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

  render() {
    const { i18n, t, url } = this.props;
    const breadcrumbs = [
      {
        url: mutateUrl(url, "/benefits-directory"),
        name: t("ge.Find benefits and services")
      }
    ];

    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={true}
        showRefreshCache={false}
        title={t("titles.map")}
        backgroundColor={globalTheme.colour.white}
      >
        <BreadCrumbs
          t={t}
          breadcrumbs={breadcrumbs}
          pageTitle={t("map.vacOffices")}
        />
        <Container>
          <Grid container spacing={24}>
            <Grid item xs={12} md={12} className={topMatter}>
              <Header size="xl" headingLevel="h1">
                {t("map.vacOffices")}
              </Header>
            </Grid>
            <Grid item xs={12} md={12} id="contactInfo">
              <Body>
                <p>
                  {t("map.contact_1") + " "}
                  <AnchorLink fontSize={18} href={"tel:+" + t("contact.phone")}>
                    {t("contact.phone")}
                  </AnchorLink>
                  {" " + t("map.contact_2")}
                </p>
              </Body>
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

          <Paper className={mapPaper}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={8}>
                <AreaOfficeMap
                  id="AreaOfficeMap"
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={<div className={mapContainer} />}
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

const mapStateToProps = reduxState => {
  return {
    referrer: reduxState.referrer
  };
};

Map.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  referrer: PropTypes.string,
  setUserLocation: PropTypes.func.isRequired,
  setMapView: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18N(Map));
