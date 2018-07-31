import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

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

  onCentreChanged() {}

  render() {
    const { t, mapCentre } = this.props;
    return (
      <GoogleMap
        defaultZoom={5}
        center={{ lat: +mapCentre.lat, lng: +mapCentre.lng }}
        onCenterChanged={this.onCentreChanged}
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
                <InfoBox>
                  <div
                    style={{
                      fontSize: `16px`,
                      fontColor: `black`,
                      backgroundColor: "white",
                      padding: "12px"
                    }}
                  >
                    {d["name_" + t("current-language-code")]}
                  </div>
                </InfoBox>
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
    setMapCentre: mapCentre => {
      dispatch({ type: "SET_MAP_CENTRE", data: mapCentre });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    areaOffices: reduxState.areaOffices,
    selectedAreaOffice: reduxState.selectedAreaOffice,
    userLocation: reduxState.userLocation,
    mapCentre: reduxState.mapCentre
  };
};

AreaOfficeMap.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  setSelectedAreaOffice: PropTypes.func.isRequired,
  selectedAreaOffice: PropTypes.object.isRequired,
  userLocation: PropTypes.object.isRequired,
  mapCentre: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withScriptjs(
  withGoogleMap(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(AreaOfficeMap)
  )
);
