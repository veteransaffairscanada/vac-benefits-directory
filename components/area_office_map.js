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
    };
  }

  render() {
    const { t, mapView } = this.props;
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
    setMapView: mapView => {
      dispatch({ type: "SET_MAP_VIEW", data: mapView });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    areaOffices: reduxState.areaOffices,
    selectedAreaOffice: reduxState.selectedAreaOffice,
    userLocation: reduxState.userLocation,
    mapView: reduxState.mapView
  };
};

AreaOfficeMap.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  setSelectedAreaOffice: PropTypes.func.isRequired,
  setMapView: PropTypes.func.isRequired,
  // onCenterChanged: PropTypes.func.isRequired,
  selectedAreaOffice: PropTypes.object.isRequired,
  userLocation: PropTypes.object.isRequired,
  mapView: PropTypes.object.isRequired,
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
