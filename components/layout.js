// @flow

import React, { Component } from "react";

import ErrorBoundary from "../components/errorBoundary";
import Head from "../components/head";
import MenuBar from "../components/menu_bar";

type Props = {
  children?: mixed,
  t?: mixed
};

class Layout extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Head t={this.props.t} />
        <ErrorBoundary>
          <MenuBar i18n={this.props.i18n} t={this.props.t} />
          {this.props.children}
        </ErrorBoundary>
      </div>
    );
  }
}

export default Layout;
