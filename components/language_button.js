import React, { Component } from "react";
import PropTypes from "prop-types";
import FooterButton from "./footer_button";
import { logEvent } from "../utils/analytics";
import Router from "next/router";
import { css } from "emotion";
import Language from "./icons/Language";
import { globalTheme } from "../theme";

const desktopButton = css`
  font-size: 10px;
  text-transform: uppercase;
  line-height: 23px;
  letter-spacing: 2.5px;
  svg {
    margin-top: -4px;
    vertical-align: middle;
    padding-left: 5px;
    color: ${globalTheme.colour.blueGrey};
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
      <React.Fragment>
        <div title={t("other-language-in-current-language")}>
          <FooterButton
            id="changeLanguage"
            onClick={this.changeLanguage}
            className={desktopButton}
            lang={t("other-language-code")}
          >
            {t("other-language")}
            <Language />
          </FooterButton>
        </div>
      </React.Fragment>
    );
  }
}

LanguageButton.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default LanguageButton;
