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
        ctx.store.dispatch({
          type: "LOAD_GITHUBDATA",
          data: ctx.req.githubData
        });
      }

      // this has to be refactored
      // unfortunately when this runs, currentReduxState.questions is empty
      const profileQuestions = [
        "patronType",
        "serviceType",
        "statusAndVitals",
        "serviceHealthIssue"
      ];

      profileQuestions.forEach(q => {
        if (ctx.query[q] && ctx.query[q] !== currentReduxState[q]) {
          ctx.store.dispatch({
            type: "SAVE_QUESTION_RESPONSE",
            data: { [q]: ctx.query[q] }
          });
        }
        if (!ctx.query[q] && currentReduxState[q] !== "") {
          ctx.store.dispatch({
            type: "SAVE_QUESTION_RESPONSE",
            data: { [q]: "" }
          });
        }
      });

      let queryParams = [
        { key: "searchString", reducer: "SET_SEARCH_STRING", default: "" },
        { key: "sortBy", reducer: "SET_SORT_BY", default: "relevance" }
      ];

      queryParams.forEach(param => {
        if (
          ctx.query[param.key] &&
          ctx.query[param.key] !== currentReduxState[param.key]
        ) {
          ctx.store.dispatch({
            type: param.reducer,
            data: ctx.query[param.key]
          });
        }
        if (
          !ctx.query[param.key] &&
          currentReduxState[param.key] !== param.default
        ) {
          ctx.store.dispatch({
            type: param.reducer,
            data: param.default
          });
        }
      });

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
