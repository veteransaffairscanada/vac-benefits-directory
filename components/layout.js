import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import styled from "@emotion/styled";
import {
  MuiThemeProvider,
  createMuiTheme,
  withTheme
} from "@material-ui/core/styles";
import ErrorBoundary from "../components/error_boundary";
import Head from "../components/head";
import FeedbackBar from "../components/feedbackBar";
import Noscript from "../components/noscript";
import Container from "../components/container";
import { globalTheme } from "../theme";
import VacFooterEn from "./vac_footer_en";
import VacFooterFr from "./vac_footer_fr";
import VacHeaderEn from "./vac_header_en";
import VacHeaderFr from "./vac_header_fr";
import SkipToMainContent from "./skip_to_main_content";

const Content = styled("div")`
  min-height: calc(100vh - 65px);
`;
const black_bg = css`
  background-color: ${globalTheme.colour.blackish2};
  padding-bottom: 6px;
`;
const backgoundColour1 = css`
  background-color: ${globalTheme.colour.greyishBrownTwo};
`;
const fontStyle = css`
  font-family: Montserrat;
  line-height: 1.4375;
`;
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1000
    }
  },
  palette: {
    primary: {
      main: globalTheme.colour.cerulean
    },
    secondary: {
      light: globalTheme.colour.paleBlueGrey,
      main: globalTheme.colour.paleBlueGrey,
      dark: globalTheme.colour.darkBlueGrey,
      contrastText: globalTheme.colour.cerulean
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: globalTheme.fontFamilySerif
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
    const { t, title, skipLink, url } = this.props;
    const noScriptTag = this.props.hideNoscript ? null : <Noscript t={t} />;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ backgroundColor: this.props.backgroundColor }}>
          <Head title={title} t={t} />
          <ErrorBoundary>
            <Content>
              <SkipToMainContent skipLink={skipLink} t={t} />
              <div id="header_css" className={black_bg}>
                {t("current-language-code") === "en" ? (
                  <VacHeaderEn t={t} url={url} />
                ) : (
                  <VacHeaderFr t={t} url={url} />
                )}
              </div>
              <div role="main" id="main">
                {this.props.children}
              </div>
            </Content>
            <div className={backgoundColour1}>
              <Container>
                <FeedbackBar t={t} />
              </Container>
            </div>
            <div id="footer_styles" className={fontStyle}>
              {t("current-language-code") === "en" ? (
                <VacFooterEn />
              ) : (
                <VacFooterFr />
              )}
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
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  skipLink: PropTypes.string.isRequired,
  title: PropTypes.string,
  backgroundColor: PropTypes.string
};

Layout.defaultProps = {
  backgroundColor: globalTheme.colour.paleGrey
};

export default withTheme()(Layout);
