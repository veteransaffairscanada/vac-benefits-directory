import React, { Component } from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";
import { initGA, logPageView } from "../utils/analytics";

class Head extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    const { title, description, t } = this.props;
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="description" content={description || t("description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/leaf-favicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800"
          rel="stylesheet"
        />
      </NextHead>
    );
  }
}

Head.propTypes = {
  description: PropTypes.string,
  t: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default Head;
