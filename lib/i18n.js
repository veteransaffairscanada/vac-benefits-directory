import React, { Component } from "react";
import { connect } from "react-redux";

const withI18N = WrappedComponent => {
  class WithI18N extends Component {
    t = key => {
      if (this.props.__NEXT_DATA__) {
        var translations = this.props.__NEXT_DATA__.props.initialState
          .translations;
        for (var p in translations) {
          if (key == translations[p].key || key == translations[p].id)
            return translations[p][
              this.props.language == "en" ? "English" : "French"
            ];
        }
      }
      return key;
    };
    i18n = {
      changeLanguage: function() {
        console.log("test");
      }
    };
    render() {
      return <WrappedComponent {...this.props} t={this.t} i18n={this.i18n} />;
    }
  }
  return WithI18N;
};

export default withI18N;
