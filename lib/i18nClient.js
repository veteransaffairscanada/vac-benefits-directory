import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = reduxState => {
  return {
    translations: reduxState.translations,
    language: reduxState.language
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLanguage: language => {
      dispatch({ type: "SET_INITIAL_LANGUAGE", data: language });
    }
  };
};

const withI18N = WrappedComponent => {
  class WithI18N extends Component {
    t = (key, options) => {
      let translations = this.props.translations;
      for (var p in translations) {
        if (key == translations[p].key || key == translations[p].id) {
          let trans =
            translations[p][this.props.language == "en" ? "English" : "French"];
          if (options) {
            trans = trans.replace("{{x}}", options.x);
          }
          return trans;
        }
      }
      return "key";
    };
    i18n = {
      changeLanguage: () => {
        this.props.setLanguage(this.t("other-language-code"));
      }
    };
    render() {
      return <WrappedComponent {...this.props} t={this.t} i18n={this.i18n} />;
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithI18N);
};

export default withI18N;
