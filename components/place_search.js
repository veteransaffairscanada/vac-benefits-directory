import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: "relative"
  },
  input: {
    // paddingTop: "6px"
  },
  inputIcon: {},
  searchWrap: {
    display: "inline-flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "0px",
    paddingLeft: "5px",
    backgroundColor: "#fff"
  },
  searchBox: {
    flex: 1,
    marginRight: "10px"
  },
  searchButton: {
    [theme.breakpoints.down("750")]: {
      display: "none"
    },
    padding: "15px",
    paddingLeft: "50px",
    paddingRight: "50px",
    textTransform: "none",
    borderRadius: "0px"
  }
});

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
    }
  };

  render() {
    return (
      <StandaloneSearchBox
        ref={this.state.onSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.state.onPlacesChanged}
        className={this.props.classes.inputWrapper}
      >
        <div className={this.props.classes.searchWrap}>
          <div className={this.props.classes.searchBox}>
            <TextField
              id={this.props.classes.input}
              className={this.props.classes.input}
              placeholder={this.props.t("map.search-location-prompt")}
              fullWidth
              label={this.props.t("map.search-locations")}
              onKeyPress={this.onKeyPress}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: this.props.classes.input
                }
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <Button
              id="searchButtonLink"
              className={this.props.classes.searchButton}
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
    }
  };
};

const mapStateToProps = () => {
  return {};
};

PlaceSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  setUserLocation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PlaceSearch));
