import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
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
import Link from "next/link";
import VacFooter from "./vac_footer";

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

    // fetch('https://veterans.gc.ca/eng')
    //     .then((res) => {
    //       console.log(res)
    //         // return res.json();
    //     })

    // var proxyUrl = "https://cors-anywhere.herokuapp.com/",
    //   targetUrl = "https://veterans.gc.ca/eng#wb-info";
    // fetch(proxyUrl + targetUrl)
    //   .then(blob => blob.text())
    //   .then(data => {
    //     // console.log(data.text());
    //     document.querySelector("pre").innerHTML = data; //JSON.stringify(data, null, 2);
    //     return data;
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     return e;
    //   });

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
                    skipLink={skipLink}
                  />
                </Container>
                <div className={alpha}>
                  <Container>
                    <AlphaBanner t={t}>
                      {t("beta_banner.main")} &nbsp;
                      <Link href={{ pathname: "/feedback", query: url.query }}>
                        <a className={white}>{t("beta_banner.link_text")}</a>
                      </Link>
                    </AlphaBanner>
                  </Container>
                </div>
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
            <div className={backgoundColour2}>
              <Container>
                <VacFooter t={t} />
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
  url: PropTypes.object.isRequired,
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
