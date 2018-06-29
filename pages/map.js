import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { redux2i18n } from "../utils/redux2i18n";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
    const { classes, i18n, t } = this.props;
    return (
      <Layout
        title={"Map"}
        i18n={i18n}
        t={t}
        hideNoscript={true}
        showRefreshCache={false}
      >
        <div style={{ height: "400px", width: "50%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCU5iYqJ_8g4bvR4AI3-LEzwlzr1DJ1dmE"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {this.props.areaOffices.map(d => {
              return (
                <AnyReactComponent
                  lat={+d.lat}
                  lng={+d.lng}
                  text={d.office_name}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    areaOffices: state.areaOffices,
    text: state.text
  };
};

Map.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  text: PropTypes.array.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(withI18next()(Map)));
