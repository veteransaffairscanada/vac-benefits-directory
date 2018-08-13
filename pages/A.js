import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";

import Cookies from "universal-cookie";

import GuidedExperience from "../components/guided_experience";
import GuidedExperienceProfile from "../components/guided_experience_profile";
import GuidedExperienceNeeds from "../components/guided_experience_needs";
import "../utils/polyfills";

export class A extends Component {
  constructor() {
    super();
    this.cookies = new Cookies();
    this.state = {
      favouriteBenefits: [],
      section: "A1"
    };
  }

  componentDidMount() {
    Router.onRouteChangeStart = newUrl => {
      let matches = newUrl.match(/section=([^&]*)/);
      const newState = {
        section: matches[1] || "A1"
      };
      this.setState(newState);
    };

    const newState = {
      favouriteBenefits: this.props.favouriteBenefits,
      section: this.props.url.query.section || "A1"
    };

    this.setState(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps || this.state.section !== prevState.section) {
      this.setURL();
    }
  }

  setURL = (state = this.state) => {
    let href = "/A?section=" + state.section;
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
    href += "&lng=" + this.props.t("current-language-code");
    Router.replace(href);
  };

  setSection = section => {
    this.setState({ section: section });
    const {
      setPatronType,
      setServiceType,
      setStatusAndVitals,
      setServiceHealthIssue,
      setSelectedNeeds
    } = this.props;
    const setters = [
      () => setPatronType(""),
      () => setServiceType(""),
      () => setStatusAndVitals(""),
      () => setServiceHealthIssue(""),
      () => setSelectedNeeds({})
    ];
    const current_section_index = section[1];
    setters.forEach((setter, i) => {
      if (i >= current_section_index) {
        setter();
      }
    });
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

  sectionToDisplay = section => {
    let question, options;
    const {
      t,
      patronType,
      serviceType,
      statusAndVitals,
      selectedNeeds
    } = this.props;

    let previousSectionA5 = "A4";
    if (patronType === "") {
      previousSectionA5 = "A1";
    } else if (serviceType === "") {
      previousSectionA5 = "A2";
    } else if (statusAndVitals === "" && serviceType != "WSV (WWII or Korea)") {
      previousSectionA5 = "A3";
    }

    let indexURL = "/index?lng=" + t("current-language-code");

    let benefitsDirectoryUrl =
      "/benefits-directory?lng=" + t("current-language-code");
    if (Object.keys(selectedNeeds).length > 0) {
      benefitsDirectoryUrl +=
        "&selectedNeeds=" + Object.keys(selectedNeeds).join();
    }
    [
      "patronType",
      "serviceType",
      "statusAndVitals",
      "serviceHealthIssue"
    ].forEach(selection => {
      if (this.props[selection] !== "") {
        benefitsDirectoryUrl += `&${selection}=${this.props[selection]}`;
      }
    });

    switch (true) {
      case section === "A1":
        return (
          <GuidedExperience
            id="A1"
            stepNumber={0}
            nextSection={
              patronType === "organization"
                ? "benefits-directory"
                : patronType === ""
                  ? "A5"
                  : "A2"
            }
            prevSection="index"
            benefitsDirectoryUrl={benefitsDirectoryUrl}
            indexURL={indexURL}
            setSection={this.setSection}
            subtitle={t("GE.patronType")}
            t={t}
            store={this.props.store}
          >
            <GuidedExperienceProfile
              t={t}
              selectorType={"patronType"}
              store={this.props.store}
            />
          </GuidedExperience>
        );
      case section === "A2":
        return (
          <GuidedExperience
            id="A2"
            stepNumber={1}
            nextSection={
              serviceType === "WSV (WWII or Korea)" &&
              patronType === "service-person"
                ? "A4"
                : serviceType === ""
                  ? "A5"
                  : "A3"
            }
            prevSection="A1"
            setSection={this.setSection}
            subtitle={t("GE.serviceType")}
            t={t}
            store={this.props.store}
          >
            <GuidedExperienceProfile
              t={t}
              selectorType={"serviceType"}
              store={this.props.store}
            />
          </GuidedExperience>
        );
      case section === "A3":
        question = "statusAndVitals";
        options = Array.from(
          new Set(this.props.eligibilityPaths.map(ep => ep[question]))
        ).filter(st => st !== "na");
        if (patronType === "service-person") {
          options.splice(options.indexOf("deceased"), 1);
        }
        if (serviceType === "WSV (WWII or Korea)") {
          options.splice(options.indexOf("stillServing"), 1);
        }
        return (
          <GuidedExperience
            id="A3"
            stepNumber={2}
            nextSection={statusAndVitals === "" ? "A5" : "A4"}
            prevSection="A2"
            setSection={this.setSection}
            subtitle={t("GE." + question)}
            t={t}
            store={this.props.store}
          >
            <GuidedExperienceProfile
              t={t}
              selectorType={"statusAndVitals"}
              store={this.props.store}
              options={options}
            />
          </GuidedExperience>
        );
      case section === "A4":
        return (
          <GuidedExperience
            id="A4"
            stepNumber={3}
            nextSection="A5"
            prevSection={serviceType === "WSV (WWII or Korea)" ? "A2" : "A3"}
            setSection={this.setSection}
            subtitle={t(
              this.props.statusAndVitals === "deceased"
                ? "health issue question deceased"
                : "health issue question"
            )}
            t={t}
            store={this.props.store}
          >
            <GuidedExperienceProfile
              t={t}
              selectorType={"serviceHealthIssue"}
              store={this.props.store}
              options={["true", "false"]}
            />
          </GuidedExperience>
        );
      case section === "A5":
        return (
          <GuidedExperience
            id="A5"
            stepNumber={4}
            t={t}
            nextSection="benefits-directory"
            benefitsDirectoryUrl={benefitsDirectoryUrl}
            prevSection={previousSectionA5}
            subtitle={t("B3.What do you need help with?")}
            setSection={this.setSection}
            store={this.props.store}
          >
            <GuidedExperienceNeeds t={t} store={this.props.store} />
          </GuidedExperience>
        );
    }
  };

  render() {
    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
      >
        {this.sectionToDisplay(this.state.section)}
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPatronType: patronType => {
      dispatch({ type: "SET_PATRON_TYPE", data: patronType });
    },
    setServiceType: serviceType => {
      dispatch({ type: "SET_SERVICE_TYPE", data: serviceType });
    },
    setStatusAndVitals: statusType => {
      dispatch({ type: "SET_STATUS_TYPE", data: statusType });
    },
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    },
    setServiceHealthIssue: serviceHealthIssue => {
      dispatch({ type: "SET_HEALTH_ISSUE", data: serviceHealthIssue });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    examples: reduxState.examples,
    favouriteBenefits: reduxState.favouriteBenefits,
    needs: reduxState.needs,
    patronType: reduxState.patronType,
    serviceType: reduxState.serviceType,
    statusAndVitals: reduxState.statusAndVitals,
    serviceHealthIssue: reduxState.serviceHealthIssue,
    selectedNeeds: reduxState.selectedNeeds
  };
};

A.propTypes = {
  benefits: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
  eligibilityPaths: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  patronType: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  statusAndVitals: PropTypes.string.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setPatronType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setStatusAndVitals: PropTypes.func.isRequired,
  setServiceHealthIssue: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18next()(A));
