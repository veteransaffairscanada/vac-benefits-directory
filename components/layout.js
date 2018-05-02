// @flow

import React, { Component } from "react";

import ErrorBoundary from "../components/error_boundary";
import Head from "../components/head";
import Footer from "../components/footer";
import AlphaBanner from "../components/alpha_banner";
import MenuBar from "../components/menu_bar";
import Noscript from "../components/noscript";

import styled from "react-emotion";

type Props = {
  children?: mixed,
  hideNoscript?: boolean,
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
    const noScriptTag = this.props.hideNoscript ? null : (
      <Noscript t={this.props.t} />
    );
    return (
      <div>
        <Head t={this.props.t} />
        <ErrorBoundary>
          <Content>
            <AlphaBanner t={this.props.t} />
            <MenuBar i18n={this.props.i18n} t={this.props.t} />
            <div role="main">{this.props.children}</div>
          </Content>
          <Footer t={this.props.t} />
        </ErrorBoundary>
        {noScriptTag}
      </div>
    );
  }
}

export default Layout;
