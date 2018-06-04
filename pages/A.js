import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import "babel-polyfill/dist/polyfill";
import benefitsFixture from "../__tests__/fixtures/benefits";

import BB from "../components/BB";

export class A extends Component {
  constructor() {
    super();
    this.state = {
      section: "BB",
      selectedNeeds: {},
      selectedEligibility: {
        patronType: {},
        serviceType: {},
        serviceStatus: {},
        servicePersonVitalStatus: {}
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
      [
        "selectedNeeds",
        "patronType",
        "serviceType",
        "serviceStatus",
        "servicePersonVitalStatus"
      ].forEach(filter => {
        filters[filter] = myURL.searchParams[filter]
          ? this.stringToMap(myURL.searchParams[filter])
          : {};
      });
      const newState = {
        section: section || "BB",
        selectedNeeds: filters.selectedNeeds,
        selectedEligibility: {
          patronType: filters.patronType,
          serviceType: filters.serviceType,
          serviceStatus: filters.serviceStatus,
          servicePersonVitalStatus: filters.servicePersonVitalStatus
        }
      };
      this.setState(newState);
    };

    let filters = {};
    [
      "selectedNeeds",
      "patronType",
      "serviceType",
      "serviceStatus",
      "servicePersonVitalStatus"
    ].forEach(filter => {
      filters[filter] = this.props.url.query[filter]
        ? this.stringToMap(this.props.url.query[filter])
        : {};
    });
    const newState = {
      section: this.props.url.query.section || "BB",
      selectedNeeds: filters.selectedNeeds,
      selectedEligibility: {
        patronType: filters.patronType,
        serviceType: filters.serviceType,
        serviceStatus: filters.serviceStatus,
        servicePersonVitalStatus: filters.servicePersonVitalStatus
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
    [
      "patronType",
      "serviceType",
      "serviceStatus",
      "servicePersonVitalStatus"
    ].forEach(criteria => {
      if (Object.keys(state.selectedEligibility[criteria]).length > 0) {
        href += `&${criteria}=${Object.keys(
          state.selectedEligibility[criteria]
        ).join()}`;
      }
    });
    Router.push(href);
  };

  setSelectedNeeds = ids => {
    console.log("A setSelectedNeeds", ids);
    let selectedNeeds = {};
    ids.forEach(id => {
      selectedNeeds[id] = id;
    });
    let newState = this.state;
    newState.selectedNeeds = selectedNeeds;
    this.setState(newState);
    this.setURL(newState);
  };

  setUserProfile = (criteria, id) => {
    let selected = {};
    if (id !== "") {
      selected[id] = id;
    }
    let newSelectedEligibility = this.state.selectedEligibility;
    newSelectedEligibility[criteria] = selected;
    let newState = this.state;
    newState.selectedEligibility = newSelectedEligibility;
    this.setState(newState);
    this.setURL(newState);
  };

  toggleSelectedEligibility = (criteria, id) => () => {
    let selected = this.state.selectedEligibility[criteria];
    if (selected.hasOwnProperty(id)) {
      delete selected[id];
    } else {
      selected[id] = id;
    }
    let newSelectedEligibility = this.state.selectedEligibility;
    newSelectedEligibility[criteria] = selected;
    this.setState({ selectedEligibility: newSelectedEligibility });
  };

  clearFilters = () => {
    const newState = {
      section: this.state.section,
      selectedNeeds: {},
      selectedEligibility: {
        patronType: {},
        serviceType: {},
        serviceStatus: {},
        servicePersonVitalStatus: {}
      }
    };
    this.setState(newState);
    this.setURL(newState);
  };

  sectionToDisplay = section => {
    // const needs = [
    //   { id: "43534534", name_en: "Health", name_fr: "FF Health" },
    //   {
    //     id: "43534ewr534",
    //     name_en: "Assistance around the home",
    //     name_fr: "FF Assistance around the home"
    //   },
    //   { id: "dsfasdfa", name_en: "Finding a Job", name_fr: "FF Finding a Job" }
    // ];

    switch (section) {
      case "BB":
        return (
          <BB
            id="BB"
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
            clearFilters={this.clearFilters}
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
