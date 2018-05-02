// @flow

import { Component } from "react";
import Raven from "raven-js";

const SENTRY_DSN = process.env.SENTRY_DSN;

type Props = {
  children?: mixed
};

class ErrorBoundary extends Component<Props> {
  constructor() {
    super();
    this.state = { error: null };
    Raven.config(SENTRY_DSN).install();
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
