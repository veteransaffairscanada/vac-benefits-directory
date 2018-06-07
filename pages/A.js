import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import "babel-polyfill/dist/polyfill";
import benefitsFixture from "../__tests__/fixtures/benefits";
import { logEvent } from "../utils/analytics";

import GuidedExperienceProfile from "../components/guided_experience_profile";
import GuidedExperienceNeeds from "../components/guided_experience_needs";
import BB from "../components/BB";

export class A extends Component {
  constructor() {
    super();
    this.state = {
      section: "BB",
      selectedNeeds: {},
      selectedEligibility: {
        patronType: "",
        serviceType: "",
        statusAndVitals: ""
      }
    };
  }

  stringToMap = s => {
    // convert a comma separated list into a map
    let map = {};
    s.split(",").forEach(x => {
      map[x] = x;
    });
    return map;
  };

  getUrlParams = search => {
    let hashes = search.slice(search.indexOf("?") + 1).split("&");
    return hashes.reduce((params, hash) => {
      let [key, val] = hash.split("=");
      return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
  };

  componentWillMount() {
    Router.onRouteChangeStart = newUrl => {
      let myURL = {};
      myURL.searchParams = this.getUrlParams(newUrl);
      const section = myURL.searchParams.section;
      let filters = {};
      ["selectedNeeds"].forEach(filter => {
        filters[filter] = myURL.searchParams[filter]
          ? this.stringToMap(myURL.searchParams[filter])
          : {};
      });
      ["patronType", "serviceType", "statusAndVitals"].forEach(filter => {
        filters[filter] = myURL.searchParams[filter]
          ? myURL.searchParams[filter]
          : "";
      });
      const newState = {
        section: section || "BB",
        selectedNeeds: filters.selectedNeeds,
        selectedEligibility: {
          patronType: filters.patronType,
          serviceType: filters.serviceType,
          statusAndVitals: filters.statusAndVitals
        }
      };
      this.setState(newState);
    };

    let filters = {};
    ["selectedNeeds"].forEach(filter => {
      filters[filter] = this.props.url.query[filter]
        ? this.stringToMap(this.props.url.query[filter])
        : {};
    });

    ["patronType", "serviceType", "statusAndVitals"].forEach(filter => {
      filters[filter] = this.props.url.query[filter]
        ? this.props.url.query[filter]
        : "";
    });
    const newState = {
      section: this.props.url.query.section || "BB",
      selectedNeeds: filters.selectedNeeds,
      selectedEligibility: {
        patronType: filters.patronType,
        serviceType: filters.serviceType,
        statusAndVitals: filters.statusAndVitals
      }
    };
    this.setState(newState);
  }

  componentDidMount() {
    if (this.props.url.query.use_testdata) {
      this.props.dispatch({
        type: "LOAD_DATA",
        data: { benefits: benefitsFixture }
      });
    }
  }

  setURL = state => {
    let href = "/A?section=" + state.section;
    if (Object.keys(state.selectedNeeds).length > 0) {
      href += "&selectedNeeds=" + Object.keys(state.selectedNeeds).join();
    }
    ["patronType", "serviceType", "statusAndVitals"].forEach(selection => {
      if (state.selectedEligibility[selection] !== "") {
        href += `&${selection}=${state.selectedEligibility[selection]}`;
      }
    });
    Router.push(href);
  };

  setSection = section => {
    let newState = this.state;
    newState.section = section;
    this.setState(newState);
    this.setURL(newState);
  };

  setSelectedNeeds = ids => {
    let selectedNeeds = {};
    ids.forEach(id => {
      selectedNeeds[id] = id;
      logEvent("FilterClick", "need", id);
    });
    let newState = this.state;
    newState.selectedNeeds = selectedNeeds;
    this.setState(newState);
    this.setURL(newState);
  };

  setUserProfile = (criteria, id) => {
    logEvent("FilterClick", criteria, id);
    let newSelectedEligibility = this.state.selectedEligibility;
    newSelectedEligibility[criteria] = id;
    let newState = this.state;
    newState.selectedEligibility = newSelectedEligibility;
    this.setState(newState);
    this.setURL(newState);
  };

  toggleSelectedEligibility = (criteria, id) => () => {
    let newSelectedEligibility = this.state.selectedEligibility;
    newSelectedEligibility[criteria] = id;
    this.setState({ selectedEligibility: newSelectedEligibility });
  };

  clearFilters = () => {
    const newState = {
      section: this.state.section,
      selectedNeeds: this.state.selectedNeeds,
      selectedEligibility: {
        patronType: "",
        serviceType: "",
        statusAndVitals: ""
      }
    };
    this.setState(newState);
    this.setURL(newState);
  };

  clearNeeds = () => {
    const newState = {
      section: this.state.section,
      selectedNeeds: {},
      selectedEligibility: this.state.selectedEligibility
    };
    this.setState(newState);
    this.setURL(newState);
  };

  sectionToDisplay = section => {
    let question;
    switch (section) {
      case "A1":
        question = "patronType";
        return (
          <GuidedExperienceProfile
            title={this.props.t("A1.Find Benefits for")}
            options={Array.from(
              new Set(this.props.eligibilityPaths.map(ep => ep[question]))
            ).filter(st => st !== "na")}
            onClick={option => this.setUserProfile(question, option)}
            isDown={option =>
              this.state.selectedEligibility[question] === option
            }
            nextSection="A2"
            setSection={this.setSection}
            t={this.props.t}
          />
        );
      case "A2":
        question = "serviceType";
        return (
          <GuidedExperienceProfile
            title={this.props.t("B3.ServiceType")}
            options={Array.from(
              new Set(this.props.eligibilityPaths.map(ep => ep[question]))
            ).filter(st => st !== "na")}
            onClick={option => this.setUserProfile(question, option)}
            isDown={option =>
              this.state.selectedEligibility[question] === option
            }
            nextSection="A3"
            setSection={this.setSection}
            t={this.props.t}
          />
        );
      case "A3":
        question = "statusAndVitals";
        return (
          <GuidedExperienceProfile
            title={this.props.t("B3.serviceStatus")}
            options={Array.from(
              new Set(this.props.eligibilityPaths.map(ep => ep[question]))
            ).filter(st => st !== "na")}
            onClick={option => this.setUserProfile(question, option)}
            isDown={option =>
              this.state.selectedEligibility[question] === option
            }
            nextSection="A4"
            setSection={this.setSection}
            t={this.props.t}
          />
        );
      case "A4":
        return (
          <GuidedExperienceNeeds
            t={this.props.t}
            needs={this.props.needs}
            selectedNeeds={this.state.selectedNeeds}
            setSelectedNeeds={this.setSelectedNeeds}
            setSection={this.setSection}
          />
        );
      case "BB":
        return (
          <BB
            t={this.props.t}
            benefits={this.props.benefits}
            eligibilityPaths={this.props.eligibilityPaths}
            needs={this.props.needs}
            examples={this.props.examples}
            selectedEligibility={this.state.selectedEligibility}
            selectedNeeds={this.state.selectedNeeds}
            toggleSelectedEligibility={this.toggleSelectedEligibility}
            setSelectedNeeds={this.setSelectedNeeds}
            setUserProfile={this.setUserProfile}
            setSection={this.setSection}
            clearFilters={this.clearFilters}
            clearNeeds={this.clearNeed}
          />
        );
    }
  };

  render() {
    return (
      <Layout i18n={this.props.i18n} t={this.props.t}>
        {this.sectionToDisplay(this.state.section)}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    benefits: state.benefits,
    eligibilityPaths: state.eligibilityPaths,
    needs: state.needs,
    examples: state.examples
  };
};

A.propTypes = {
  benefits: PropTypes.array,
  dispatch: PropTypes.func,
  eligibilityPaths: PropTypes.array,
  examples: PropTypes.array,
  i18n: PropTypes.object,
  needs: PropTypes.array,
  t: PropTypes.func,
  url: PropTypes.object
};

export default connect(mapStateToProps)(withI18next()(A));
