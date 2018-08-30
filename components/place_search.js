import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { css } from "react-emotion";

const inputIcon = css`
  padding-top: 3px;
  padding-right: 5px;
  padding-left: 5px;
`;
const searchWrap = css`
  display: inline-flex;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 0px;
  background-color: white;
`;
const searchBox = css`
  display: inline-flex;
  padding: 10px;
  font-size: 15px;
  flex: 1;
  margin-right: 10px;
  border-width: 0px;
  width: 100%;
  font-family: Merriweather;
`;
const searchButton = css`
  @media only screen and (max-width: 750px) {
    display: none !important;
  }
  padding: 15px !important;
  padding-left: 50px !important;
  padding-right: 50px !important;
  text-transform: none !important;
  border-radius: 0px !important;
`;
const searchInputField = css`
  display: inline-flex;
  font-size: 15px;
  flex: 1;
  border-width: 0px;
  width: 100%;
  font-family: Merriweather;
`;

export class PlaceSearch extends Component {
  constructor() {
    super();
    const refs = {};

    this.state = {
      bounds: { east: -55, north: 73, south: 43, west: -143 },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        if (places.length > 0) {
          this.setState({ selected: places[0].geometry.location });
          this.setLocation();
        }
      },
      places: [],
      refs: refs,
      selected: null
    };
  }

  onKeyPress = e => {
    if (e.key === "Enter") {
      this.setLocation();
    }
  };

  setLocation = () => {
    let location = this.state.selected;
    if (location != null) {
      this.props.setUserLocation({ lat: location.lat(), lng: location.lng() });
      this.props.setMapView({
        lat: location.lat(),
        lng: location.lng(),
        zoom: 10
      });
    }
  };

  render() {
    return (
      <StandaloneSearchBox
        ref={this.state.onSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.state.onPlacesChanged}
      >
        <div className={searchWrap}>
          <div className={searchBox}>
            <SearchIcon className={inputIcon} />
            <input
              id="inputField"
              aria-label={this.props.t("map.search-locations")}
              type="text"
              placeholder={this.props.t("map.search-location-prompt")}
              className={searchInputField}
              onKeyDown={() => this.onKeyPress()}
            />
          </div>
          <div>
            <Button
              id="searchButtonLink"
              className={searchButton}
              variant="raised"
              color="primary"
              onClick={() => this.setLocation()}
            >
              {this.props.t("map.search-locations")}
            </Button>
          </div>
        </div>
      </StandaloneSearchBox>
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

const mapStateToProps = () => {
  return {};
};

PlaceSearch.propTypes = {
  setUserLocation: PropTypes.func.isRequired,
  setMapView: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceSearch);
