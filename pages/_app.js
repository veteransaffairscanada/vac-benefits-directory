// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      let currentReduxState = ctx.store.getState();
      if (ctx.req) {
        ctx.store.dispatch({ type: "LOAD_DATA", data: ctx.req.data });
        ctx.store.dispatch({ type: "INDEX_BENEFITS" });
      }
      if (
        ctx.query.patronType &&
        ctx.query.patronType !== currentReduxState.patronType
      ) {
        ctx.store.dispatch({
          type: "SET_PATRON_TYPE",
          data: ctx.query.patronType
        });
      }
      if (!ctx.query.patronType && currentReduxState.patronType !== "") {
        ctx.store.dispatch({
          type: "SET_PATRON_TYPE",
          data: ""
        });
      }

      if (
        ctx.query.serviceType &&
        ctx.query.serviceType !== currentReduxState.serviceType
      ) {
        console.log("set serviceType from url");
        ctx.store.dispatch({
          type: "SET_SERVICE_TYPE",
          data: ctx.query.serviceType
        });
      }
      if (!ctx.query.serviceType && currentReduxState.serviceType !== "") {
        ctx.store.dispatch({
          type: "SET_SERVICE_TYPE",
          data: ""
        });
      }

      if (
        ctx.query.statusAndVitals &&
        ctx.query.statusAndVitals !== currentReduxState.statusAndVitals
      ) {
        ctx.store.dispatch({
          type: "SET_STATUS_TYPE",
          data: ctx.query.statusAndVitals
        });
      }
      if (
        !ctx.query.statusAndVitals &&
        currentReduxState.statusAndVitals !== ""
      ) {
        ctx.store.dispatch({
          type: "SET_STATUS_TYPE",
          data: ""
        });
      }

      if (
        ctx.query.serviceHealthIssue &&
        ctx.query.serviceHealthIssue !== currentReduxState.serviceHealthIssue
      ) {
        ctx.store.dispatch({
          type: "SET_HEALTH_ISSUE",
          data: ctx.query.serviceHealthIssue
        });
      }
      if (
        !ctx.query.serviceHealthIssue &&
        currentReduxState.serviceHealthIssue !== ""
      ) {
        ctx.store.dispatch({
          type: "SET_HEALTH_ISSUE",
          data: ""
        });
      }

      if (ctx.query.selectedNeeds) {
        let selectedNeeds = {};
        ctx.query.selectedNeeds.split(",").forEach(id => {
          selectedNeeds[id] = id;
        });
        if (
          JSON.stringify(selectedNeeds) !==
          JSON.stringify(currentReduxState.selectedNeeds)
        ) {
          ctx.store.dispatch({
            type: "SET_SELECTED_NEEDS",
            data: selectedNeeds
          });
        }
      }
      if (
        !ctx.query.selectedNeeds &&
        JSON.stringify(currentReduxState.selectedNeeds) !== JSON.stringify({})
      ) {
        ctx.store.dispatch({
          type: "SET_SELECTED_NEEDS",
          data: {}
        });
      }

      if (
        ctx.query.searchString &&
        ctx.query.searchString !== currentReduxState.searchString
      ) {
        ctx.store.dispatch({
          type: "SET_SEARCH_STRING",
          data: ctx.query.searchString
        });
      }
      if (!ctx.query.searchString && currentReduxState.searchString !== "") {
        ctx.store.dispatch({
          type: "SET_SEARCH_STRING",
          data: ""
        });
      }

      if (ctx.query.option && ctx.query.option !== currentReduxState.option) {
        ctx.store.dispatch({
          type: "SET_OPTION",
          data: ctx.query.option
        });
      }
      if (!ctx.query.option && currentReduxState.option !== "") {
        ctx.store.dispatch({
          type: "SET_OPTION",
          data: ""
        });
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
