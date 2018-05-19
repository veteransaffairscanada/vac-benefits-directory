// @flow

import React, { Component } from "react";
import Router from "next/router";

import withRedux from "next-redux-wrapper";
import { initStore, loadDataStore } from "../store";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { bindActionCreators } from "redux";
import { hydrateFromFixtures } from "../utils/hydrate_from_fixtures";

import BB from "../components/BB";

type Props = {
  url: mixed,
  i18n: mixed,
  t: mixed,
  benefits: mixed,
  eligibilityPaths: mixed,
  data: mixed,
  loadDataStore: mixed
};

export class A extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      section: "BB",
      selectedNeeds: [],
      selectedEligibility: {
        serviceType: { CAF: 1 },
        serviceStatus: { released: 1 },
        patronType: { ["service-person"]: 1 },
        servicePersonVitalStatus: { alive: 1 }
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
        eligibilityPaths: this.props.data.eligibilityPaths
      });
    }
  }

  static getInitialProps(ctx) {
    if (typeof ctx.req !== "undefined") {
      return { data: ctx.req.data };
    }
  }

  switchSection = (newSection, data) => {
    const newState = {
      section: newSection,
      selectedNeeds: data.selectedNeeds || this.state.selectedNeeds,
      selectedEligibility:
        data.selectedEligibility || this.state.selectedEligibility
    };
    this.setState(newState);

    const href =
      "/A?section=" +
      newState.section +
      "&selectedNeeds=" +
      newState.selectedNeeds.join() +
      "&selectedEligibility=" +
      newState.selectedEligibility.join();
    Router.push(href);
  };

  // toggleSelectedNeeds = (_, id) => () => {
  //   let selected = this.state.selectedNeeds;
  //   if (selected.hasOwnProperty(id)) {
  //     delete selected[id];
  //   } else {
  //     selected[id] = id;
  //   }
  //   this.setState({ selectedNeeds: selected });
  // };

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
    switch (section) {
      case "BB":
        return (
          <BB
            id="BB"
            t={this.props.t}
            benefits={this.props.benefits}
            eligibilityPaths={this.props.eligibilityPaths}
            selectedEligibility={this.state.selectedEligibility}
            toggleSelectedEligibility={this.toggleSelectedEligibility}
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
    eligibilityPaths: state.eligibilityPaths
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withI18next()(A)
);
