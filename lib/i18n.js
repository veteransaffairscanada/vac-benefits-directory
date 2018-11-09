import React, { Component } from "react";
import createReactContext from "create-react-context";
// Extended needs an i18n prop, a t function

const I18nContext = createReactContext();

export function withI18N() {
  return function Wrapper(WrappedComponent) {
    class WithI18N extends Component {
      t(key) {
        return key;
      }
      render() {
        return React.createElement(I18nContext.Consumer, null, ctx =>
          React.createElement(WrappedComponent, {
            ...ctx,
            ...this.props,
            t: this.t
          })
        );
      }
    }
    return WithI18N;
  };
}
