import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";

import { PhaseBanner } from "@cdssnc/gcui";

import ErrorBoundary from "../components/error_boundary";
import Head from "../components/head";
import FeedbackBar from "../components/feedbackBar";
import Footer from "../components/footer";
import MenuBar from "../components/menu_bar";
import Noscript from "../components/noscript";

const Container = styled("div")`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  background-color: #f5f5f5;
`;

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
            <Container role="main">{this.props.children}</Container>
          </Content>
          <FeedbackBar t={this.props.t} />
          <Footer t={this.props.t} />
        </ErrorBoundary>
        {noScriptTag}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  hideNoscript: PropTypes.bool,
  i18n: PropTypes.object,
  t: PropTypes.func
};

export default Layout;
