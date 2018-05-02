import React from "react";
import ErrorBoundary from "../../components/error_boundary";
import { mount } from "enzyme";
import Raven from "raven-js";

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
    Raven.config = jest.fn(() => {
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
    jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");
    console.error = jest.fn(); // eslint-disable-line no-console
    Raven.captureException = jest.fn();
    expect(() => {
      mount(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      );
    }).toThrow(new Error("Error thrown from problem child"));
    expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled();
    expect(Raven.captureException).toHaveBeenCalled();
  });
});
