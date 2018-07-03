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
  state = {};
  getToggleOpen(i) {
    return _ => {
      const obj = {};
      obj[i] = !this.state[i];
      this.setState(obj);
    };
  }
  componentWillMount() {
    this.props.areaOffices.forEach((d, i) => {
      const obj = {};
      obj[i] = false;
      this.setState(obj);
    });
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={4}
        defaultCenter={{ lat: 52, lng: -90 }}
        {...this.props}
      >
        {this.props.areaOffices.map((d, i) => {
          return (
            <Marker
              key={i}
              position={{ lat: +d.lat, lng: +d.lng }}
              onClick={this.getToggleOpen(i)}
            >
              {this.state[i] ? (
                <InfoBox>
                  <div
                    style={{
                      backgroundColor: `white`,
                      opacity: 0.75,
                      padding: `12px`
                    }}
                  >
                    <div style={{ fontSize: `16px`, fontColor: `black` }}>
                      {this.props.t(d.office_name)}
                    </div>
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
