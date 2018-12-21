import React, { Component } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BB from "../components/BB";
import { getProfileFilters, getFilteredBenefits } from "../selectors/benefits";
import { globalTheme } from "../theme";
import { getBenefitCountString } from "../utils/common";

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
    if (
      JSON.stringify(this.props.profileFilters) !==
        JSON.stringify(prevProps.profileFilters) ||
      JSON.stringify(this.props.selectedNeeds) !==
        JSON.stringify(prevProps.selectedNeeds)
    ) {
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
    Router.replace(href);
  };

  render() {
    const { i18n, t, filteredBenefits, benefits } = this.props; // eslint-disable-line no-unused-vars
    const title =
      filteredBenefits.length === benefits.length
        ? t("B3.All benefits to consider")
        : getBenefitCountString(filteredBenefits, t);
    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
        title={title + " | " + t("titles.benefits_directory")}
        backgroundColor={globalTheme.colour.white}
        skipLink="#mainContent"
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
    filteredBenefits: getFilteredBenefits(reduxState, props),
    searchString: reduxState.searchString,
    selectedNeeds: reduxState.selectedNeeds,
    benefits: reduxState.benefits
  };
};

BenefitsDirectory.propTypes = {
  profileFilters: PropTypes.object.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  url: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  searchString: PropTypes.string.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setPageWidth: PropTypes.func.isRequired,
  benefits: PropTypes.array.isRequired
};

export default withI18N(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BenefitsDirectory)
);
