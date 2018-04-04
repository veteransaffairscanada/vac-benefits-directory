import React from "react";
import Raven from "raven-js";

const SENTRY_DSN = "https://b23c49f878524c8eaf98fb47340d2448@sentry.io/1082251";

function withSentry(Child) {
  return class WrappedComponent extends React.Component {
    static getInitialProps(context) {
      if (Child.getInitialProps) {
        return Child.getInitialProps(context);
      }
      return {};
    }
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      Raven.config(SENTRY_DSN).install();
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ error });
      Raven.captureException(error, { extra: errorInfo });
    }

    render() {
      return <Child {...this.props} error={this.state.error} />;
    }
  };
}

export default withSentry;
