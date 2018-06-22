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

import classnames from "classnames";
import { withStyles } from "@material-ui/core//styles";

const Container = styled("div")`
  max-width: 1200px;
  margin: 0 auto;
`;

const Content = styled("div")`
  min-height: calc(100vh - 65px);
`;

const styles = () => ({
  root: {
    backgroundColor: "#f5f5f5"
  },
  header: {
    backgroundColor: "#000",
    padding: "0px"
  }
});

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
      <div className={classnames(this.props.classes.root)}>
        <Head title={this.props.title} t={this.props.t} />
        <ErrorBoundary>
          <Content>
            <div className={classnames(this.props.classes.header)}>
              <Container>
                <PhaseBanner alpha>{this.props.t("alpha")}</PhaseBanner>
                <MenuBar
                  i18n={this.props.i18n}
                  t={this.props.t}
                  showRefreshCache={this.props.showRefreshCache}
                />
              </Container>
            </div>
            <Container role="main">{this.props.children}</Container>
          </Content>
          <div style={{ backgroundColor: "#eee" }}>
            <Container>
              <FeedbackBar t={this.props.t} />
            </Container>
          </div>
          <div style={{ backgroundColor: "#ddd" }}>
            <Container>
              <Footer t={this.props.t} />
            </Container>
          </div>
        </ErrorBoundary>
        {noScriptTag}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  hideNoscript: PropTypes.bool,
  showRefreshCache: PropTypes.bool,
  i18n: PropTypes.object,
  t: PropTypes.func,
  title: PropTypes.string
};

export default withStyles(styles)(Layout);
