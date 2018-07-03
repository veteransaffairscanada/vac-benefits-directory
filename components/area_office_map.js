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
  getToggleOpen(id) {
    return () => {
      const obj = {};
      obj[id] = !this.state[id];
      this.setState(obj);
    };
  }
  componentWillMount() {
    this.props.areaOffices.forEach(d => {
      const obj = {};
      obj[d.id] = false;
      this.setState(obj);
    });
  }

  render() {
    const { t } = this.props;
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
              onClick={this.getToggleOpen(d.id)}
            >
              {this.state[d.id] ? (
                <InfoBox>
                  <div
                    style={{
                      backgroundColor: `white`,
                      opacity: 0.75,
                      padding: `12px`
                    }}
                  >
                    <div style={{ fontSize: `16px`, fontColor: `black` }}>
                      {d["name_" + t("current-language-code")]}
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
    areaOffices: state.areaOffices
  };
};

AreaOfficeMap.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
};

export default withScriptjs(
  withGoogleMap(connect(mapStateToProps)(AreaOfficeMap))
);
