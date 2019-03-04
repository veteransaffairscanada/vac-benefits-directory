import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import JssProvider from "react-jss/lib/JssProvider";
import flush from "styled-jsx/server";
import getPageContext from "../lib/pageContext";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { globalTheme } from "../theme";

const bodyStyling = {
  fontFamily: globalTheme.fontFamilySerif,
  margin: 0,
  WebkitFontSmoothing: "antialiased"
};

class MyDocument extends Document {
  static getInitialProps(ctx) {
    const pageContext = getPageContext();
    //eslint-disable-next-line react/display-name
    const page = ctx.renderPage(Component => props => (
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
      >
        <MuiThemeProvider
          theme={pageContext.theme}
          sheetsManager={pageContext.sheetsManager}
        >
          <Component pageContext={pageContext} {...props} />
        </MuiThemeProvider>
      </JssProvider>
    ));

    const emotionStyles = extractCritical(page.html);
    return {
      ...page,
      pageContext,
      styles: (
        <React.Fragment>
          <style
            id="emotion-server-side"
            dangerouslySetInnerHTML={{ __html: emotionStyles.css }}
          />
          <style
            id="jss-server-side"
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          {flush() || null}
        </React.Fragment>
      )
    };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    const path = "https://veterans.gc.ca";
    var initialLang = this.props.__NEXT_DATA__.props.initialState.language;
    return (
      <html lang={initialLang}>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

          <link
            rel="stylesheet"
            href={path + "/css/jquery-ui/1.12.1/jquery-ui.min.css"}
            type="text/css"
          />
          <link
            rel="stylesheet"
            href={path + "/GCWeb_5.0.1/GCWeb/css/theme.min.css"}
            type="text/css"
          />
          <link
            rel="stylesheet"
            href={path + "/GCWeb_5.0.1/GCWeb/css/wet-boew.min.css"}
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://www.canada.ca/etc/designs/canada/clientlib-all.min.css"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Merriweather%7CBarlow:600%7CMontserrat:400,700"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href={path + "/css/2018-redesign/2018-redesign-custom.css"}
            type="text/css"
          />
          <link
            rel="stylesheet"
            href={path + "/css/2018-redesign/2019-custom-animations.css"}
            type="text/css"
          />
          <link
            rel="stylesheet"
            href={path + "/css/2018-redesign/timeline.css"}
            type="text/css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={path + "/GCWeb/slick/slick.css"}
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={path + "/GCWeb/slick/slick-theme.css"}
          />
        </Head>
        <body style={bodyStyling} tabIndex={1}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
