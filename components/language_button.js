import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { logEvent } from "../utils/analytics";
import Router from "next/router";
import { css } from "react-emotion";
import { globalTheme } from "../theme";

  const mobileButton = css`
    color: #fff !important;
    text-transform: none !important;
    @media only screen and (min-width: ${globalTheme.max.xs}) {
      display: none !important;
    }
`;
  const desktopButton = css`
    color: #fff !important;
    text-transform: none !important;
    @media only screen and (max-width: ${globalTheme.max.xs}) {
      display: none !important;
    }
`;

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

  titleCase = word => {
    return word[0].toUpperCase() + word.substr(1);
  };

  render() {
    const { t } = this.props;

    return (
      <div title={t("other-language-in-current-language")}>
        <Button
          id="changeLanguage"
          onClick={this.changeLanguage}
          className={desktopButton}
          lang={t("other-language-code")}
        >
          {t("other-language")}
        </Button>

        <Button
          id="changeLanguageMobile"
          onClick={this.changeLanguage}
          className={mobileButton}
          lang={t("other-language-code")}
        >
          {this.titleCase(t("other-language-code"))}
        </Button>
      </div>
    );
  }
}

LanguageButton.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default (LanguageButton);
