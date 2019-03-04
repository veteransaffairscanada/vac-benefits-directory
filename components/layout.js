import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import styled from "@emotion/styled";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ErrorBoundary from "../components/error_boundary";
import Head from "../components/head";
import FeedbackBar from "../components/feedbackBar";
import Footer from "../components/footer";
import FederalBanner from "../components/federal_banner";
import Noscript from "../components/noscript";
import Container from "../components/container";
import { globalTheme } from "../theme";

const Content = styled("div")`
  min-height: calc(100vh - 65px);
`;
const header = css`
  background-color: ${globalTheme.colour.bannerColour};
  padding: 0px;
`;

const backgoundColour1 = css`
  background-color: ${globalTheme.colour.greyishBrownTwo};
`;
const footerColour = css`
  background-color: ${globalTheme.colour.bannerColour};
`;
const theme = createMuiTheme({
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
              <header className={header}>
                <Container>
                  <FederalBanner
                    i18n={this.props.i18n}
                    t={t}
                    url={url}
                    skipLink={skipLink}
                  />
                </Container>
              </header>
              <div role="main" id="main">
                {this.props.children}
              </div>
            </Content>
            <div className={backgoundColour1}>
              <Container>
                <FeedbackBar t={t} />
              </Container>
            </div>
            <div className={footerColour}>
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
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  skipLink: PropTypes.string.isRequired,
  title: PropTypes.string,
  backgroundColor: PropTypes.string
};

Layout.defaultProps = {
  backgroundColor: globalTheme.colour.paleGrey
};

export default Layout;
