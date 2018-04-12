// @flow

import React, { Component } from "react";

import ErrorBoundary from "../components/errorBoundary";
import Head from "../components/head";
import Footer from "../components/footer";

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
          {this.props.children}
          <Footer />
        </ErrorBoundary>
      </div>
    );
  }
}

export default Layout;
