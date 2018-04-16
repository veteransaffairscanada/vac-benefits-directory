import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import styled, { css } from "react-emotion";

const bodyStyling = {
  "font-family": '"Roboto", "Helvetica", "Arial", sans-serif',
  margin: 0
};

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body style={bodyStyling}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
