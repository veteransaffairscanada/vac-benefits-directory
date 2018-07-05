import React, { Component } from "react";
import PropTypes from "prop-types";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { redux2i18n } from "../utils/redux2i18n";
import BB from "../components/BB";
import Cookies from "universal-cookie";
import Router from "next/router";

export class BenefitsDirectory extends Component {
  constructor() {
    super();
    this.cookies = new Cookies();
    this.state = {
      favouriteBenefits: [],
      width: 1000
    };
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentWillMount() {
    redux2i18n(this.props.i18n, this.props.text);
    const newState = {
      favouriteBenefits: this.props.favouriteBenefits
    };
    this.setState(newState);
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener("resize", this.updateWindowWidth);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setURL();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  }

  updateWindowWidth() {
    this.setState({ width: window.innerWidth });
  }

  setURL = () => {
    let href = "/benefits-directory";
    href += "?lng=" + this.props.t("current-language-code");
    if (Object.keys(this.props.selectedNeeds).length > 0) {
      href += "&selectedNeeds=" + Object.keys(this.props.selectedNeeds).join();
    }
    ["patronType", "serviceType", "statusAndVitals"].forEach(selection => {
      if (this.props[selection] !== "") {
        href += `&${selection}=${this.props[selection]}`;
      }
    });
    if (this.props.searchString !== "") {
      href += `&searchString=${this.props.searchString}`;
    }
    Router.push(href);
  };

  toggleFavourite = id => {
    let favouriteBenefits = this.cookies.get("favouriteBenefits")
      ? this.cookies.get("favouriteBenefits")
      : [];
    if (favouriteBenefits.indexOf(id) > -1) {
      favouriteBenefits.splice(favouriteBenefits.indexOf(id), 1);
    } else {
      favouriteBenefits.push(id);
    }
    this.cookies.set("favouriteBenefits", favouriteBenefits, { path: "/" });
    this.setState({ favouriteBenefits: favouriteBenefits });
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
      >
        <BB
          id="BB"
          t={t}
          pageWidth={this.state.width}
          favouriteBenefits={this.state.favouriteBenefits}
          toggleFavourite={this.toggleFavourite}
          url={this.props.url}
          store={this.props.store}
          setSection={this.setSection}
        />
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    favouriteBenefits: reduxState.favouriteBenefits,
    text: reduxState.text,
    patronType: reduxState.patronType,
    searchString: reduxState.searchString,
    serviceType: reduxState.serviceType,
    statusAndVitals: reduxState.statusAndVitals,
    selectedNeeds: reduxState.selectedNeeds
  };
};

BenefitsDirectory.propTypes = {
  url: PropTypes.object.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  text: PropTypes.array.isRequired,
  patronType: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  statusAndVitals: PropTypes.string.isRequired,
  selectedNeeds: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withI18next()(BenefitsDirectory));
