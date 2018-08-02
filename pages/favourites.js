import React, { Component } from "react";
import PropTypes from "prop-types";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import Favourites from "../components/favourites";

export class FavouritesPage extends Component {
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
          favouriteBenefits={this.props.favouriteBenefits}
          url={this.props.url}
          store={this.props.store}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    favouriteBenefits: state.favouriteBenefits
  };
};

FavouritesPage.propTypes = {
  favouriteBenefits: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18next()(FavouritesPage));
