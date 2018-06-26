import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";

import { AlphaBanner } from "../components/alpha_banner";

import ErrorBoundary from "../components/error_boundary";
import Head from "../components/head";
import FeedbackBar from "../components/feedbackBar";
import Footer from "../components/footer";
import FederalBanner from "../components/federal_banner";
import Noscript from "../components/noscript";

import classnames from "classnames";
import { withStyles } from "@material-ui/core//styles";

const Container = styled("div")`
  max-width: 1200px;
  margin: 0 auto;
`;

const alpha = css`
  background-color: #555555;
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
    const { t } = this.props;
    const noScriptTag = this.props.hideNoscript ? null : <Noscript t={t} />;
    return (
      <div className={classnames(this.props.classes.root)}>
        <Head title={this.props.title} t={t} />
        <ErrorBoundary>
          <Content>
            <div className={classnames(this.props.classes.header)}>
              <div className={alpha}>
                <Container>
                  <AlphaBanner>{t("alpha")}</AlphaBanner>
                </Container>
              </div>
              <Container>
                <FederalBanner
                  i18n={this.props.i18n}
                  t={t}
                  showRefreshCache={this.props.showRefreshCache}
                />
              </Container>
            </div>
            <Container role="main">{this.props.children}</Container>
          </Content>
          <div style={{ backgroundColor: "#eee" }}>
            <Container>
              <FeedbackBar t={t} />
            </Container>
          </div>
          <div style={{ backgroundColor: "#ddd" }}>
            <Container>
              <Footer t={t} />
            </Container>
          </div>
        </ErrorBoundary>
        {noScriptTag}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  hideNoscript: PropTypes.bool,
  showRefreshCache: PropTypes.bool,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Layout);
