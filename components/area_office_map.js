import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { KeyboardBackspace } from "@material-ui/icons";

import {
  InfoWindow,
  withScriptjs,
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

export class AreaOfficeMap extends Component {
  static defaultProps = {
    userLocation: {
      lat: 49,
      lng: -104
    },
    zoom: 4
  };

  selectOffice(selected_office) {
    return () => {
      this.props.setSelectedAreaOffice(selected_office);
    };
  }

  render() {
    const { t, userLocation, classes } = this.props;
    return (
      <GoogleMap
        defaultZoom={5}
        center={{ lat: userLocation.lat, lng: userLocation.lng }}
        {...this.props}
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
                        fontWeight: "500"
                      }}
                    >
                      {d["name_" + t("current-language-code")]}
                    </div>
                    <br />
                    <div
                      style={{
                        fontSize: `12px`
                      }}
                    >
                      {d["address_" + t("current-language-code")]}
                    </div>
                    <br />
                    <Button
                      className={classes.button}
                      target="_blank"
                      variant="raised"
                      href={
                        "http://maps.apple.com/?daddr=" + d.lat + "," + d.lng
                      }
                    >
                      Get Directions
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

AreaOfficeMap.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  setSelectedAreaOffice: PropTypes.func.isRequired,
  selectedAreaOffice: PropTypes.object.isRequired,
  userLocation: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withScriptjs(
  withGoogleMap(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(AreaOfficeMap))
  )
);
