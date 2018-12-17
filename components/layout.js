/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { AlphaBanner } from "../components/alpha_banner";
import ErrorBoundary from "../components/error_boundary";
import Head from "../components/head";
import FeedbackBar from "../components/feedbackBar";
import Footer from "../components/footer";
import FederalBanner from "../components/federal_banner";
import Noscript from "../components/noscript";
import Container from "../components/container";
import { globalTheme } from "../theme";

const alpha = css`
  background-color: ${globalTheme.colour.alphaBlue};
`;
const Content = styled("div")`
  min-height: calc(100vh - 65px);
`;
const header = css`
  background-color: ${globalTheme.colour.greyishBrownTwo};
  padding: 0px;
`;
const white = css`
  color: white;
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;
const backgoundColour1 = css`
  background-color: ${globalTheme.colour.greyishBrownTwo};
`;
const backgoundColour2 = css`
  background-color: ${globalTheme.colour.greyishBrown};
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
    fontFamily: ["Merriweather", "serif"]
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
    const { t, title } = this.props;
    const noScriptTag = this.props.hideNoscript ? null : <Noscript t={t} />;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ backgroundColor: this.props.backgroundColor }}>
          <Head title={title} t={t} />
          <ErrorBoundary>
            <Content>
              <div css={header}>
                <Container>
                  <FederalBanner
                    i18n={this.props.i18n}
                    t={t}
                    showRefreshCache={this.props.showRefreshCache}
                  />
                </Container>
                <div css={alpha}>
                  <Container>
                    <AlphaBanner t={t}>
                      {t("alpha")} &nbsp;
                      <a
                        href={"mailto:" + t("contact.feedback_email")}
                        css={white}
                      >
                        {t("alpha-feedback")}
                      </a>
                    </AlphaBanner>
                  </Container>
                </div>
              </div>
              <div role="main" id="main">
                {this.props.children}
              </div>
            </Content>
            <div css={backgoundColour1}>
              <Container>
                <FeedbackBar t={t} />
              </Container>
            </div>
            <div css={backgoundColour2}>
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
  backgroundColor: globalTheme.colour.paleGrey
};

export default Layout;
