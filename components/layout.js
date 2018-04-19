// @flow

import React, { Component } from "react";

import ErrorBoundary from "../components/errorBoundary";
import Head from "../components/head";
import Footer from "../components/footer";
import AlphaBanner from "../components/alpha_banner";
import MenuBar from "../components/menu_bar";
import Noscript from "../components/noscript";

import styled from "react-emotion";

type Props = {
  children?: mixed,
  i18n?: mixed,
  t?: mixed
};

const Content = styled("div")`
  min-height: calc(100vh - 65px);
`;

class Layout extends Component<Props> {
  props: Props;

  componentDidMount() {
    const emotionStyles = document.getElementById("emotion-server-side");
    if (emotionStyles && emotionStyles.parentNode) {
      emotionStyles.parentNode.removeChild(emotionStyles);
    }
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div>
        <Head t={this.props.t} />
        <Noscript t={this.props.t} />
        <ErrorBoundary>
          <Content>
            <AlphaBanner t={this.props.t} />
            <MenuBar i18n={this.props.i18n} t={this.props.t} />
            {this.props.children}
          </Content>
          <Footer t={this.props.t} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default Layout;
