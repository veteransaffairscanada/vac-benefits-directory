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
import Container from "../components/container";

const alpha = css`
  background-color: #345075;
`;
const Content = styled("div")`
  min-height: calc(100vh - 65px);
`;
const header = css`
  background-color: #555;
  padding: 0px;
`;
const white = css`
  color: white;
`;
const backgoundColour1 = css`
  background-color: #505050;
`;
const backgoundColour2 = css`
  background-color: #434343;
`;
const theme = createMuiTheme({
  overrides: {
    MuiTouchRipple: {
      childPulsate: { opacity: 0 },
      ripplePulsate: { opacity: 0 }
    }
  },
  palette: {
    secondary: {
      light: "#f1f7fc",
      main: "#f1f7fc",
      dark: "#d8dee2",
      contrastText: "#006cc9"
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
              <div className={header}>
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
                        href={"mailto:" + t("contact.feedback_email")}
                        className={white}
                      >
                        {t("alpha-feedback")}
                      </a>
                    </AlphaBanner>
                  </Container>
                </div>
              </div>
              <div role="main">{this.props.children}</div>
            </Content>
            <div className={backgoundColour1}>
              <Container>
                <FeedbackBar t={t} />
              </Container>
            </div>
            <div className={backgoundColour2}>
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

export default Layout;
