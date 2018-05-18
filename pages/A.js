// @flow

import React, { Component } from "react";
import Router from "next/router";

import withRedux from "next-redux-wrapper";
import { initStore, loadDataStore } from "../store";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { bindActionCreators } from "redux";
import { hydrateFromFixtures } from "../utils/hydrate_from_fixtures";

import A1 from "../components/A1";
import A2 from "../components/A2";
import A3 from "../components/A3";
import B3 from "../components/B3";
import BB from "../components/BB";

type Props = {
  url: mixed,
  i18n: mixed,
  t: mixed,
  benefits: mixed,
  eligibilityPaths: mixed,
  data: mixed
};

export class A extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      section: "A1",
      selectedNeeds: [],
      selectedEligibility: {
        serviceType: {},
        serviceStatus: {},
        patronType: {},
        servicePersonVitalStatus: {}
      }
    };
  }

  componentWillMount() {
    Router.onRouteChangeStart = newUrl => {
      const myURL = new URL(newUrl, "http://hostname");
      const section = myURL.searchParams.get("section");
      const selectedNeeds = myURL.searchParams.get("selectedNeeds");
      const selectedEligibility = myURL.searchParams.get("selectedEligibility");
      const newState = {
        section: section || "A1",
        selectedNeeds: selectedNeeds ? selectedNeeds.split(",") : [],
        selectedEligibility: selectedEligibility
          ? selectedEligibility.split(",")
          : []
      };
      this.setState(newState);
    };

    const newState = {
      section: this.props.url.query.section || "A1",
      selectedNeeds: this.props.url.query.selectedNeeds
        ? this.props.url.query.selectedNeeds.split(",")
        : [],
      selectedEligibility: this.props.url.query.selectedEligibility
        ? this.props.url.query.selectedEligibility.split(",")
        : []
    };
    this.setState(newState);
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.data);

    if (this.props.url.query.use_testdata) {
      hydrateFromFixtures(this.props.loadDataStore);
    } else if (typeof this.props.data !== "undefined") {
      console.log("componentDidMount", this.props.data);

      this.props.loadDataStore({
        benefits: this.props.data.benefits,
        eligibilityPaths: this.props.data.eligibilityPaths
      });
    }
  }

  static getInitialProps(ctx) {
    if (typeof ctx.req !== "undefined") {
      console.log("getInitialProps", ctx.req.data);
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

  toggleSelectedNeeds = (_, id) => () => {
    let selected = this.state.selectedNeeds;
    if (selected.hasOwnProperty(id)) {
      delete selected[id];
    } else {
      selected[id] = id;
    }
    this.setState({ selectedNeeds: selected });
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
    const eligibilityOptions = {
      patronType: [
        { id: 0, name_en: "Service Person", name_fr: "FF Service Person" },
        { id: 1, name_en: "Family", name_fr: "FF Family" }
      ],
      servicePersonVitalStatus: [
        { id: 0, name_en: "Alive", name_fr: "FF Alive" },
        { id: 1, name_en: "Deceased", name_fr: "FF Deceased" }
      ],
      serviceType: [
        { id: 0, name_en: "CAF", name_fr: "FF CAF" },
        { id: 1, name_en: "RCMP", name_fr: "FF RCMP" },
        { id: 2, name_en: "WSV", name_fr: "FF RCMP" }
      ],
      serviceStatus: [
        { id: 0, name_en: "Released", name_fr: "FF Released" },
        { id: 1, name_en: "Still Serving", name_fr: "FF Still Serving" }
      ]
    };
    switch (section) {
      case "A1":
        return (
          <A1
            id="A1"
            t={this.props.t}
            benefitTypes={this.props.benefitTypes}
            selectedBenefitTypes={this.state.selectedBenefitTypes}
            switchSection={this.switchSection}
          />
        );
      case "A2":
        return (
          <A2
            id="A2"
            t={this.props.t}
            patronTypes={this.props.patronTypes}
            switchSection={this.switchSection}
            selectedPatronTypes={this.state.selectedPatronTypes}
          />
        );
      case "A3":
        return (
          <A3
            id="A3"
            t={this.props.t}
            benefitTypes={this.props.benefitTypes}
            patronTypes={this.props.patronTypes}
            benefits={this.props.benefits}
            corporaEn={this.props.corporaEn}
            corporaFr={this.props.corporaFr}
            switchSection={this.switchSection}
            selectedPatronTypes={this.state.selectedPatronTypes}
            selectedBenefitTypes={this.state.selectedBenefitTypes}
          />
        );
      case "B3":
        return (
          <B3
            id="B3"
            t={this.props.t}
            benefits={this.props.benefits}
            eligibility_paths={this.props.eligibility_paths}
            eligibilityOptions={eligibilityOptions}
            switchSection={this.switchSection}
            selectedEligibility={this.state.selectedPatronTypes}
            selectedNeeds={this.state.selectedBenefitTypes}
            toggleSelectedEligibility={this.toggleSelectedEligibility}
            toggleSelectedNeeds={this.toggleSelectedNeeds}
          />
        );
      case "BB":
        return (
          <BB
            id="BB"
            t={this.props.t}
            benefits={this.props.benefits}
            eligibilityPaths={this.props.eligibilityPaths}
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
