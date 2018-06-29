// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      if (ctx.req) {
        ctx.store.dispatch({ type: "LOAD_DATA", data: ctx.req.data });
        if (ctx.query.patronType) {
          ctx.store.dispatch({
            type: "SET_PATRON_TYPE",
            data: ctx.query.patronType
          });
        }
        if (ctx.query.serviceType) {
          ctx.store.dispatch({
            type: "SET_SERVICE_TYPE",
            data: ctx.query.serviceType
          });
        }
        if (ctx.query.statusAndVitals) {
          ctx.store.dispatch({
            type: "SET_STATUS_TYPE",
            data: ctx.query.statusAndVitals
          });
        }
        if (ctx.query.selectedNeeds) {
          let selectedNeeds = {};
          ctx.query.selectedNeeds.split(",").forEach(id => {
            selectedNeeds[id] = id;
          });
          ctx.store.dispatch({
            type: "SET_SELECTED_NEEDS",
            data: selectedNeeds
          });
        }
      }

      const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {};
      return { pageProps };
    }

    render() {
      const { Component, pageProps, store, router } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} url={router} />
          </Provider>
        </Container>
      );
    }
  }
);
