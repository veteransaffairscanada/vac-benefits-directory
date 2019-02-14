import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "./button";
import { css } from "emotion";
import Header from "./typography/header";
import Body from "./typography/body";
import { logEvent } from "../utils/analytics";

import {
  InfoWindow,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const officeInfo = css`
  background-color: white;
  margin: 2px;
`;

/**
 * Determines if the browser is an iOS device
 */
const isIOS =
  typeof navigator !== "undefined" &&
  (navigator.platform.indexOf("iPhone") !== -1 ||
    navigator.platform.indexOf("iPod") !== -1 ||
    navigator.platform.indexOf("iPad") !== -1);

/**
 * Renders a Google Map component with all the area offices marked as pins.
 * Depending on geolocation - will center the map and show the closest offices.
 */
export class AreaOfficeMap extends Component {
  /**
   * Sets the default map view and sets up the callback methods for the
   * react-google-map component
   */
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

  /**
   * Sets the selected office
   * @public
   */
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
                <InfoWindow options={{ maxWidth: 200 }}>
                  <div className={officeInfo}>
                    <Header size="sm">
                      {d["name_" + t("current-language-code")]}
                    </Header>
                    <br />
                    <Body>{d["address_" + t("current-language-code")]}</Body>
                    <Button
                      id="getDirectionsButton"
                      arrow={true}
                      size="small"
                      onClick={() => {
                        logEvent("Exit", "get directions", d["name_en"]);
                        window.location.href = isIOS
                          ? "https://maps.apple.com/?daddr=" + d["address_en"]
                          : "https://www.google.com/maps?saddr=My+Location&daddr=" +
                            d["address_en"];
                      }}
                    >
                      {t("map.get_directions")}
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
  /**
   * List of area offices
   */
  areaOffices: PropTypes.array.isRequired,
  /**
   * Sets a selected area office in redux
   */
  setSelectedAreaOffice: PropTypes.func.isRequired,
  /**
   * Sets properties of the map view (Lat, Lng, Zoom)
   */
  setMapView: PropTypes.func.isRequired,
  /**
   * The selected area office
   */
  selectedAreaOffice: PropTypes.object.isRequired,
  /**
   * Properties of the map view (Lat, Lng, Zoom)
   */
  mapView: PropTypes.object.isRequired,
  /**
   * Universal translation function
   */
  t: PropTypes.func.isRequired
};

export default withGoogleMap(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AreaOfficeMap)
);
