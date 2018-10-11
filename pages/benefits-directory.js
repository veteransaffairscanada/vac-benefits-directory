import React, { Component } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BB from "../components/BB";
import { getProfileFilters } from "../selectors/benefits";

export class BenefitsDirectory extends Component {
  constructor() {
    super();
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
    this.props.setPageWidth(window.innerWidth);
  }

  setURL = () => {
    let href = "/benefits-directory";
    href += "?lng=" + this.props.t("current-language-code");
    if (Object.keys(this.props.selectedNeeds).length > 0) {
      href += "&selectedNeeds=" + Object.keys(this.props.selectedNeeds).join();
    }

    Object.entries(this.props.profileFilters).forEach(x => {
      if (x[1]) {
        href += `&${x[0]}=${x[1]}`;
      }
    });

    if (this.props.searchString !== "") {
      href += `&searchString=${encodeURIComponent(this.props.searchString)}`;
    }
    if (this.props.sortBy !== "") {
      href += `&sortBy=${encodeURIComponent(this.props.sortBy)}`;
    }
    Router.replace(href);
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
        title={t("titles.benefits_directory")}
      >
        <BB id="BB" t={t} store={this.props.store} url={this.props.url} />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageWidth: pageWidth => {
      dispatch({ type: "SET_PAGEWIDTH", data: pageWidth });
    }
  };
};

const mapStateToProps = (reduxState, props) => {
  return {
    profileFilters: getProfileFilters(reduxState, props),
    searchString: reduxState.searchString,
    selectedNeeds: reduxState.selectedNeeds,
    sortBy: reduxState.sortBy
  };
};

BenefitsDirectory.propTypes = {
  profileFilters: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  store: PropTypes.object,
  searchString: PropTypes.string.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setPageWidth: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18next()(BenefitsDirectory));
