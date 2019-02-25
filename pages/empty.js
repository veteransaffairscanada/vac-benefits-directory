import React, { Component } from "react";
import PropTypes from "prop-types";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { globalTheme } from "../theme";

export class EmptyPage extends Component {
  render() {
    return (
      <Layout
        t={this.props.t}
        i18n={this.props.i18n}
        hideNoscript={false}
        title="Empty"
        backgroundColor={globalTheme.colour.paleGreyTwo}
        skipLink="#mainContent"
        url={this.props.url}
      >
        <div>This is an empty page.</div>
      </Layout>
    );
  }
}

EmptyPage.propTypes = {
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default withI18N(EmptyPage);
