import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

export class AreaOfficeMap extends Component {
  render() {
    return (
      <GoogleMap defaultZoom={4} defaultCenter={{ lat: 49, lng: -104 }}>
        {this.props.areaOffices.map((d, i) => {
          return (
            <Marker
              key={i}
              position={{ lat: +d.lat, lng: +d.lng }}
              // onClick={props.onMarkerClick}
              // text={d.office_name}
            />
          );
        })}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => {
  return {
    areaOffices: state.areaOffices,
    text: state.text
  };
};

AreaOfficeMap.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  text: PropTypes.array.isRequired
};

export default withScriptjs(
  withGoogleMap(connect(mapStateToProps)(AreaOfficeMap))
);
