// @flow

import React, { Component } from "react";
// import Router from "next/router";

import withRedux from "next-redux-wrapper";
import { initStore, loadDataStore } from "../store";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import "babel-polyfill/dist/polyfill";
import { bindActionCreators } from "redux";
import { hydrateFromFixtures } from "../utils/hydrate_from_fixtures";

import BB from "../components/BB";

type Props = {
  url: mixed,
  i18n: mixed,
  t: mixed,
  benefits: mixed,
  eligibilityPaths: mixed,
  needs: mixed,
  data: mixed,
  loadDataStore: mixed
};

export class A extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      section: "BB",
      selectedNeeds: {},
      selectedEligibility: {
        serviceType: {},
        serviceStatus: {},
        patronType: {},
        servicePersonVitalStatus: {}
      }
    };
  }

  componentWillMount() {
    // TODO get state from URL working?
    // Router.onRouteChangeStart = newUrl => {
    //   const myURL = new URL(newUrl, "http://hostname");
    //   const section = myURL.searchParams.get("section");
    //   const selectedNeeds = myURL.searchParams.get("selectedNeeds");
    //   const selectedEligibility = myURL.searchParams.get("selectedEligibility");
    //   const newState = {
    //     section: section || "A1",
    //     selectedNeeds: selectedNeeds ? selectedNeeds.split(",") : [],
    //     selectedEligibility: selectedEligibility
    //       ? selectedEligibility.split(",")
    //       : []
    //   };
    //   this.setState(newState);
    // };
    //
    // const newState = {
    //   section: this.props.url.query.section || "A1",
    //   selectedNeeds: this.props.url.query.selectedNeeds
    //     ? this.props.url.query.selectedNeeds.split(",")
    //     : [],
    //   selectedEligibility: this.props.url.query.selectedEligibility
    //     ? this.props.url.query.selectedEligibility.split(",")
    //     : []
    // };
    // this.setState(newState);
  }

  componentDidMount() {
    if (this.props.url.query.use_testdata) {
      hydrateFromFixtures(this.props.loadDataStore);
    } else if (typeof this.props.data !== "undefined") {
      this.props.loadDataStore({
        benefits: this.props.data.benefits,
        eligibilityPaths: this.props.data.eligibilityPaths,
        needs: this.props.data.needs
      });
    }
  }

  static getInitialProps(ctx) {
    if (typeof ctx.req !== "undefined") {
      return { data: ctx.req.data };
    }
  }

  setSelectedNeeds = ids => {
    let selectedNeeds = {};
    ids.forEach(id => {
      selectedNeeds[id] = id;
    });
    this.setState({ selectedNeeds: selectedNeeds });
  };

  setUserProfile = (criteria, id) => {
    let selected = {};
    if (id !== "") {
      selected[id] = id;
    }
    let newSelectedEligibility = this.state.selectedEligibility;
    newSelectedEligibility[criteria] = selected;
    this.setState({ selectedEligibility: newSelectedEligibility });
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
            selectedEligibility={this.state.selectedEligibility}
            selectedNeeds={this.state.selectedNeeds}
            toggleSelectedEligibility={this.toggleSelectedEligibility}
            setSelectedNeeds={this.setSelectedNeeds}
            setUserProfile={this.setUserProfile}
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

const mapDispatchToProps = dispatch => {
  return {
    loadDataStore: bindActionCreators(loadDataStore, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    benefits: state.benefits,
    eligibilityPaths: state.eligibilityPaths,
    needs: state.needs
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withI18next()(A)
);
