import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import styled from "react-emotion";

const Hero = styled("div")`
  background-color: #eee;
  border-top: 10px solid #303f9f;
  color: #000;
  min-height: 350px;
  padding: 75px 16% 20px 16%;
  text-align: center;
`;

const HeroButton = styled("div")`
  padding-top: 50px;
`;

const Title = styled("div")`
  font-size: 38px;
  line-height: 56px;
`;

export class App extends Component {
  constructor() {
    super();
    this.state = {
      myLatLng: {
        lat: "Unknown",
        lng: "Unknown"
      }
    };
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          myLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    } else {
      //browser doesn't support geolocation
      this.setState({
        myLatLng: {
          lat: "Unknown",
          lng: "Unknown"
        }
      });
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Layout i18n={i18n} t={t} hideNoscript={false} showRefreshCache={false}>
        <Hero>
          <Title id="heroTitle">{"Geolocation"}</Title>
          <HeroButton>
            <Button
              style={{ padding: "20px" }}
              variant="raised"
              color="primary"
              href={
                "https://www.google.com/maps/?q=" +
                this.state.myLatLng.lat +
                "," +
                this.state.myLatLng.lng
              }
            >
              {"Lat: " +
                this.state.myLatLng.lat +
                "  Long: " +
                this.state.myLatLng.lng}
            </Button>
          </HeroButton>
        </Hero>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    text: state.text
  };
};

App.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  text: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(withI18next()(App));
