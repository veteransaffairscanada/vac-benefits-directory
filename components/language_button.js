import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { logEvent } from "../utils/analytics";
import Router from "next/router";

class LanguageButton extends Component {
  changeLanguage = () => {
    const newQuery = Router.query;
    newQuery.lng = this.props.t("other-language-code");
    Router.push({
      pathname: Router.pathname,
      query: newQuery
    });
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  render() {
    const { t } = this.props;

    return (
      <Button
        id="changeLanguage"
        onClick={this.changeLanguage}
        style={{ color: "#fff" }}
      >
        {t("other-language")}
      </Button>
    );
  }
}

LanguageButton.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default LanguageButton;
