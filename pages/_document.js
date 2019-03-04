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
    var initialLang = this.props.__NEXT_DATA__.props.initialState.language;
    return (
      <html lang={initialLang}>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

          <link
            rel="stylesheet"
            type="text/css"
            href={"../static/vac_css_used.css"}
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
