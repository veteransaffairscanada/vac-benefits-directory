import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { KeyboardBackspace } from "@material-ui/icons";

import {
  InfoWindow,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const styles = () => ({
  button: {
    backgroundColor: "#3e57e2",
    color: "white",
    textAlign: "right",
    textTransform: "none",
    fontSize: "12px",
    padding: "6px"
  },
  rightArrowIcon: {
    "-moz-transform": "scaleX(-1)",
    "-o-transform": "scaleX(-1)",
    "-webkit-transform": "scaleX(-1)",
    transform: "scaleX(-1)",
    float: "left",
    filter: "FlipH",
    "-ms-filter": "FlipH",
    paddingRight: "10px"
  }
});

const isIOS =
  typeof navigator !== "undefined" &&
  (navigator.platform.indexOf("iPhone") !== -1 ||
    navigator.platform.indexOf("iPod") !== -1 ||
    navigator.platform.indexOf("iPad") !== -1);

export class AreaOfficeMap extends Component {
  constructor(props) {
    super(props);
    this.props.setMapView({ lat: 51, lng: -104, zoom: 3 });
    const refs = {};
    this.state = {
      onMapMounted: ref => {
        refs.map = ref;
      },
      onCenterChanged: () => {
        const centre = refs.map.getCenter();
        this.props.setMapView({
          lat: centre.lat(),
          lng: centre.lng(),
          zoom: 10
        });
      }
    };
  }

  selectOffice(selected_office) {
    return () => {
      this.props.setSelectedAreaOffice(selected_office);
      // element in area_office_table
      const elmnt = document.getElementById("tableRow" + selected_office.id);
      if (elmnt !== null) {
        document.getElementById("scrolling_div").scrollTop = elmnt.offsetTop;
      }
    };
  }

  render() {
    const { t, mapView, classes } = this.props;
    return (
      <GoogleMap
        ref={this.state.onMapMounted}
        center={{ lat: +mapView.lat, lng: +mapView.lng }}
        onCenterChanged={this.state.onCenterChanged}
        {...this.props}
        zoom={+mapView.zoom}
      >
        {this.props.areaOffices.map((d, i) => {
          return (
            <Marker
              key={i}
              position={{ lat: +d.lat, lng: +d.lng }}
              onClick={this.selectOffice(d)}
            >
              {this.props.selectedAreaOffice.id === d.id ? (
                <InfoWindow options={{ maxWidth: 200 }}>
                  <div
                    style={{
                      fontColor: `black`,
                      backgroundColor: "white"
                    }}
                  >
                    <div
                      style={{
                        fontSize: `14px`,
                        fontWeight: "500",
                        fontFamily: ["Merriweather", "serif"]
                      }}
                    >
                      {d["name_" + t("current-language-code")]}
                    </div>
                    <br />
                    <div
                      style={{
                        fontSize: `12px`,
                        fontFamily: ["Merriweather", "serif"]
                      }}
                    >
                      {d["address_" + t("current-language-code")]}
                    </div>
                    <br />
                    <Button
                      id="getDirectionsButton"
                      className={classes.button}
                      target="_blank"
                      variant="raised"
                      href={
                        isIOS
                          ? "https://maps.apple.com/?daddr=" + d["address_en"]
                          : "https://www.google.com/maps?saddr=My+Location&daddr=" +
                            d["address_en"]
                      }
                    >
                      {t("map.get_directions")}
                      <KeyboardBackspace className={classes.rightArrowIcon} />
                    </Button>
                  </div>
                </InfoWindow>
              ) : (
                ""
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
    mapView: reduxState.mapView
  };
};

AreaOfficeMap.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  setSelectedAreaOffice: PropTypes.func.isRequired,
  setMapView: PropTypes.func.isRequired,
  selectedAreaOffice: PropTypes.object.isRequired,
  mapView: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withGoogleMap(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(AreaOfficeMap))
);
