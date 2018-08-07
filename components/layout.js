import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
  padding-left: 16px;
  padding-right: 16px;
`;

const alpha = css`
  background-color: #345075;
`;

const Content = styled("div")`
  min-height: calc(100vh - 65px);
`;

const styles = () => ({
  header: {
    backgroundColor: "#000",
    padding: "0px"
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: { "&:focus": { opacity: 0.3 } }
    },
    MuiTouchRipple: {
      childPulsate: { opacity: 0 },
      ripplePulsate: { opacity: 0 }
    }
  },
  typography: { fontFamily: ["Merriweather", "serif"] }
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
      <MuiThemeProvider theme={theme}>
        <div style={{ backgroundColor: this.props.backgroundColor }}>
          <Head title={this.props.title} t={t} />
          <ErrorBoundary>
            <Content>
              <div className={classnames(this.props.classes.header)}>
                <Container>
                  <FederalBanner
                    i18n={this.props.i18n}
                    t={t}
                    showRefreshCache={this.props.showRefreshCache}
                  />
                </Container>
                <div className={alpha}>
                  <Container>
                    <AlphaBanner>
                      {t("alpha")} &nbsp;
                      <a
                        href={"mailto:" + t("contact.email")}
                        style={{ color: "white" }}
                      >
                        {t("alpha-feedback")}
                      </a>
                    </AlphaBanner>
                  </Container>
                </div>
              </div>
              <div role="main">{this.props.children}</div>
            </Content>
            <div style={{ backgroundColor: "#505050" }}>
              <Container>
                <FeedbackBar t={t} />
              </Container>
            </div>
            <div style={{ backgroundColor: "#434343" }}>
              <Container>
                <Footer t={t} />
              </Container>
            </div>
          </ErrorBoundary>
          {noScriptTag}
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  classes: PropTypes.object.isRequired,
  hideNoscript: PropTypes.bool.isRequired,
  showRefreshCache: PropTypes.bool.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  backgroundColor: PropTypes.string
};

Layout.defaultProps = {
  backgroundColor: "#e3e3e3"
};

export default withStyles(styles)(Layout);
