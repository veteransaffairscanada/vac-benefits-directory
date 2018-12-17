import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import SearchBox from "./search_box";

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
        <SearchBox
          disableButton={true}
          inputId="inputField"
          buttonId="searchButtonLink"
          ariaLabel={this.props.t("map.search-locations")}
          placeholder={this.props.t("map.search-location-prompt")}
          onKeyDown={this.onKeyPress}
          onButtonClick={() => this.setLocation()}
        />
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
