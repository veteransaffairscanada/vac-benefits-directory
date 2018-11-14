import React, { Component } from "react";
import PropTypes from "prop-types";

import withI18N from "../lib/i18n";
import Layout from "../components/layout";
import { connect } from "react-redux";
import Favourites from "../components/favourites";

export class FavouritesPage extends Component {
  render() {
    const { i18n, t, favouriteBenefits } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
        title={t("favourites.saved_benefits", { x: favouriteBenefits.length })}
      >
        <Favourites
          id="favourites"
          t={t}
          favouriteBenefits={favouriteBenefits}
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

export default connect(mapStateToProps)(withI18N()(FavouritesPage));
