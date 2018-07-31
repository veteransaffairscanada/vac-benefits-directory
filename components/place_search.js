import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const styles = () => ({
  input: {},
  inputWrapper: {}
});

export class PlaceSearch extends Component {
  constructor() {
    super();
    const refs = {};

    this.state = {
      places: [],
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        console.log(places);
      }
    };
  }

  render() {
    return (
      <StandaloneSearchBox
        ref={this.state.onSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.state.onPlacesChanged}
        className={this.props.classes.inputWrapper}
      >
        <TextField className={this.props.classes.input} fullWidth />
      </StandaloneSearchBox>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserLocation: userLocation => {
      dispatch({ type: "SET_USER_LOCATION", data: userLocation });
    }
  };
};

PlaceSearch.propTypes = {
  setUserLocation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapDispatchToProps)(withStyles(styles)(PlaceSearch));
