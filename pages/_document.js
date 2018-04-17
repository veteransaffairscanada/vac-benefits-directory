import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import JssProvider from "react-jss/lib/JssProvider";
import flush from "styled-jsx/server";
import getPageContext from "../lib/pageContext";
import { MuiThemeProvider } from "material-ui/styles";

const bodyStyling = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  margin: 0
};

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const pageContext = getPageContext();
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
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body style={bodyStyling}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
