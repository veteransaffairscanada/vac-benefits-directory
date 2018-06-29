import React, { Component } from "react";
import PropTypes from "prop-types";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import { redux2i18n } from "../utils/redux2i18n";
import Favourites from "../components/favourites";
import Cookies from "universal-cookie";
import Router from "next/router";

export class FavouritesPage extends Component {
  constructor() {
    super();
    this.cookies = new Cookies();
    this.state = {
      favouriteBenefits: []
    };
  }

  componentWillMount() {
    redux2i18n(this.props.i18n, this.props.text);
    const newState = {
      favouriteBenefits: this.props.favouriteBenefits
    };

    this.setState(newState);
  }

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

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
      >
        <Favourites
          id="favourites"
          t={t}
          benefits={this.props.benefits}
          eligibilityPaths={this.props.eligibilityPaths}
          examples={this.props.examples}
          setUserProfile={this.setUserProfile}
          setSection={this.setSection}
          favouriteBenefits={this.state.favouriteBenefits}
          toggleFavourite={this.toggleFavourite}
          store={this.props.store}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    benefits: state.benefits,
    examples: state.examples,
    eligibilityPaths: state.eligibilityPaths,
    favouriteBenefits: state.favouriteBenefits,
    text: state.text,
    selectedNeeds: state.selectedNeeds
  };
};

FavouritesPage.propTypes = {
  benefits: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  text: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.array
};

export default connect(mapStateToProps)(withI18next()(FavouritesPage));
