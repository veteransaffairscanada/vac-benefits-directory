import React, { Component } from "react";
import PropTypes from "prop-types";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BB from "../components/BB";
import Router from "next/router";

export class BenefitsDirectory extends Component {
  constructor() {
    super();
    this.state = {
      width: 1000
    };
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
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
    [
      "patronType",
      "serviceType",
      "statusAndVitals",
      "serviceHealthIssue"
    ].forEach(selection => {
      if (this.props[selection] !== "") {
        href += `&${selection}=${this.props[selection]}`;
      }
    });
    if (this.props.searchString !== "") {
      href += `&searchString=${encodeURIComponent(this.props.searchString)}`;
    }
    Router.push(href);
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
          store={this.props.store}
          setSection={this.setSection}
        />
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    patronType: reduxState.patronType,
    searchString: reduxState.searchString,
    serviceType: reduxState.serviceType,
    statusAndVitals: reduxState.statusAndVitals,
    serviceHealthIssue: reduxState.serviceHealthIssue,
    selectedNeeds: reduxState.selectedNeeds
  };
};

BenefitsDirectory.propTypes = {
  url: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  patronType: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  statusAndVitals: PropTypes.string.isRequired,
  selectedNeeds: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withI18next()(BenefitsDirectory));
