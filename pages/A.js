// @flow

import React, { Component } from "react";
import Router from "next/router";

import withRedux from "next-redux-wrapper";
import { initStore, loadDataStore } from "../store";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { bindActionCreators } from "redux";
import { hydrateFromAirtable } from "../utils/airtable";
import { hydrateFromFixtures } from "../utils/hydrate_from_fixtures";

import A1 from "../components/A1";
import A2 from "../components/A2";
import A3 from "../components/A3";
import B3 from "../components/B3";

type Props = {
  url: mixed,
  i18n: mixed,
  t: mixed,
  storeHydrated: boolean,
  loadDataStore: mixed,
  benefitTypes: mixed,
  patronTypes: mixed,
  benefits: mixed,
  corporaEn: mixed,
  corporaFr: mixed
};

export class A extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      section: "A1",
      selectedBenefitTypes: [],
      selectedPatronTypes: []
    };
  }

  componentWillMount() {
    if (this.props.url.query.use_testdata) {
      hydrateFromFixtures(this.props.loadDataStore);
    } else if (!this.props.storeHydrated) {
      hydrateFromAirtable(this.props.loadDataStore);
    }
    const newState = {
      section: this.props.url.query.section || "A1",
      selectedBenefitTypes: this.props.url.query.selectedBenefitTypes
        ? this.props.url.query.selectedBenefitTypes.split(",")
        : [],
      selectedPatronTypes: this.props.url.query.selectedPatronTypes
        ? this.props.url.query.selectedPatronTypes.split(",")
        : []
    };
    this.setState(newState);
  }

  switchSection = (newSection, data) => {
    const newState = {
      section: newSection,
      selectedBenefitTypes:
        data.selectedBenefitTypes || this.state.selectedBenefitTypes,
      selectedPatronTypes:
        data.selectedPatronTypes || this.state.selectedPatronTypes
    };
    this.setState(newState);

    const href =
      "/A?section=" +
      newState.section +
      "&selectedBenefitTypes=" +
      newState.selectedBenefitTypes.join() +
      "&selectedPatronTypes=" +
      newState.selectedPatronTypes.join();
    Router.replace(href, href, { shallow: true });
  };

  toggleSelectedPatronType = id => () => {
    let selected = this.state.selectedPatronTypes;
    if (selected.indexOf(id) > -1) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected = selected.concat([id]);
    }
    this.setState({ selectedPatronTypes: selected });
  };

  toggleSelectedBenefitType = id => () => {
    let selected = this.state.selectedBenefitTypes;
    if (selected.indexOf(id) > -1) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected = selected.concat([id]);
    }
    this.setState({ selectedBenefitTypes: selected });
  };

  sectionToDisplay = section => {
    switch (section) {
      case "A1":
        return (
          <A1
            id="A1"
            t={this.props.t}
            storeHydrated={this.props.storeHydrated}
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
            storeHydrated={this.props.storeHydrated}
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
            storeHydrated={this.props.storeHydrated}
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
            storeHydrated={this.props.storeHydrated}
            benefitTypes={this.props.benefitTypes}
            patronTypes={this.props.patronTypes}
            benefits={this.props.benefits}
            corporaEn={this.props.corporaEn}
            corporaFr={this.props.corporaFr}
            switchSection={this.switchSection}
            selectedPatronTypes={this.state.selectedPatronTypes}
            selectedBenefitTypes={this.state.selectedBenefitTypes}
            toggleSelectedPatronType={this.toggleSelectedPatronType}
            toggleSelectedBenefitType={this.toggleSelectedBenefitType}
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
    benefitTypes: state.benefitTypes,
    patronTypes: state.patronTypes,
    corporaEn: state.corporaEn,
    corporaFr: state.corporaFr
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withI18next()(A)
);
