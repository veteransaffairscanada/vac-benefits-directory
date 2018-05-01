import React from "react";
import ErrorBoundary from "../../components/error_boundary";
import { mount } from "enzyme";
import Raven from "raven-js";

/*

- test that state is set error: null  and Raven.config().install is run
- throw an error and test that state is updated and Raven.captureException is called

 */

describe("ErrorBoundary", () => {
  // Setup

  let props;
  let _mountedErrorBoundary;
  const mountedErrorBoundary = () => {
    if (!_mountedErrorBoundary) {
      _mountedErrorBoundary = mount(<ErrorBoundary {...props} />);
    }
    return _mountedErrorBoundary;
  };

  beforeEach(() => {
    process.env.SENTRY_DSN = "test string";

    props = {
      children: []
    };
    _mountedErrorBoundary = undefined;
  });

  // Tests

  it("initializes state", () => {
    expect(mountedErrorBoundary().state().error).toEqual(null);
  });

  it("initializes Raven", () => {
    const installMock = jest.fn();
    Raven.config = jest.fn(n => {
      return {
        install: installMock
      };
    });
    mountedErrorBoundary();
    expect(Raven.config).toBeCalled();
    expect(installMock).toBeCalled();
  });

  function ProblemChild() {
    throw new Error("Error thrown from problem child");
    return <div>Error</div>; // eslint-disable-line
  }

  it("should catch errors with componentDidCatch", () => {
    const spy = jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");
    mount(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled();
  });
});
