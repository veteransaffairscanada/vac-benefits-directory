import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { redux2i18n } from "../utils/redux2i18n";
import AreaOfficeMap from "../components/area_office_map";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    width: 500
  }
});

export class Map extends Component {
  static defaultProps = {
    center: {
      lat: 49,
      lng: -104
    },
    zoom: 2
  };
  componentWillMount() {
    redux2i18n(this.props.i18n, this.props.text);
  }

  render() {
    const { i18n, t } = this.props;
    return (
      <Layout
        title={"Map"}
        i18n={i18n}
        t={t}
        hideNoscript={true}
        showRefreshCache={false}
      >
        <AreaOfficeMap
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyCU5iYqJ_8g4bvR4AI3-LEzwlzr1DJ1dmE&language=" +
            t("current-language-code") +
            "&v=3.exp&libraries=geometry,drawing,places"
          }
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          t={t}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    text: state.text
  };
};

Map.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  text: PropTypes.array.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(withI18next()(Map)));
