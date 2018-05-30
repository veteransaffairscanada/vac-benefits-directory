import React, { Component } from "react";
import styled from "react-emotion";

import { PhaseBanner } from "@cdssnc/gcui";

import ErrorBoundary from "../components/error_boundary";
import Head from "../components/head";
import FeedbackBar from "../components/feedbackBar";
import Footer from "../components/footer";
import MenuBar from "../components/menu_bar";
import Noscript from "../components/noscript";

const Content = styled("div")`
  min-height: calc(100vh - 65px);
`;

class Layout extends Component {
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
            <PhaseBanner alpha>{this.props.t("alpha")}</PhaseBanner>
            <MenuBar i18n={this.props.i18n} t={this.props.t} />
            <div role="main">{this.props.children}</div>
          </Content>
          <FeedbackBar t={this.props.t} />
          <Footer t={this.props.t} />
        </ErrorBoundary>
        {noScriptTag}
      </div>
    );
  }
}

export default Layout;
