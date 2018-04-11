// @flow

import React, { Component } from "react";
import Raven from "raven-js";

// const SENTRY_DSN = process.env.SENTRY_DSN;
// const SENTRY_DSN = "https://ab483c6f60924f57b104271afa48b0a3@sentry.io/1082251"
const SENTRY_DSN = null;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    Raven.config(SENTRY_DSN).install();
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="snap"
          onClick={() => Raven.lastEventId() && Raven.showReportDialog()}
        >
          <p>We're sorry — something's gone wrong.</p>
          <p>Our team has been notified, but click here fill out a report.</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
